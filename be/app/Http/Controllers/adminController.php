<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\device;
use App\Models\package;

class adminController extends Controller
{


    public function getUser()
    {
        $user = User::all();
        if(!empty($user)){
            return response()->json([
                'status' => 200,
                'message' => 'Success',
                'data' => $user,
            ]);
        }else{
            return response()->json([
                'status' => 400,
                'message' => 'Failed',
                'data' => [],
            ]);
        }
       
    }

    public function getUserById(Request $request)
    {
        if((User::where('id', $request->id_user)->count())>0){
            $user = User::where('id', $request->id_user)->get();               
            
            return response()->json([
                "status" => 200,
                "message" => "Succeess",            
                "data" => $user,
            ], 200);
        }else{
            return response()->json([
                "status" => 200,
                "message" => "Device not found",
                "data" => [],
            ], 200);
        }
    }

    public function getDevice()
    {
        $device = device::all();
        if(!empty($device)){
            return response()->json([
                'status' => 200,
                'message' => 'Success',
                'data' => $device,
            ]);
        }else{
            return response()->json([
                'status' => 400,
                'message' => 'Failed',
                'data' => [],
            ]);
        }
       
    }

    public function getDeviceById(Request $request)
    {
        if((device::where('id', $request->id_device)->count())>0){
            $device = device::where('id', $request->id_device)->get();               
            
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

    public function getDeviceByUser(Request $request)
    {
        if((device::where('id_user', $request->id_user)->count())>0){
            $device = device::where('id_user', $request->id_user)->get();               
            
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

    public function updateUser(Request $request)
    {
        if(User::where('id', $request->id_user)->exists()){
            $user = User::find($request->id_user);
            $user->name = is_null($request->name) ? $user->name : $request->name;
            $user->email = is_null($request->email) ? $user->email : $request->email;
            $user->package_sent = (int) (is_null($request->package_sent) ? $user->package_sent : $request->package_sent);
            $user->package_receive = (int) (is_null($request->package_receive) ? $user->package_receive : $request->package_receive);
            $user->kuota_sent = (int) (is_null($user->kuota_sent) ? $request->package_sent : ($user->kuota_sent + $request->package_sent));
            $user->kuota_receive = (int) (is_null($user->kuota_receive) ? $request->package_receive : $user->kuota_receive + $request->package_receive);
            $user->save();

            if(!empty($request->package_sent) || !empty($request->package_receive)){
                $package = new package;
                $package->id_user = $user->id;
                $package->package_sent = (int) $request->package_sent;
                $package->package_receive = (int) $request->package_receive;
                $package->save();
            }

            return response()->json([
                "status" => 200,
                "message" => "User Profile updated successfully",
                "data" => $user
            ], 200);
        }else{
            return response()->json([
                "status" => 400,
                "message" => "User not found"
            ], 400);
       }
    }
    
    public function deleteUser(Request $request)
    {
        if(User::where('id', $request->id_user)->exists()) {
            $user = User::find($request->id_user);
            $user->delete();

            return response()->json([
                "status" => 200,
              "message" => "records deleted"
            ], 200);
        }else {
            return response()->json([
                "status" => 400,
              "message" => "user not found"
            ], 400);
      }
    }

    public function updateDevice(Request $request)
    {
        if((device::where('id', $request->id_device)->count()) > 0){
            $device = device::find($request->id_device);
            $device->status = empty($request->status) ? $device->status : $request->status;
            $device->phone_number = empty($request->phone_number) ? $device->phone_number : $request->phone_number;
            $device->name = empty($request->name) ? $device->name : $request->name;
            $device->uid = empty($request->uid) ? $device->uid : $request->uid;
            $device->id_callback = empty($request->id_callback) ? $device->id_callback : $request->id_callback;
            $device->save();
        
            return response()->json([
                "status" => 200,
                "message" => "Device successfully updated",
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

    public function getPackage()
    {
        $package = package::all();
        if(!empty($package)){
            return response()->json([
                'status' => 200,
                'message' => 'Success',
                'data' => $package,
            ]);
        }else{
            return response()->json([
                'status' => 400,
                'message' => 'Failed',
                'data' => [],
            ]);
        }
    }

    public function getPackageByUser(Request $request)
    {
        if((package::where('id_user', $request->id_user)->count())>0){
            $package = package::where('id_user', $request->id_user)->get();               
            
            return response()->json([
                "status" => 200,
                "message" => "Succeess",            
                "data" => $package,
            ], 200);
        }else{
            return response()->json([
                "status" => 200,
                "message" => "Device not found",
                "data" => [],
            ], 200);
        }
    }
}