<?php

namespace App\Http\Controllers;
use Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
use App\Models\device;
use App\Models\User;

class deviceController extends Controller
{
    public function newDevice(Request $request)
    {

        $response = Http::post('https://wabot.pesanku.id/device', [
                        'phone' => $request->phone,
                        'name' => $request->name,
                        'type' => $request->type
                    ]);
        if($response->successful()){
            $currentUser = Auth::user();
            $limit=30;
            if((device::where('id_user', $currentUser->id)->count()) < $limit){
                // create callback 
                $callback = Http::post('https://wabot.pesanku.id/callback', [
                        'url' => 'https://api.pesanku.id/api/message/receive' ,
                        'device_id' => $response['id'],
                ]);

                $device = new device;
                $device->id_user = $currentUser->id;
                $device->phone_number = $request->phone;
                $device->name = $request->name;
                $device->uid = $response['id'];
                $device->id_callback = $callback['id'];
                $device->type = $request->type;
                $device->save();

                
                if (! empty($device->id)) {
                    return response()->json([
                        'status' => 200,
                        'message' => 'Device successfully inserted',
                        'data' => $device,
                    ], 200);
                }else{
                    return response()->json([
                        'status' => 400,
                        'message' => 'Failed',
                        'data' => $device,
                    ]);
                }   
            }else{
                return response()->json([
                        'status' => 400,
                        'message' => 'The number of devices has reached the limit',
                        'data' => [],
                    ]);
            }

        }else{
            return response()->json([
                    'status' => 400,
                    'message' => 'Request failed to WA Core',
                    'data' => [],
                ]);
        }
    	
    	
    }

    public function getDevice()
    {
        $currentUser = Auth::user();
        if((device::where('id_user', $currentUser->id)->count()) > 0){
            $data = device::where('id_user', $currentUser->id)->get();
            // return response()->json([
            //         'status' => 200,
            //         'message' => 'Success',
            //         'data' => $data,
            //     ], 200);
        }else{
            return response()->json([
                'status' => 200,
                'message' => 'There is no device found',
                'data' => [],                    
            ], 200);    
        }

        $res = Http::get('https://wabot.pesanku.id/device');
        //echo $res;
        $response = (array)json_decode($res);
        $data = (array)json_decode($data);
        $count = count($response);
        $result = array();
        if($res->successful()){
            $i = 0;
            while ($i < $count){
                foreach ($data as $j => $d) { 
                    if($response[$i]->id == $d->uid){
                        
                        if((device::where('id', $d->id)->where('id_user', $currentUser->id)->count()) > 0){
                            
                            $device = device::find($d->id);
                            $device->status = $response[$i]->status;
                            $device->phone_number = $response[$i]->phone_number;
                            $device->name = $response[$i]->name;
                            $device->uid = $response[$i]->id;
                            $device->id_callback = $device->id_callback;
                            $device->type = $response[$i]->type;
                            $device->save();

                            array_push($result, $device);
                        }
                    }
                }

            if($i==($count-1)){
                $data = device::where('id_user', $currentUser->id)->get();
                return response()->json([
                    "status" => 200,
                    "message" => "Success",
                    "data" => $data
                ], 200);
                break;
            }else{
                $i++;
            }

            }
        }


    }

    public function updateDevice(Request $request)
    {
        $currentUser = Auth::user();
        if((device::where('id', $request->id)->where('id_user', $currentUser->id)->count()) > 0){
            $device = device::find($request->id);
            $device->status = is_null($request->status) ? $device->status : $request->status;
            $device->phone_number = is_null($request->phone_number) ? $device->phone_number : $request->phone_number;
            $device->name = is_null($request->name) ? $device->name : $request->name;
            $device->uid = is_null($request->uid) ? $device->uid : $request->uid;
            $device->id_callback = is_null($request->id_callback) ? $device->id_callback : $request->id_callback;
            $device->type = is_null($request->type) ? $device->type : $request->type;
            $device->save();

            $response = Http::patch('https://wabot.pesanku.id/device/'. $device->uid, [
                        'phone' => $device->phone_number,
                        'name' => $device->name,
                        'type' => $device->type,
                    ]);
            if($response->successful()){
                return response()->json([
                    "status" => 200,
                    "message" => "Status Device successfully updated",
                    "data" => $device
                ], 200);
            }else{
                 return response()->json([
                    "status" => 400,
                    "message" => "Request failed to WA Core",
                ], 400);    
            }

            
        }else{
            return response()->json([
                "status" => 200,
                "message" => "Device not found",
            ], 200);            
        }
            
    }

    public function deleteDevice(Request $request)
    {

        $currentUser = Auth::user();
        if((device::where('id_user', $currentUser->id)->count()) > 0) {
            if((device::where('id', $request->id_device)->count())>0){
                $device = device::find($request->id_device);
                $device->delete();                
                
                $response = Http::delete('https://wabot.pesanku.id/device/'. $device->uid, [
                        'name' => $device->name,
                    ]);
                $callback = Http::delete('https://wabot.pesanku.id/callback/'. $device->id_callback);
                if(($response->successful()) && ($callback->successful())){
                    return response()->json([
                        "status" => 200,
                        "message" => "Records deleted",
                        "data" => $device,
                    ], 200);
                }else{
                     return response()->json([
                        "status" => 400,
                        "message" => "Request failed to WA Core",
                    ], 400);    
                }

                
            }else{
                 return response()->json([
                    "status" => 200,
                    "message" => "Device not found",
                    "data" => [],
                ], 200);
            }
        }else {
            return response()->json([
                "status" => 200,
                "message" => "User not found",
                "data" => [],
            ], 200);
      }
    }

    public function getDeviceByNumber($number)
    {
        if((device::where('phone_number', $number)->count())>0){
            $device = device::where('phone_number', $number)->get();               
            
            return response()->json([
                "status" => 200,
                "message" => "Succeess",            
                "data" => $device,
            ], 200);
        }else{
            return response()->json([
                "status" => 200,
                "message" => "Device not found",
                "data" => [],
            ], 200);
        }
    }

    public function getDeviceByNumberUser($id_user, $number)
    {
        if((device::where('id_user', $id_user)->count()) > 0) {
            if((device::where('phone_number', $number)->count())>0){
                $device = device::where('phone_number', $number)->where('id_user', $id_user)->get();
                return response()->json([
                    "status" => 200,
                    "message" => "Succeess",            
                    "data" => $device,
                ], 200);
            }else{
                 return response()->json([
                    "status" => 200,
                    "message" => "Device not found",
                    "data" => [],
                ], 200);
            }
        }else {
            return response()->json([
                "status" => 200,
                "message" => "User not found",
                "data" => [],
            ], 200);
      }
    }

    public function getDeviceById($id)
    {
        if((device::where('id', $id)->count())>0){
            $device = device::where('id', $id)->get();               
            
            return response()->json([
                "status" => 200,
                "message" => "Succeess",            
                "data" => $device,
            ], 200);
        }else{
            return response()->json([
                "status" => 200,
                "message" => "Device not found",
                "data" => [],
            ], 200);
        }
    }

    public function getDeviceByUid($uid)
    {
        
        if((device::where('uid', $uid)->count())>0){
            $device = device::where('uid', $uid)->get();               
            
            return response()->json([
                "status" => 200,
                "message" => "Success",            
                "data" => $device,
            ], 200);
        }else{
            return response()->json([
                "status" => 200,
                "message" => "Device not found",
                "data" => [],
            ], 200);
        }
    }

    public function getDeviceDB()
    {
        $currentUser = Auth::user();
        if((device::where('id_user', $currentUser->id)->count())>0){
            $device = device::where('id_user', $currentUser->id)->get();               
            
            return response()->json([
                "status" => 200,
                "message" => "Success",            
                "data" => $device,
            ], 200);
        }else{
            return response()->json([
                "status" => 200,
                "message" => "Device not found",
                "data" => [],
            ], 200);
        }
    }

    public function getDeviceByIdUser($id)
    {
        if((device::where('id_user', $id)->count())>0){
            $device = device::where('id_user', $id)->get();               
            
            return response()->json([
                "status" => 200,
                "message" => "Success",            
                "data" => $device,
            ], 200);
        }else{
            return response()->json([
                "status" => 200,
                "message" => "Device not found",
                "data" => [],
            ], 200);
        }
    }

    public function updateDBById($data)
    {
        if((device::where('id', $data->id)->count()) > 0){
            $device = device::find($data->id);
            $device->status = empty($data->status) ? $device->status : $data->status;
            $device->phone_number = empty($data->phone_number) ? $device->phone_number : $data->phone_number;
            $device->name = empty($data->name) ? $device->name : $data->name;
            $device->uid = empty($data->uid) ? $device->uid : $data->uid;
            $device->id_callback = empty($data->id_callback) ? $device->id_callback : $$data->id_callback;
            $device->kuota_sent = (int) (empty($data->kuota_sent) ? $device->kuota_sent : $data->kuota_sent);
            $device->kuota_receive = (int) (empty($data->kuota_receive) ? $device->kuota_receive : $data->kuota_receive);
            $device->sent = (int) (empty($data->sent) ? $device->sent : $data->sent);
            $device->receive = (int) (empty($data->receive) ? $device->receive : $data->receive);
            $device->type = (int) (empty($data->type) ? $device->type : $data->type);
            $device->save();
        
            return response()->json([
                "status" => 200,
                "message" => "Status Device successfully updated",
                "data" => $device
            ], 200);

        }else{
            return response()->json([
                "status" => 200,
                "message" => "Device not found",
                "data" => []
            ], 200);            
        }
    }
}