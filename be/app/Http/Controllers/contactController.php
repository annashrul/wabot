<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\contact;

class contactController extends Controller
{
	
	
    public function createContact(Request $request)
    {
    	$currentUser = Auth::user();
    	$contact = new contact;
    	$contact->id_user = $currentUser->id;
    	$contact->contact_number = $request->contact_number;
    	$contact->contact_name = $request->contact_name;
    	$contact->save();

        if (! empty($contact->id)) {
            return response()->json([
                'status' => 200,
                'message' => 'Contact successfully inserted',
                'data' => $contact,
            ]);
        }else{
            return response()->json([
                'status' => 400,
                'message' => 'Failed',
                'data' => $contact,
            ]);
        }
    }

    public function getContact()
    {
      
            $currentUser = Auth::user();
       
            if((contact::where('id_user', $currentUser->id)->count()) > 0){
                $data = contact::where('id_user', $currentUser->id)->get();
                return response()->json([
                    'status' => 200,
                    'message' => 'Success',
                    'data' => $data,
                ]);
            }else{
                return response()->json([
                    'status' => 404,
                    'message' => 'Contact not found',
                    'data' => [],
                    
                ]);    
            }   
       

    }
    public function updateContact(Request $request)
    {
        $currentUser = Auth::user();
        if ((contact::where('id_user', $currentUser->id)->count()) > 0){
            if((contact::where('id', $request->id)->count()) > 0){
                $contact = contact::find($request->id);
                $contact->contact_name = is_null($request->contact_name) ? $contact->contact_name : $request->contact_name;
                $contact->contact_number = is_null($request->contact_number) ? $contact->contact_number : $request->contact_number;
                $contact->save();

                return response()->json([
                    "status" => 200,
                    "message" => "Contact updated successfully",
                    "data" => $contact
                ]);
            }else{
                return response()->json([
                    "status" => 404,
                    "message" => "Contact not found",
                ]);
            }
            
        }else{
            return response()->json([
                "status" => 404,
                "message" => "User not found"
            ]);
        }
    }

    public function deleteContact(Request $request)
    {

        $currentUser = Auth::user();
        $count = contact::where('id_user', $currentUser->id)->count();
        if($count > 0) {
            $countID = contact::where('id', $request->id)->count();
            if($countID>0){
                $contact = contact::find($request->id);
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

    public function syncContact(Request $request)
    {
        $currentUser = Auth::user();
        $phone_no = $currentUser->phone_number;
        if(is_null($phone_no)){
            return response()->json([
                    "status" => 404,
                    "message" => "please update phone number",
            ]);
        }else{
            return response()->json([
                    "status" => 200,
                    "message" => "Success",
            ]);
        }
    }

    public function getContactById($id)
    {
        if((contact::where('id', $id)->count()) > 0){
            $data = contact::where('id', $id)->get();
            return response()->json([
                'status' => 200,
                'message' => 'Success',
                'data' => $data,
            ]);
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'Contact not found',
                'data' => [],
                
            ]);    
        }
    }

     public function createContactDB($request)
    {
        $contact = new contact;
        $contact->id_user = $request->id_user;
        $contact->contact_number = $request->contact_number;
        $contact->contact_name = $request->contact_name;
        $contact->save();

        if (! empty($contact->id)) {
            return response()->json([
                'status' => 200,
                'message' => 'Contact successfully inserted',
                'data' => $contact,
            ]);
        }else{
            return response()->json([
                'status' => 400,
                'message' => 'Failed',
                'data' => $contact,
            ]);
        }
    }
}
