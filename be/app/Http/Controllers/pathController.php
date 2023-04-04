<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\path;
use App\Models\node;
use App\Models\eForm;
use App\Models\eForm_question;
use App\Models\api;
use App\Http\Controllers\nodeController;
use Illuminate\Support\Facades\DB;

class pathController extends Controller
{

    public function createPathFe(Request $request){
        DB::table('path_table')->insert([
            'id_rule' => $request->id_rule,
            'id_currentNode' => $request->id_currentNode,
            'id_nextNode' => $request->id_nextNode,
            'type' => $request->type,
            'title' => $request->title,
            'key' => $request->key,
        ]);
        return response()->json([
            'data'=>$request->all(),
            'status' => 200,
            'message' => 'Path successfully inserted',
        ]);
    }

    public function createPath(Request $request)
    {
        $path = new path;
        $path->id_rule = $request->id_rule;
        $path->id_currentNode = $request->id_currentNode;
        $path->id_nextNode = $request->id_nextNode;
        $path->type = $request->type;
        $path->key = $request->key;

        $path->save();

        if(!empty($path->id)){
            return response()->json([
                'status' => 200,
                'message' => 'Path successfully inserted',
                'data' => $path,
            ]);
        }else{
            return response()->json([
                'status' => 400,
                'message' => 'Failed',
                'data' => [],
            ]);
        }
    }

    public function getPath()
    {
        $path = path::all();
        if(!empty($path)){
            return response()->json([
                'status' => 200,
                'message' => 'Success',
                'data' => $path,
            ]);
        }else{
            return response()->json([
                'status' => 400,
                'message' => 'Failed',
                'data' => [],
            ]);
        }
    }

    public function getPathByID($id)
    {
        if((path::where('id', $id)->count())>0){
            $path = path::where('id', $id)->get();

            return response()->json([
                "status" => 200,
                "message" => "Succeess",
                "data" => $path,
            ], 200);
        }else{
            return response()->json([
                "status" => 200,
                "message" => "Device not found",
                "data" => [],
            ], 200);
        }
    }

    public function getPathByIdCurrentNode($id)
    {
        if((path::where('id_currentNode', $id)->count())>0){
            $path = path::where('id_currentNode', $id)->get();
            return response()->json([
                "status" => 200,
                "message" => "Succeess ",
                "data" => $path,
            ], 200);
        }else{
            return response()->json([
                "status" => 200,
                "message" => "Device not found",
                "data" => [],
            ], 200);
        }
    }



    private function recursiveNode($row,$nextNode=null,$currentNode=null){
        $tampung=[];
        $nodePath= DB::table('path_table')->select(["id_currentNode","id_nextNode","key"])
            ->where("id_currentNode",$nextNode)
            ->groupBy(["id_currentNode","id_nextNode","key"])
            ->orderBy("id_nextNode","asc")
            ->get();
        $row->children=[];
        foreach ($nodePath as $val){
            $row->children[]=$val;
        }
        return $row;
    }
    public function getPathByRule($id)
    {

        $notIn = "NOT IN ('0','99')";
        $node = DB::select('
            SELECT path_table.*, node_table.response, node_table.title node_title
            FROM path_table
            JOIN node_table ON node_table.id=path_table."id_nextNode"
            WHERE path_table."key" '.$notIn.' and id_rule='.$id.' OR path_table.id=1
            order by path_table.id asc
        ');
        // $node = DB::table('path_table')->orderBy("id","asc")->get();
        if(sizeof($node) > 0){
            $path = path::where('id_rule', $id)->orderBy("id_currentNode","asc")->get();
            return response()->json([
                "status" => 200,
                "message" => "Succeess",
                "data" => $path,
                "node"=>$node,
                // "bangsat"=>$newNode
            ], 200);
        }
        else{
             return response()->json([
                "status" => 200,
                "message" => "Path not found",
                "data" => [],
                "node" => [],
            ], 200);
        }

    }
    public function updatePath(Request $request)
    {
        if((path::where('id', $request->id_path)->count()) > 0){
            $path = path::find($request->id_path);
            $path->id_currentNode = empty ($request->id_currentNode) ? $path->id_currentNode : $request->id_currentNode;
            $path->id_nextNode =  empty ($request->id_nextNode) ? $path->id_nextNode : $request->id_nextNode;
            $path->type = empty ($request->type) ? $path->type : $request->type;
            $path->key = empty ($request->key) ? $path->key : $request->key;
            $path->save();

            return response()->json([
                    "status" => 200,
                    "message" => "Node successfully updated",
                    "data" => $path
                ], 200);
        }else{
            return response()->json([
                "status" => 200,
                "message" => "Rule not found",
                "data" => []
            ], 200);
        }
    }

    public function deletePath(Request $request)
    {
        if((path::where('id', $request->id_path)->count())>0){
            $path = path::find($request->id_path);
            $path->delete();
            return response()->json([
              "status" => 200,
              "message" => "Records deleted",
              "data" => $path,
            ], 200);
          }else{
            return response()->json([
              "status" => 200,
              "message" => "Path not found",
              "data" => [],
            ], 200);
          }
    }

    public function createPathEform(Request $request)
    {
        if((eForm::where('id', $request->id_eform)->count()) > 0){
            if((eForm_question::where('id_eform', $request->id_eform)->count()) > 0){
                $question = eForm_question::where('id_eform', $request->id_eform)->get()->toArray();

                // sorting question by question number
                $number = array();
                foreach ($question as $key => $row)
                {
                    $number[$key] = $row['question_number'];
                }
                array_multisort($number, SORT_ASC, $question);

                // create initial node e-Form
                $node = new nodeController;
                $node1 = $node->createNodeEform($question[0]['question']);
                $node1 = $node1->getData();

                // create path current node to initial eform
                $path = new path;
                $path->id_rule = $request->id_rule;
                $path->id_currentNode = $request->id_currentNode;
                $path->id_nextNode = $node1->data->id;
                $path->type = "eform";
                $path->key = $request->key;
                $path->save();

                for ($i=1; $i < count($question); $i++) {
                    // create node question
                    $node2 = $node->createNodeEform($question[$i]['question']);
                    $node2 = $node2->getData();


                    // create path node 1 to 2
                    $path = new path;
                    $path->id_rule = $request->id_rule;
                    $path->id_currentNode = $node1->data->id;
                    $path->id_nextNode = $node2->data->id;
                    $path->type = "eform";
                    $path->key = "0";
                    $path->save();
                    print_r($node1->data->id);
                    print_r(" ");
                    print_r($node2->data->id);
                    $node1 = $node2;
                }

                // create path end of eform to next node
                $path = new path;
                $path->id_rule = $request->id_rule;
                $path->id_currentNode = $node2->data->id;
                $path->id_nextNode = $request->id_nextNode;
                $path->type = "eform";
                $path->key = "0";
                $path->save();

                if(!empty($path->id)){
                    return response()->json([
                        'status' => 200,
                        'message' => 'Path successfully inserted',
                        'data' => $path,
                    ], 200);
                }else{
                    return response()->json([
                        'status' => 400,
                        'message' => 'Failed',
                        'data' => [],
                    ], 400);
                }
            }else{
                return response()->json([
                    'status' => 200,
                    'message' => 'E-form has no question',
                    'data' => [],
                ], 200);
            }
        }else{
            return response()->json([
                'status' => 200,
                'message' => 'E-form not found',
                'data' => [],
            ], 200);
        }


    }

     public function createPathInit(Request $request)
    {
        $path = new path;
        $path->id_rule = $request->id_rule;
        $path->id_currentNode = 1;
        $path->id_nextNode = $request->id_nextNode;
        $path->type = $request->type;
        $path->key = $request->key;
        $path->save();

        if(!empty($path->id)){
            return response()->json([
                'status' => 200,
                'message' => 'Path successfully inserted',
                'data' => $path,
            ]);
        }else{
            return response()->json([
                'status' => 400,
                'message' => 'Failed',
                'data' => [],
            ]);
        }
    }

    public function getPathInit($id_rule)
    {
        if((path::where('id_rule', $id_rule)->where('id_currentNode', 1)->count())>0){
            $path = path::where('id_rule', $id_rule)->where('id_currentNode', 1)->get();

            return response()->json([
                "status" => 200,
                "message" => "Succeess",
                "data" => $path,
            ], 200);
        }else{
            return response()->json([
                "status" => 200,
                "message" => "Path not found",
                "data" => [],
            ], 200);
        }

    }

    public function createPathApi(Request $request)
    {
        if((api::where('id', $request->id_api)->count())>0){
            $node = node::where('response', $request->id_api)->get();
            // create path API start
            $path = new path;
            $path->id_currentNode = $request->id_currentNode;
            $path->id_nextNode = $node[0]['id'];
            $path->type = "API";
            $path->id_rule = $request->id_rule;
            $path->save();

            // update path api response
            if((path::where('id_currentNode', $node[0]['id'])->count()) > 0){
                $pathAPI = path::where('id_currentNode', $node[0]['id'])->get()->toArray();
                foreach ($pathAPI as $key => $value) {
                    $path = path::find($value['id']);
                    $path->id_rule = $request->id_rule;
                    $path->save();
                }

            }

            return response()->json([
                "status" => 200,
                "message" => "Succeess",
                "data" => $path,
            ], 200);
        }else{
            return response()->json([
                "status" => 200,
                "message" => "Path not found",
                "data" => [],
            ], 200);
        }
    }
}
