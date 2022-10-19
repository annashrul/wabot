<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\eForm;
use App\Models\eForm_question;

use BotMan\BotMan\BotMan;
use App\Http\Conversations\OnboardingConversation;

class eFormController extends Controller
{
    public function createEform(Request $request)
    {
    	$currentUser = Auth::user();
    	$eForm = new eForm;
    	$eForm->id_user = $currentUser->id;
        $eForm->id_device = $request->id_device;
    	$eForm->eform_name = $request->eform_name;
    	$eForm->save();
    	if (! empty($eForm->id)) {
            return response()->json([
                'status' => 200,
                'message' => 'E-form successfully inserted',
                'data' => $eForm,
            ], 200);
        }else{
            return response()->json([
                'status' => 400,
                'message' => 'Failed',
                'data' => $eForm,
            ]);
        }
    }

    public function getEform(Request $request)
    {
        $currentUser = Auth::user();
        if((eForm::where('id_user', $currentUser->id)->count()) > 0){
            if((eForm::where('id_device', $request->id_device)->count()) > 0){
                $data = eForm::where('id_user', $currentUser->id)->where('id_device', $request->id_device)->get();
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
                'data' => [],
            ], 200);    
        }     
    }

    public function updateEform(Request $request)
    {
        if((eForm::where('id_device', $request->device)->count()) >0){
            if((eForm::where('id', $request->id_eform)->count()) > 0){
                $eform = eForm::find($request->id_eform);
                $eform->eform_name = is_null($request->eform_name) ? $eform->eform_name : $request->eform_name;
                $eform->save();

                return response()->json([
                        "status" => 200,
                        "message" => "E-form successfully updated",
                        "data" => $eform
                    ], 200);
            }else{
                return response()->json([
                    "status" => 200,
                    "message" => "E-form not found",
                    "data" => []
                ], 200);            
            }
        }else{
            return response()->json([
                    "status" => 200,
                    "message" => "Device not found",
                    "data" => []
                ], 200);
        }
        
    }

    public function deleteEform(Request $request)
    {
        if((eForm::where('id_device', $request->id_device)->count()) >0){
            if((eForm::where('id', $request->id_eform)->count()) > 0){
                $eform = eForm::find($request->id_eform);
                $eform->delete();

                return response()->json([
                        "status" => 200,
                        "message" => "E-form successfully deleted",
                        "data" => $eform
                    ], 200);
            }else{
                return response()->json([
                    "status" => 200,
                    "message" => "E-form not found",
                    "data" => []
                ], 200);            
            }
        }else{
            return response()->json([
                    "status" => 200,
                    "message" => "Device not found",
                    "data" => []
                ], 200);
        }
    }

    public function createQuestion(Request $request)
    {
        foreach ($request->question as $k => $value) {
            $eForm_question = new eForm_question;
            $eForm_question->id_eform = $request->id_eform;
            $eForm_question->question = $value;
            $eForm_question->question_number = $k;
            $eForm_question->save();
        }

    	if (! empty($eForm_question->id)) {
            return response()->json([
                'status' => 200,
                'message' => 'E-form question successfully inserted',
                'data' => $eForm_question,
            ], 200);
        }else{
            return response()->json([
                'status' => 400,
                'message' => 'Failed',
                'data' => $eForm_question,
            ]);
        }
    }

    public function getQuestion($id_eform)
    {
        if((eForm_question::where('id_eform', $id_eform)->count()) > 0){
            $data = eForm_question::where('id_eform', $id_eform)->get();
            return response()->json([
                    'status' => 200,
                    'message' => 'Success',
                    'data' => $data,
                ], 200);
            }else{
                return response()->json([
                    'status' => 200,
                    'message' => 'There is no E-Form found',
                    'data' => [],
                    
                ], 200);    
            } 
    }

    public function updateQuestion(Request $request)
    {
        if((eForm_question::where('id_eform', $request->id_eform)->count()) > 0){
            if((eForm_question::where('id', $request->id_question)->count()) > 0){
                $eForm_question = eForm_question::find($request->id_question);
                $eForm_question->id_eform = is_null($request->id_eform) ? $eForm_question->id_eform : $request->id_eform;
                $eForm_question->question = is_null($request->question) ? $eForm_question->question : $request->question;
                $eForm_question->question_number = is_null($request->question_number) ? $eForm_question->question_number : $request->question_number;
                $eForm_question->save();

                return response()->json([
                        'status' => 200,
                        'message' => 'Success',
                        'data' => $eForm_question,
                    ], 200);
            }else{
                return response()->json([
                    'status' => 200,
                    'message' => 'There is no question found',
                    'data' => [],
                        
                ], 200);
            }
            
        }else{
            return response()->json([
                'status' => 200,
                'message' => 'There is no E-Form found',
                'data' => [],
                    
            ], 200);    
        } 
    }

    public function deleteQuestion(Request $request)
    {
        if((eForm_question::where('id_eform', $request->id_eform)->count()) > 0){
            if((eForm_question::where('id', $request->id_question)->count()) > 0){
                $eForm_question = eForm_question::find($request->id_question);
                $eForm_question->delete();

                return response()->json([
                        'status' => 200,
                        'message' => 'Success',
                        'data' => $eForm_question,
                    ], 200);
            }else{
                return response()->json([
                    'status' => 200,
                    'message' => 'There is no question found',
                    'data' => [],
                        
                ], 200);
            }
            
        }else{
            return response()->json([
                'status' => 200,
                'message' => 'There is no E-Form found',
                'data' => [],
                    
            ], 200);    
        } 
    }


    public function getEformByDevice($id_device)
    {
        if((eForm::where('id_device', $id_device)->count()) > 0){
        
            $data = eForm::where('id_device', $id_device)->get();
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

    }


}