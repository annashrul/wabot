<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\deviceController;
use App\Models\rule;


class ruleController extends Controller
{
    public function createRule(Request $request)
    {
      $rule = new rule;
      $rule->id_device = $request->id_device;
      $rule->rule_name = $request->rule_name;
      $rule->target = $request->target;
      
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

    public function getRule(Request $request)
    {
      if((rule::where('id_device', $request->id_device)->count()) > 0){
        $data = rule::where('id_device', $request->id_device)->get();
        return response()->json([
           'status' => 200,
           'message' => 'Success',
            'data' => $data,
        ], 200);                
      }else{
        return response()->json([
          'status' => 200,
          'message' => 'There is rules found',
          'data' => [],
        ] , 200);  
      }
    }

    public function updateRule(Request $request)
    {
      if((rule::where('id', $request->id_rule)->count()) > 0){
            $rule = rule::find($request->id_rule);
            $rule->id_device = is_null($request->id_device) ? $rule->id_device : $request->id_device;
            $rule->rule_name = is_null($request->rule_name) ? $rule->rule_name : $request->rule_name;
            $rule->target = is_null($request->target) ? $rule->target : $request->target;
            $rule->save();

            return response()->json([
                    "status" => 200,
                    "message" => "Rule successfully updated",
                    "data" => $rule
                ], 200);
        }else{
            return response()->json([
                "status" => 200,
                "message" => "Rule not found",
                "data" => []
            ], 200);            
        }
    }

    public function deleteRule(Request $request)
    {
      if((rule::where('id', $request->id_rule)->count())>0){
        $rule = rule::find($request->id_rule);
        $rule->delete();                
             
        return response()->json([
          "status" => 200,
          "message" => "Records deleted",
          "data" => $rule,
        ], 200);
      }else{
        return response()->json([
          "status" => 200,
          "message" => "Rule not found",
          "data" => [],
        ], 200);
      }
    }

    public function getRuleByDevice($id_device)
    {
      if((rule::where('id_device', $id_device)->count()) > 0){
        $data = rule::where('id_device', $id_device)->get();
        return response()->json([
           'status' => 200,
           'message' => 'Success',
            'data' => $data,
        ], 200);                
      }else{
        return response()->json([
          'status' => 200,
          'message' => 'There is rules found',
          'data' => [],
        ] , 200);  
      }
    }


  public function getRuleByUser(Request $request)
  {
    $device = new deviceController;
    $getDevice = $device->getDeviceDB()->getData();
    
    $rule = array();
    foreach ($getDevice->data as $key => $value){
      if((rule::where('id_device', $value->id)->count()) > 0){
        $data = rule::where('id_device', $value->id)->get()->toArray();
        $rule = array_merge($rule, $data);
       }
    }

    if(!empty($rule)){
      return response()->json([
          'status' => 200,
          'message' => 'Success',
          'data' => ['id_user' => $getDevice->data[0]->id_user, 
                      'rule' => $rule],
       ], 200);                
    }else{
      return response()->json([
        'status' => 200,
        'message' => 'There is rules found',
        'data' => [],
      ] , 200);  
    }
  }
    
}