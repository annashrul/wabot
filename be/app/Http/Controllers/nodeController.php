<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\node;
use Illuminate\Support\Facades\DB;

class nodeController extends Controller
{
    public function createNodeFe(Request $request){
        $id_node = DB::table('node_table')->insertGetId([
            'title' => $request->title,
            'response' => $request->response,
        ]);
        return response()->json([
            'data'=>$id_node,
            'status' => 200,
            'message' => 'Node successfully inserted',
        ]);
    }
    public function createNode(Request $request)
    {
        $node = new node;
        $node->response = $request->response;
        $node->title = $request->title;
        $node->save();
        $id_node = $node->id;

        if(!empty($id_node)){
            return response()->json([
                'status' => 200,
                'message' => 'Node successfully inserted',
                'data' => $node,
            ]);
        }else{
            return response()->json([
                'status' => 400,
                'message' => 'Failed',
                'data' => $node,
            ]);
        }
    }

    public function createNodeEform($response)
    {
        $node = new node;
        $node->response = $response;
        $node->save();
        $id_node = $node->id;

        if(!empty($id_node)){
            return response()->json([
                'status' => 200,
                'message' => 'Node successfully inserted',
                'data' => $node,
            ]);
        }else{
            return response()->json([
                'status' => 400,
                'message' => 'Failed',
                'data' => $node,
            ]);
        }
    }

   

    public function getNode()
    {
        $node = node::all();
        if(!empty($node)){
            return response()->json([
                'status' => 200,
                'message' => 'Success',
                'data' => $node,
            ]);
        }else{
            return response()->json([
                'status' => 400,
                'message' => 'Failed',
                'data' => [],
            ]);
        }
    }

    public function getNodeById($id)
    {
        if((node::where('id', $id)->count())>0){
            $node = node::where('id', $id)->get();               
            
            return response()->json([
                "status" => 200,
                "message" => "Succeess",            
                "data" => $node,
            ], 200);
        }else{
            return response()->json([
                "status" => 200,
                "message" => "Node not found",
                "data" => [],
            ], 200);
        }

    }

    public function updateNode(Request $request)
    {
        if((node::where('id', $request->id_node)->count()) > 0){
            $node = node::find($request->id_node);
            $node->response = is_null($request->response) ? $node->response : $request->response;
            $node->title = is_null($request->title) ? $node->title : $request->title;
            $node->save();

            return response()->json([
                    "status" => 200,
                    "message" => "Node successfully updated",
                    "data" => $node
                ], 200);
        }else{
            return response()->json([
                "status" => 200,
                "message" => "Node not found",
                "data" => []
            ], 200);            
        }
    }

    public function deleteNode(Request $request)
    {
        if((node::where('id', $request->id_node)->count())>0){
            $node = node::find($request->id_node);
            $node->delete();                           
            return response()->json([
              "status" => 200,
              "message" => "Records deleted",
              "data" => $node,
            ], 200);
          }else{
            return response()->json([
              "status" => 200,
              "message" => "Node not found",
              "data" => [],
            ], 200);
          }
    }
}