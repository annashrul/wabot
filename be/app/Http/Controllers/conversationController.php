<?php

namespace App\Http\Controllers;

use Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
use App\Models\conversation;

class conversationController extends Controller
{
    public function createConversation(Request $request)
    {
        $conversation = new conversation;
        $conversation->id_device = $request->id_device;
        $conversation->id_path = $request->id_path;
        $conversation->sender_jid = $request->sender_jid;
        $conversation->save();

        if (! empty($conversation->id)) {
            return response()->json([
                'status' => 200,
                'message' => 'Conversation successfully inserted',
                'data' => $conversation,
            ], 200);
        }else{
            return response()->json([
                'status' => 400,
                'message' => 'Failed',
                'data' => $conversation,
            ]);
        }
    }

     public function newConversation($request)
    {
        $conversation = new conversation;
        $conversation->id_device = $request->id_device;
        $conversation->id_path = $request->id_path;
        $conversation->sender_jid = $request->sender_jid;
        $conversation->save();

        if (! empty($conversation->id)) {
            return response()->json([
                'status' => 200,
                'message' => 'Conversation successfully inserted',
                'data' => $conversation,
            ], 200);
        }else{
            return response()->json([
                'status' => 400,
                'message' => 'Failed',
                'data' => $conversation,
            ]);
        }
    }

    public function getConversation(Request $request)
    {
        if((conversation::where('id_device', $request->id_device)->count())>0){
            $conversation = conversation::where('id_device', $request->id_device)->get();               
            
            return response()->json([
                "status" => 200,
                "message" => "Succeess",            
                "data" => $conversation,
            ], 200);
        }else{
            return response()->json([
                "status" => 200,
                "message" => "Conversation not found",
                "data" => [],
            ], 200);
        }
    }

    public function updateConversation($request)
    {
        if((conversation::where('id', $request->id)->count()) > 0){
            $conversation = conversation::find($request->id);
            $conversation->id_device = empty($request->id_device) ? $conversation->id_device : $request->id_device;
            $conversation->id_path = empty($request->id_path) ? $conversation->id_path: $request->id_path;
            $conversation->sender_jid = empty($request->sender_jid) ? $conversation->sender_jid : $request->sender_jid;
            $conversation->save();

            return response()->json([
                    "status" => 200,
                    "message" => "Conversation successfully updated",
                    "data" => $conversation
                ], 200);
        }else{
            return response()->json([
                "status" => 200,
                "message" => "Conversation not found",
                "data" => []
            ], 200);            
        }

    }

    public function deleteConversation($id)
    {
        if((conversation::where('id', $id)->count())>0){
            $conversation = conversation::find($id);
            $conversation->delete();                           
            return response()->json([
              "status" => 200,
              "message" => "Records deleted",
              "data" => $conversation,
            ], 200);
          }else{
            return response()->json([
              "status" => 200,
              "message" => "Node not found",
              "data" => [],
            ], 200);
          }
    }

    public function deleteConversationDB(Request $request)
    {
        if((conversation::where('id', $request->id)->count())>0){
            $conversation = conversation::find($request->id);
            $conversation->delete();                           
            return response()->json([
              "status" => 200,
              "message" => "Records deleted",
              "data" => $conversation,
            ], 200);
          }else{
            return response()->json([
              "status" => 200,
              "message" => "Convo not found",
              "data" => [],
            ], 200);
          }
    }
}
