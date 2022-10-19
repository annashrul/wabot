<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

use App\Models\node;
use App\Models\path;
use App\Models\rule;
use App\Models\group_contact;

use App\Models\User;

class treeController extends Controller
{
    public function createNode($response)
    {
    	$node = new node;
    	$node->response = $response;
    	$node->save();
      return $node->id;

    	//return "node berhasil di buat";
    }

   public function createPath($before, $after)
   {
      $path = new path;
      $before = node::find($before);  
      $after = node::find($after);
      $path->id_nodeBefore = $before->id;
      $path->id_nodeAfter = $after->id;
      $path->key = "test";
      $path->id_rule = NULL;
       //echo $path;
      $path->save();
        //echo $before->id;

   }

    public function createRuleE(Request $request)
    {
      $currentUser = Auth::user();
      $id = array();
      foreach ($request->node as $key) {
        array_push($id, $this->createNode($key));
      }

      $i = 0;
      foreach ($request->arr as $key) {
        foreach ($key as $k => $value){
          if(!empty($value)){
            //echo($id[$i]);
            //echo ($id[$k]);
            $this->createPath($id[$i], $id[$k]);
          }
        }
        $i++;
      }

      $rule = new rule;
      $rule->id_initialNode = NULL;
      $rule->save();
      $id_rule = $rule->id;

      return $this->createGroupContact($id_rule, $currentUser, $request);
    }

    public function createGroupContact($id, $user, $request)
    {
      $groupContact = new group_contact;
      $groupContact->id_user = $user->id;
      $groupContact->id_group = $request->id_group;
      $groupContact->id_rule = $id;
      $groupContact->save();  

      if (! empty($groupContact->id)) {
          
        return response()->json([
            'status' => 200,
            'message' => 'Rule successfully inserted',
            'data' => $groupContact,
        ]);
      }else{
        return response()->json([
            'status' => 400,
            'message' => 'Failed',
            'data' => $groupContact,
        ]);
      }
    }

    public function createRule(Request $request)
    {
      $rule = new rule;
      $rule->id_initialNode = NULL;
      $rule->rule_name = $request->rule_name;
      $rule->save();
      $id_rule = $rule->id;

      if(!empty($id_rule)){
        return response()->json([
            'status' => 200,
            'message' => 'Rule successfully inserted',
            'data' => $rule,
        ]);
      }else{
        return response()->json([
            'status' => 400,
            'message' => 'Failed',
            'data' => $rule,
        ]);
      }
    }
}
