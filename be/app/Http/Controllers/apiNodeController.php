<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Models\api;
use App\Models\node;
use App\Models\path;

class apiNodeController extends Controller
{
    public function createNodeAPI(Request $request)
    {

        $currentUser = Auth::user();
        $api = new api;
        $api->url = $request->url;
        $api->method = $request->method;
        $api->id_user = $currentUser->id;
        $api->id_device = $request->id_device;
        $api->var0 = empty($request->var[0]) ? null :($request->var[0]);
        $api->var1 = empty($request->var[1]) ? null :($request->var[1]);
        $api->var2 = empty($request->var[2]) ? null :($request->var[2]);
        $api->var3 = empty($request->var[3]) ? null :($request->var[3]);
        $api->var4 = empty($request->var[4]) ? null :($request->var[4]);
        $api->var5 = empty($request->var[5]) ? null :($request->var[5]);
        $api->var6 = empty($request->var[6]) ? null :($request->var[6]);
        $api->var7 = empty($request->var[7]) ? null :($request->var[7]);
        $api->var8 = empty($request->var[8]) ? null :($request->var[8]);
        $api->var9 = empty($request->var[9]) ? null :($request->var[9]);
        $api->param0 = empty($request->param[0]) ? null :($request->param[0]);
        $api->param1 = empty($request->param[1]) ? null :($request->param[1]);
        $api->param2 = empty($request->param[2]) ? null :($request->param[2]);
        $api->param3 = empty($request->param[3]) ? null :($request->param[3]);
        $api->param4 = empty($request->param[4]) ? null :($request->param[4]);
        $api->param5 = empty($request->param[5]) ? null :($request->param[5]);

        $api->save();

        $node = new node;
        $node->response = $api->id;
        $node->save();
        $id_api = $node->id;

        $node = new node;
        $node->response = $request->success;
        $node->save();
        $id_success = $node->id;

        $node = new node;
        $node->response = $request->failed;
        $node->save();
        $id_failed = $node->id;

        $path = new path;
        $path->id_currentNode = $id_api;
        $path->id_nextNode = $id_success;
        $path->type = "API_response";
        $path->key = 1  ;
        $path->save();

        $path = new path;
        $path->id_currentNode = $id_api;
        $path->id_nextNode = $id_failed;
        $path->type = "API_response";
        $path->key = 0;
        $path->save();



        if(!empty($api->id)){
            return response()->json([
                'status' => 200,
                'message' => 'API Node successfully inserted',
                'data' => $api,
            ]);
        }else{
            return response()->json([
                'status' => 400,
                'message' => 'Failed',
                'data' => [],
            ]);
        }


    }

    public function getNodeAPI(Request $request)
    {
        $currentUser = Auth::user();
        $checkApi=api::where('id_user', $currentUser->id)->count();
        if((api::where('id_user', $currentUser->id)->count()) > 0){
            if((api::where('id_device', $request->id_device)->count()) > 0){
                $data = api::where('id_user', $currentUser->id)->where('id_device', $request->id_device)->get();
                return response()->json([
                        'status' => 200,
                        'message' => 'Success',
                        'data' => $data,
                    ], 200);
                
            }else{
                return response()->json([
                'status' => 200,
                'message' => 'There is no device found',
                'data' => [],
            ], 200);  
            }    
        }else{
            return response()->json([
                'status' => 200,
                'message' => 'There is no user found',
                'data' => $checkApi,
            ], 200);    
        }     
    }

    public function updateNodeAPI(Request $request)
    {
        if((api::where('id', $request->id_api)->count()) > 0){
            $api = api::find($request->id_api);
            $api->url = empty($request->url) ? $api->url : $request->url;
            $api->method = empty($request->method) ? $api->method : $request->method;
            $api->id_user = empty($request->id_user) ? $api->id_user : $request->id_user;
            $api->id_device = empty($request->id_device) ? $api->id_device : $request->id_device;
            $api->var0 = empty($request->var0) ? $api->var0 :($request->var0);
            $api->var1 = empty($request->var1) ? $api->var1 :($request->var1);
            $api->var2 = empty($request->var2) ? $api->var2 :($request->var2);
            $api->var3 = empty($request->var3) ? $api->var3 :($request->var3);
            $api->var4 = empty($request->var4) ? $api->var4 :($request->var4);
            $api->var5 = empty($request->var5) ? $api->var5 :($request->var5);
            $api->var6 = empty($request->var6) ? $api->var6 :($request->var6);
            $api->var7 = empty($request->var7) ? $api->var7 :($request->var7);
            $api->var8 = empty($request->var8) ? $api->var8 :($request->var8);
            $api->var9 = empty($request->var9) ? $api->var9 :($request->var9);
            $api->param0 = empty($request->param0) ? $api->param0 :($request->param0);
            $api->param1 = empty($request->param1) ? $api->param1 :($request->param1);
            $api->param2 = empty($request->param2) ? $api->param2 :($request->param2);
            $api->param3 = empty($request->param3) ? $api->param3 :($request->param3);
            $api->param4 = empty($request->param4) ? $api->param4 :($request->param4);
            $api->param5 = empty($request->param5) ? $api->param5 :($request->param5);

            $api->save();

            return response()->json([
                    "status" => 200,
                    "message" => "API successfully updated",
                    "data" => $api
                ], 200);
        }else{
            return response()->json([
                "status" => 200,
                "message" => "API not found",
                "data" => []
            ], 200);            
        }
    }

    public function getAPIByID($id)
    {
        if((api::where('id', $id)->count())>0){
            $api = api::where('id', $id)->get();               
            
            return response()->json([
                "status" => 200,
                "message" => "Succeess",            
                "data" => $api,
            ], 200);
        }else{
            return response()->json([
                "status" => 200,
                "message" => "API not found",
                "data" => [],
            ], 200);
        }
    }

    public function deleteNodeAPI(Request $request)
    {
        // get api node
        if((node::where('response', $request->id_api)->count())>0){
            // get id node dengan response id api node
            $node = node::where('response', $request->id_api)->get()->toArray();
            
            // get path dengan current node nya id node api
            $path = path::where('id_currentNode', $node[0]['id'])->get()->toArray();
            
            // delete node next node dari path yg di get
            foreach ($path as $key => $value) {
                $nodeAPI = node::find($value['id_nextNode']);
                $nodeAPI->delete(); 
            }

            $APInode = node::find($node[0]['id']);
            $APInode->delete();

            $api = api::find($request->id_api);
            $api->delete();
            return response()->json([
              "status" => 200,
              "message" => "Records deleted",
              "data" => $api,
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