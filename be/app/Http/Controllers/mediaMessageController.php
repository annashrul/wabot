<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\mediaStorage;
use Carbon\Carbon;
use File;

class mediaMessageController extends Controller
{
    public function uploadMedia(Request $request)
    {


        $file = $request->file('media');
        $destinationPath = 'storage/';
        $originalFile = $file->getClientOriginalName();
        $now = Carbon::now()->format('Y-m-d_H-i-s_');
        $filename = $now.$originalFile;
        
        $media = new mediaStorage;
        $media->path_file = $destinationPath.$filename;
        $media->file_name = $filename;
        $media->save();
        $id_media = $media->id;

        
        $file->move($destinationPath, $filename);
//        print_r($id_media);
         if(!empty($id_media)){
             return response()->json([
                 'status' => 200,
                 'message' => 'Media successfully inserted',
                 'data' => $media,
             ]);
         }else{
             return response()->json([
                 'status' => 400,
                 'message' => 'Failed',
                 'data' => $media,
             ]);
         }
    }

    

    public function getMedia($id)
    {
        if((mediaStorage::where('id', $id)->count())>0){
            $media = mediaStorage::where('id', $id)->get();               
            
            return response()->json([
                "status" => 200,
                "message" => "Succeess",            
                "data" => $media,
            ], 200);
        }else{
            return response()->json([
                "status" => 200,
                "message" => "Device not found",
                "data" => [],
            ], 200);
        }
    }

    public function getMediaById(Request $request)
    {
        if((mediaStorage::where('id', $request->id)->count())>0){
            $media = mediaStorage::where('id', $request->id)->get();               
            
            return response()->json([
                "status" => 200,
                "message" => "Succeess",            
                "data" => $media,
            ], 200);
        }else{
            return response()->json([
                "status" => 200,
                "message" => "Device not found",
                "data" => [],
            ], 200);
        }
    }

    public function deleteDir()
    {
        $filesInFolder = File::files('storage');
        foreach($filesInFolder as $path) { 
            $file = pathinfo($path);
            if((mediaStorage::where('file_name', $file['basename'])->count())>0){
                $media = mediaStorage::where('file_name', $file['basename'])->get()->toArray();
                $updateTime = strtotime($media[0]['updated_at']);
                $interval = date('Y-m-dh:i',strtotime('+7 day', $updateTime));
                $now = Carbon::now()->format('Y-m-dh:i');
                
                if($interval<=$now){
                    $updateMedia = mediaStorage::find($media[0]['id']);           
                    $updateMedia->path_file = null;
                    $updateMedia->save();

                    $path = 'storage/'.$file['basename'];
                    File::delete($path);
                }

                
            }
            
        }
    }
}
