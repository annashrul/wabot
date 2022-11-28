<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Http\Controllers\deviceController;
use App\Models\contactWA;
use App\Models\groupBroadcastWA;
use Illuminate\Support\Facades\DB;

class wacoreController extends Controller
{   
    public function updateUrlApi(Request $request){
        $data=['url'=>$request->url];
        DB::table('url_api_table')->update($data);
        return $data;
    }

    public function getUrlApi(){
        $results = DB::select('select * from url_api_table')[0]->url;
        return $results;
    }

    public function getContact(Request $request)
    {
        // get device by id
        $device = new deviceController;
        $getDevice = $device->getDeviceById($request->id_device); 
        $getDevice = $getDevice->getData();

        if(empty($getDevice->data)){
            return response()->json([
                "status" => 200,
                "message" => "Device not found",
                "data" => [],
            ], 200);
        }
        if((contactWA::where('id_device', $getDevice->data[0]->id)->count()) > 0){
                $data = contactWA::where('id_device', $getDevice->data[0]->id)->get();
                return response()->json([
                    'status' => 200,
                    'message' => 'Success',
                    'data' => $data,
                ]);
            }else{
                return response()->json([
                    'status' => 200,
                    'message' => 'Contact is empty',
                    "data" => [],
                    
                ]);    
            }  

    }   

    public function syncContact(Request $request)
    {
        $url = $this->getUrlApi();
        // get device by id
        $device = new deviceController;
        $getDevice = $device->getDeviceById($request->id_device); 
        $getDevice = $getDevice->getData();
        if(empty($getDevice->data)){
            return response()->json([
                "status" => 200,
                "message" => "Device not found",
                "data" => [],
            ], 200);
        }
        // get all contact

       $response = Http::timeout(60)->get($url.'wa/'.$getDevice->data[0]->uid.'/get-contact?limit=100000&page=1');

        // response sementara
        // $string = file_get_contents(base_path("app/Http/Controllers/contact.json"));
        // $response = json_decode($string, true);
        // loop
//        return $getDevice->data;z
        foreach ($response['items'] as $key => $value) {
            // find by jid
            if((!empty($value['name'])) || ($value['name']== "2")){
                if((contactWA::where('id_device', $request->id_device)->where('jid', $value['jid'])->count()) > 0){
                    $data = contactWA::where('id_device', $request->id_device)->where('jid', $value['jid'])->get()->toArray();
                    $contactWA = contactWA::find($data[0]['id']);
                    $contactWA->id_device = is_null($getDevice->data[0]->id) ? $contactWA->id_device : $getDevice->data[0]->id;
                    $contactWA->jid = is_null($value['jid']) ? $contactWA->jid : $value['jid'];
                    $contactWA->name = is_null($value['name']) ? $contactWA->name : $value['name'];
                    $contactWA->notify_name = is_null($value['notify_name']) ? $contactWA->notify_name : $value['notify_name'];
                    $contactWA->short_name = is_null($value['short_name']) ? $contactWA->short_name : $value['short_name'];
                    $contactWA->profile_url = is_null($value['profile_url']) ? $contactWA->profile_url : $value['profile_url'];
                    $contactWA->updated_at = is_null($value['updated_at']) ? $contactWA->updated_at : $value['updated_at'];
                    $contactWA->created_at = is_null($value['created_at']) ? $contactWA->created_at : $value['created_at'];
                    $contactWA->save();
                }else{
                    $contactWA = new contactWA;
                    $contactWA->id_device = $getDevice->data[0]->id;
                    $contactWA->jid = $value['jid'];
                    $contactWA->name = $value['name'];
                    $contactWA->notify_name = $value['notify_name'];
                    $contactWA->short_name = $value['short_name'];
                    $contactWA->profile_url = $value['profile_url'];
                    $contactWA->updated_at = $value['updated_at'];
                    $contactWA->created_at = $value['created_at'];
                    $contactWA->save();
                }
            }
        }


        if(!empty($contactWA->id)){
            return response()->json([
                "status" => 200,
                "message" => "Sync contact success",
            ], 200);
        }else{
            return response()->json([
                "status" => 400,
                "message" => "Failed",
            ], 400);
        }
        
    }

    public function getGroup(Request $request)
    {

        // get device by id
        $device = new deviceController;
        $getDevice = $device->getDeviceById($request->id_device); 
        $getDevice = $getDevice->getData();

        if(empty($getDevice->data)){
            return response()->json([
                "status" => 200,
                "message" => "Device not found",
                "data" => [],
            ], 200);
        }

        if((groupBroadcastWA::where('id_device', $getDevice->data[0]->id)->where('is_group', 1)->count()) > 0){
                $data = groupBroadcastWA::where('id_device', $getDevice->data[0]->id)->where('is_group', 1)->get();
                return response()->json([
                    'status' => 200,
                    'message' => 'Success',
                    'data' => $data,
                ]);
            }else{
                return response()->json([
                    'status' => 404,
                    'message' => 'Group is empty',
                    
                ]);    
            } 
    }

    public function syncGroup(Request $request)
    {
         $url = $this->getUrlApi();
        // get device by id
        $device = new deviceController;
        $getDevice = $device->getDeviceById($request->id_device); 
        $getDevice = $getDevice->getData();

        if(empty($getDevice->data)){
            return response()->json([
                "status" => 200,
                "message" => "Device not found",
                "data" => [],
            ], 200);
        }
         // get all contact
        $response = Http::timeout(60)->get($url.'wa/'.$getDevice->data[0]->uid.'/get-group?limit=100000&page=1');
        // response sementara
        // $string = file_get_contents(base_path("app/Http/Controllers/group.json"));
        // $response = json_decode($string, true);
        // loop
        foreach ($response['items'] as $key => $value) {
            // find by jid
            if((groupBroadcastWA::where('id_device', $request->id_device)->where('jid', $value['jid'])->count()) > 0){
                $data = groupBroadcastWA::where('id_device', $request->id_device)->where('jid', $value['jid'])->get()->toArray();
                $groupBroadcastWA = groupBroadcastWA::find($data[0]['id']);
                $groupBroadcastWA->id_device = is_null($getDevice->data[0]->id) ? $groupBroadcastWA->id_device : $getDevice->data[0]->id;
                $groupBroadcastWA->jid = is_null($value['jid']) ? $groupBroadcastWA->jid : $value['jid'];
                $groupBroadcastWA->name = is_null($value['name']) ? $groupBroadcastWA->name : $value['name'];
                $groupBroadcastWA->unread = is_null($value['unread']) ? $groupBroadcastWA->unread : $value['unread'];
                $groupBroadcastWA->last_message_time = is_null($value['last_message_time']) ? $groupBroadcastWA->last_message_time : $value['last_message_time'];
                $groupBroadcastWA->is_muted = is_null($value['is_muted']) ? $groupBroadcastWA->is_muted : $value['is_muted'];
                $groupBroadcastWA->last_message_id = is_null($value['last_message_id']) ? $groupBroadcastWA->last_message_id : $value['last_message_id'];
                $groupBroadcastWA->is_marked_spam = is_null($value['is_marked_spam']) ? $groupBroadcastWA->is_marked_spam : $value['is_marked_spam'];
                $groupBroadcastWA->updated_at = is_null($value['updated_at']) ? $groupBroadcastWA->updated_at : $value['updated_at'];
                $groupBroadcastWA->created_at = is_null($value['created_at']) ? $groupBroadcastWA->created_at : $value['created_at'];
                $groupBroadcastWA->user_id = is_null($value['user_id']) ? $groupBroadcastWA->user_id : $value['user_id'];
                $groupBroadcastWA->is_group = is_null($value['is_group']) ? $groupBroadcastWA->is_group : $value['is_group'];
                $groupBroadcastWA->is_broadcast = is_null($value['is_broadcast']) ? $groupBroadcastWA->is_broadcast : $value['is_broadcast'];
                $groupBroadcastWA->deleted_at = is_null($value['deleted_at']) ? $groupBroadcastWA->deleted_at : $value['deleted_at'];
                $groupBroadcastWA->save();
                
            }else{
                $groupBroadcastWA = new groupBroadcastWA;
                $groupBroadcastWA->id_device = $getDevice->data[0]->id;
                $groupBroadcastWA->jid = $value['jid'];
                $groupBroadcastWA->name = $value['name'];
                $groupBroadcastWA->unread = $value['unread'];
                $groupBroadcastWA->last_message_time = $value['last_message_time'];
                $groupBroadcastWA->is_muted = $value['is_muted'];
                $groupBroadcastWA->last_message_id = $value['last_message_id'];
                $groupBroadcastWA->is_marked_spam = $value['is_marked_spam'];
                $groupBroadcastWA->created_at = $value['created_at'];
                $groupBroadcastWA->updated_at = $value['updated_at'];
                $groupBroadcastWA->user_id = $value['user_id'];
                $groupBroadcastWA->is_group = $value['is_group'];
                $groupBroadcastWA->is_broadcast = $value['is_broadcast'];
                $groupBroadcastWA->deleted_at = $value['deleted_at'];
                $groupBroadcastWA->save();
            }
        }
        if(!empty($groupBroadcastWA->id)){
            return response()->json([
                "status" => 200,
                "message" => "Sync group success",
            ], 200);
        }else{
            return response()->json([
                "status" => 400,
                "message" => "Failed",
            ], 400);
        }
    }

    public function getBroadcastList(Request $request)
    {
        // get device by id
        $device = new deviceController;
        $getDevice = $device->getDeviceById($request->id_device); 
        $getDevice = $getDevice->getData();

        if(empty($getDevice->data)){
            return response()->json([
                "status" => 200,
                "message" => "Device not found",
                "data" => [],
            ], 200);
        }
        if((groupBroadcastWA::where('id_device', $getDevice->data[0]->id)->where('is_broadcast', 1)->count()) > 0){
                $data = groupBroadcastWA::where('id_device', $getDevice->data[0]->id)->where('is_broadcast', 1)->get();
                return response()->json([
                    'status' => 200,
                    'message' => 'Success',
                    'data' => $data,
                ]);
            }else{
                return response()->json([
                    'status' => 404,
                    'message' => 'Broadcast List is empty',
                    
                ]);    
            } 
    }

    public function syncBroadcast(Request $request)
    {
        $url = $this->getUrlApi();
        // get device by id
        $device = new deviceController;
        $getDevice = $device->getDeviceById($request->id_device); 
        $getDevice = $getDevice->getData();

        if(empty($getDevice->data)){
            return response()->json([
                "status" => 200,
                "message" => "Device not found",
                "data" => [],
            ], 200);
        }

        // get all contact
        $response = Http::timeout(60)->get($url.'wa/'.$getDevice->data[0]->uid.'/get-broadcast?limit=100000&page=1');
        // response sementara
        // $string = file_get_contents(base_path("app/Http/Controllers/broadcast.json"));
        // $response = json_decode($string, true);
        // loop
        foreach ($response['items'] as $key => $value) {
            // find by jid
            if((groupBroadcastWA::where('id_device', $request->id_device)->where('jid', $value['jid'])->count()) > 0){
                $data = groupBroadcastWA::where('id_device', $request->id_device)->where('jid', $value['jid'])->get()->toArray();
                $groupBroadcastWA = groupBroadcastWA::find($data[0]['id']);
                $groupBroadcastWA->id_device = is_null($getDevice->data[0]->id) ? $groupBroadcastWA->id_device : $getDevice->data[0]->id;
                $groupBroadcastWA->jid = is_null($value['jid']) ? $groupBroadcastWA->jid : $value['jid'];
                $groupBroadcastWA->name = is_null($value['name']) ? $groupBroadcastWA->name : $value['name'];
                $groupBroadcastWA->unread = is_null($value['unread']) ? $groupBroadcastWA->unread : $value['unread'];
                $groupBroadcastWA->last_message_time = is_null($value['last_message_time']) ? $groupBroadcastWA->last_message_time : $value['last_message_time'];
                $groupBroadcastWA->is_muted = is_null($value['is_muted']) ? $groupBroadcastWA->is_muted : $value['is_muted'];
                $groupBroadcastWA->last_message_id = is_null($value['last_message_id']) ? $groupBroadcastWA->last_message_id : $value['last_message_id'];
                $groupBroadcastWA->is_marked_spam = is_null($value['is_marked_spam']) ? $groupBroadcastWA->is_marked_spam : $value['is_marked_spam'];
                $groupBroadcastWA->updated_at = is_null($value['updated_at']) ? $groupBroadcastWA->updated_at : $value['updated_at'];
                $groupBroadcastWA->created_at = is_null($value['created_at']) ? $groupBroadcastWA->created_at : $value['created_at'];
                $groupBroadcastWA->user_id = is_null($value['user_id']) ? $groupBroadcastWA->user_id : $value['user_id'];
                $groupBroadcastWA->is_group = is_null($value['is_group']) ? $groupBroadcastWA->is_group : $value['is_group'];
                $groupBroadcastWA->is_broadcast = is_null($value['is_broadcast']) ? $groupBroadcastWA->is_broadcast : $value['is_broadcast'];
                $groupBroadcastWA->deleted_at = is_null($value['deleted_at']) ? $groupBroadcastWA->deleted_at : $value['deleted_at'];
                $groupBroadcastWA->save();
                
            }else{
                $groupBroadcastWA = new groupBroadcastWA;
                $groupBroadcastWA->id_device = $getDevice->data[0]->id;
                $groupBroadcastWA->jid = $value['jid'];
                $groupBroadcastWA->name = $value['name'];
                $groupBroadcastWA->unread = $value['unread'];
                $groupBroadcastWA->last_message_time = $value['last_message_time'];
                $groupBroadcastWA->is_muted = $value['is_muted'];
                $groupBroadcastWA->last_message_id = $value['last_message_id'];
                $groupBroadcastWA->is_marked_spam = $value['is_marked_spam'];
                $groupBroadcastWA->created_at = $value['created_at'];
                $groupBroadcastWA->updated_at = $value['updated_at'];
                $groupBroadcastWA->user_id = $value['user_id'];
                $groupBroadcastWA->is_group = $value['is_group'];
                $groupBroadcastWA->is_broadcast = $value['is_broadcast'];
                $groupBroadcastWA->deleted_at = $value['deleted_at'];
                $groupBroadcastWA->save();
            }
        }
        if(!empty($groupBroadcastWA->id)){
            return response()->json([
                "status" => 200,
                "message" => "Sync broadcast success",
            ], 200);
        }else{
            return response()->json([
                "status" => 400,
                "message" => "Failed",
            ], 400);
        }
    }

    public function getContactDB($id_device)
    {
        if((contactWA::where('id_device', $id_device)->count())>0){
            $contactWA = contactWA::where('id_device', $id_device)->get();               
    
            return response()->json([
                "status" => 200,
                "message" => "Success",            
                "data" => $contactWA,
            ], 200);
        }else{
            return response()->json([
                "status" => 200,
                "message" => "Contact not found",
                "data" => [],
            ], 200);
        }
    }

    public function getGroupDB($id_device)
    {
        if((groupBroadcastWA::where('id_device', $id_device)->where('is_group', 1)->count())>0){
            $groupWA = groupBroadcastWA::where('id_device', $id_device)->where('is_group', 1)->get();               
            
            return response()->json([
                "status" => 200,
                "message" => "Success",            
                "data" => $groupWA,
            ], 200);
        }else{
            return response()->json([
                "status" => 200,
                "message" => "Group not found",
                "data" => [],
            ], 200);
        }
    }
     public function getBroadcastDB($id_device)
    {
        if((groupBroadcastWA::where('id_device', $id_device)->where('is_broadcast', 1)->count())>0){
            $broadcastWA = groupBroadcastWA::where('id_device', $id_device)->where('is_broadcast', 1)->get();               
            
            return response()->json([
                "status" => 200,
                "message" => "Success",            
                "data" => $broadcastWA,
            ], 200);
        }else{
            return response()->json([
                "status" => 200,
                "message" => "Broadcast not found",
                "data" => [],
            ], 200);
        }
    }

    public function getGroupDBByJid($jid, $id_device)
    {
        if((groupBroadcastWA::where('id_device', $id_device)->count()) > 0){
            if((groupBroadcastWA::where('jid', $jid)->where('is_group', 1)->count())>0){
                $groupWA = groupBroadcastWA::where('jid', $jid)->where('is_group', 1)->get();               
                
                return response()->json([
                    "status" => 200,
                    "message" => "Success",            
                    "data" => $groupWA,
                ], 200);
            }else{
                return response()->json([
                    "status" => 200,
                    "message" => "Group not found",
                    "data" => [],
                ], 200);
            }
        }else{
            return response()->json([
                    "status" => 200,
                    "message" => "Device not found",
                    "data" => [],
                ], 200);
        }

    }

    public function getContactDBByJid($jid, $id_device)
    {
        if((contactWA::where('id_device', $id_device)->count())>0){
            if((contactWA::where('jid', $jid)->where('id_device', $id_device)->count())>0){
                $contactWA = contactWA::where('jid', $jid)->get();               
        
                return response()->json([
                    "status" => 200,
                    "message" => "Success",            
                    "data" => $contactWA,
                ], 200);
            }else{
                return response()->json([
                    "status" => 200,
                    "message" => "Contact not found",
                    "data" => [],
                ], 200);
            }    
        }else{
            return response()->json([
                    "status" => 200,
                    "message" => "Device not found",
                    "data" => [],
                ], 200);
        }
        
    }

    public function getContactDBById($id)
    {
        if((contactWA::where('id', $id)->count()) > 0){
                $data = contactWA::where('id', $id)->get();
                return response()->json([
                    'status' => 200,
                    'message' => 'Success',
                    'data' => $data,
                ]);
            }else{
                return response()->json([
                    'status' => 200,
                    'message' => 'Contact not found',
                    "data" => [],
                    
                ]);    
            }  
        
    }

    public function getGroupDBById($id)
    {
        if((groupBroadcastWA::where('id', $id)->where('is_group', 1)->count())>0){
                $groupWA = groupBroadcastWA::where('id', $id)->where('is_group', 1)->get();               
                
                return response()->json([
                    "status" => 200,
                    "message" => "Success",            
                    "data" => $groupWA,
                ], 200);
            }else{
                return response()->json([
                    "status" => 200,
                    "message" => "Group not found",
                    "data" => [],
                ], 200);
            }
    }

    public function getBroadcastDBById($id)
    {
        if((groupBroadcastWA::where('id', $id)->where('is_broadcast', 1)->count())>0){
                $groupWA = groupBroadcastWA::where('id', $id)->where('is_broadcast', 1)->get();               
                
                return response()->json([
                    "status" => 200,
                    "message" => "Success",            
                    "data" => $groupWA,
                ], 200);
            }else{
                return response()->json([
                    "status" => 200,
                    "message" => "Group not found",
                    "data" => [],
                ], 200);
            }
    }

    public function deleteContact(Request $request)
    {
        $count = contactWA::where('id_device', $request->id_device)->count();
        if($count > 0) {
            $countID = contactWA::where('id', $request->id_contact)->count();
            if($countID>0){
                $contact = contactWA::find($request->id_contact);
                $contact->delete();                
            
                return response()->json([
                    "status" => 200,
                    "message" => "records deleted",
                    "data" => $contact,
                ]);
            }else{
                 return response()->json([
                    "status" => 404,
                    "message" => "contact not found",
                ]);
            }
        }else {
            return response()->json([
                "status" => 404,
                "message" => "user not found",
            ]);
      }
    }

    public function getAllContact()
    {
        $contactWA = contactWA::all();
        if(!empty($contactWA)){
            return response()->json([
                'status' => 200,
                'message' => 'Success',
                'data' => $contactWA,
            ]);
        }else{
            return response()->json([
                'status' => 400,
                'message' => 'Failed',
                'data' => [],
            ]);
        }
    }
}