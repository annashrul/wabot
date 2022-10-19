<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\messageController;
use App\Http\Controllers\deviceController;
use App\Http\Controllers\contactController;
use App\Http\Controllers\mediaMessageController;

use App\Models\schedule_message;
use App\Models\message;
use App\Models\varStorage;

use Carbon\Carbon;

class scheduleMessageController extends Controller
{

    public function createScheduleDB($request)
    {
       
        $schedule = new schedule_message;
        $schedule->id_device = $request['id_device'];
        $schedule->id_message = $request['id_message'];
        $schedule->recurrent = $request['time']['recurent'];
        $schedule->status = "ACTIVE";
        if($request['time']['recurent'] == "EVERYDAY"){
            $schedule->send_time = $request['time']['time'];
            $schedule->limit_time = $request['time']['limit'];

            // counting diffrence between next send time and limit time
            $date1 = date_create($request['time']['time']);
            $date2 = date_create($request['time']['limit']);
            $diff = date_diff($date1,$date2);
            $selisih = $diff->format("%a");
            $schedule->max_count = $selisih+1;

        }elseif ($request['time']['recurent'] == "WEEK") {
            $schedule->send_time = $request['time']['time'];
            $schedule->limit_time = $request['time']['limit'];

            // counting diffrence betweet next send time and limit time
            $date1 = date_create($request['time']['time']);
            $date2 = date_create($request['time']['limit']);
            $diff = date_diff($date1,$date2);
            $selisih = ($diff->format("%a"))/7;
            $schedule->max_count = $selisih+1;
        }elseif ($request['time']['recurent'] == "MONTH") {
            $schedule->send_time = $request['time']['time'];
            $schedule->limit_time = $request['time']['limit'];

            // counting diffrence betweet next send time and limit time
            $date1 = date_create($request['time']['time']);
            $date2 = date_create($request['time']['limit']);
            $diff = date_diff($date1,$date2);
            $selisih = ($diff->format("%a"))/30;
            $schedule->max_count = $selisih+1;
        }elseif ($request['time']['recurent'] == "YEAR") {
            $schedule->send_time = $request['time']['time'];
            $schedule->limit_time = $request['time']['limit'];

            // counting diffrence betweet next send time and limit time
            $date1 = date_create($request['time']['time']);
            $date2 = date_create($request['time']['limit']);
            $diff = date_diff($date1,$date2);
            $selisih = ($diff->format("%a"))/365;
            $schedule->max_count = $selisih+1;
        }else if ($request['time']['recurent'] == "DAYS") {
            $schedule->send_time = $request['time']['time'];
            $schedule->limit_time = $request['time']['limit'];
            $schedule->specific_date = implode(",", $request['time']['days']);
            $from = Carbon::parse($request['time']['time']);
            $to = Carbon::parse($request['time']['limit']);
            $weekDay = $from->diffInWeekdays($to);
            $schedule->max_count = $weekDay + 1;
        }elseif ($request['time']['recurent'] == "NONE") {
            $schedule->send_time = $request['time']['time'];
            $schedule->limit_time = $request['time']['time'];
            $schedule->max_count = 1;
        }
        $schedule->save();
        if(!empty($schedule->id)){
            return 1;
          }else{
            return 0;
          }

    }
    public function createSchedule(Request $request)
    {

        $message = new message;
        $message->id_device = $request->id_device;
        $message->message = $request->message;
        $message->status = "Scheduled";
        $message->type = "Schedule";
        $message->total = count($request->recipient);
        $message->save();


        foreach ($request->recipient as $key => $value){
            $schedule = new schedule_message;
            $schedule->id_device = $request->id_device;
            $schedule->id_message = $message->id;
            $schedule->recurrent = $request->recurrent;
            $schedule->message = $request->message;
            $schedule->type = $request->type;
            $schedule->status = "ACTIVE";
            $schedule->jid = $value['jid'];

            if($request->recurrent == "Day"){
                $schedule->send_time = $request->next_send_time;
                $schedule->limit_time = $request->limit_time;

                // counting diffrence betweet next send time and limit time
                $date1 = date_create($request->next_send_time);
                $date2 = date_create($request->limit_time);
                $diff = date_diff($date1,$date2);
                $selisih = $diff->format("%a");
                $schedule->max_count = $selisih+1;
            }elseif ($request->recurrent == "Week") {
                $schedule->send_time = $request->next_send_time;
                $schedule->limit_time = $request->limit_time;

                // counting diffrence betweet next send time and limit time
                $date1 = date_create($request->next_send_time);
                $date2 = date_create($request->limit_time);
                $diff = date_diff($date1,$date2);
                $selisih = ($diff->format("%a"))/7;
                $schedule->max_count = $selisih+1;
            }elseif ($request->recurrent == "Month") {
                $schedule->send_time = $request->next_send_time;
                $schedule->limit_time = $request->limit_time;

                // counting diffrence betweet next send time and limit time
                $date1 = date_create($request->next_send_time);
                $date2 = date_create($request->limit_time);
                $diff = date_diff($date1,$date2);
                $selisih = ($diff->format("%a"))/30;
                $schedule->max_count = $selisih+1;
            }elseif ($request->recurrent == "Year") {
                $schedule->send_time = $request->next_send_time;
                $schedule->limit_time = $request->limit_time;

                // counting diffrence betweet next send time and limit time
                $date1 = date_create($request->next_send_time);
                $date2 = date_create($request->limit_time);
                $diff = date_diff($date1,$date2);
                $selisih = ($diff->format("%a"))/365;
                $schedule->max_count = $selisih+1;
            }else if ($request->recurrent == "Specific") {
                $schedule->specific_date = $request->specific_date;
                $specific_date = explode(";", $request->specific_date);
                $count = count($specific_date);
                $schedule->send_time = $specific_date[0];
                $schedule->limit_time = $specific_date[$count-1];
                $schedule->max_count = $count;
            }elseif ($request->recurrent == "None") {
                $schedule->send_time = $request->next_send_time;
                $schedule->limit_time = $request->next_send_time;
                $schedule->max_count = 1;
            }
            $schedule->save();
        }


     
       if(!empty($schedule->id)){
            return response()->json([
                'status' => 200,
                'message' => 'Schedule successfully inserted',
                'data' => $schedule,
            ]);
          }else{
            return response()->json([
                'status' => 400,
                'message' => 'Failed',
                'data' => $schedule,
            ]);
          }
    }

    public function getListSchedule(){
        $currentUser = Auth::user();
        $device = new deviceController;
        $getDevice = $device->getDeviceByIdUser($currentUser->id)->getData();
        $dataSchedule = array();
        foreach ($getDevice->data as $key => $value) {
            if((schedule_message::where('id_device', $value->id)->count()) > 0){
                $schedule = schedule_message::where('id_device', $value->id)->get();
                
                foreach ($schedule as $key => $value) {
                    $message = (object) message::find($value['id_message'])->toArray();     
                    $value['message'] = $message;
                    array_push($dataSchedule, $value);
                }
            }
        }
        if(!empty($dataSchedule)){
            return response()->json([
                'status' => 200,
                'message' => 'Success',
                'data' => $dataSchedule,
            ]);
        }else{
            return response()->json([
              "status" => 200,
              "message" => "Schedule not found",
              "data" => [],
            ], 200);
        }
        
    }

      public function deleteSchedule(Request $request){
        if((schedule_message::where('id', $request->id_schedule)->count())>0){
            $schedule = schedule_message::find($request->id_schedule);
            $message = message::find($schedule->id_message);   
            $schedule->delete(); 
            $message->delete();                        
            return response()->json([
              "status" => 200,
              "message" => "Records deleted",
              "data" => $schedule,
            ], 200);
          }else{
            return response()->json([
              "status" => 200,
              "message" => "Node not found",
              "data" => [],
            ], 200);
        }
    }

     public function updateSchedule(Request $request){
        if((schedule_message::where('id', $request->id_schedule)->count()) > 0){
            $schedule = schedule_message::find($request->id_schedule);
            $schedule->id_device = empty ($request->id_device) ? $schedule->id_device : $request->id_device;
            $schedule->status = empty ($request->status) ? $schedule->status : $request->status;
            $schedule->recurrent = empty ($request->recurrent) ? $schedule->recurrent : $request->recurrent;
            // if((message::where('id', $schedule->id_message)->count()) > 0){
            //     $message = message::find($schedule->id_message);
            //     $message->message = empty ($request->message) ? $message->message : $request->recurrent;
            //     $message->save();
            // }

            if($schedule->recurrent == "EVERYDAY"){
                $schedule->send_time =  empty ($request->time) ? $schedule->send_time : $request->time;
                $schedule->limit_time = empty ($request->limit) ? $schedule->limit_time : $request->limit;

                // counting diffrence betweet next send time and limit time
                $date1 = date_create($schedule->send_time);
                $date2 = date_create($schedule->limit_time);
                $diff = date_diff($date1,$date2);
                $selisih = $diff->format("%a");
                $schedule->max_count = $selisih+1;
            }elseif ($schedule->recurrent == "WEEK") {
                $schedule->send_time =  empty ($request->time) ? $schedule->send_time : $request->time;
                $schedule->limit_time = empty ($request->limit) ? $schedule->limit_time : $request->limit;

                // counting diffrence betweet next send time and limit time
                $date1 = date_create($schedule->send_time);
                $date2 = date_create($schedule->limit_time);
                $diff = date_diff($date1,$date2);
                $selisih = ($diff->format("%a"))/7;
                $schedule->max_count = $selisih+1;
            }elseif ($schedule->recurrent == "MONTH") {
                $schedule->send_time =  empty ($request->time) ? $schedule->send_time : $request->time;
                $schedule->limit_time = empty ($request->limit) ? $schedule->limit_time : $request->limit;

                // counting diffrence betweet next send time and limit time
                $date1 = date_create($schedule->send_time);
                $date2 = date_create($schedule->limit_time);
                $diff = date_diff($date1,$date2);
                $selisih = ($diff->format("%a"))/30;
                $schedule->max_count = $selisih+1;
            }elseif ($schedule->recurrent == "YEAR") {
                $schedule->send_time =  empty ($request->time) ? $schedule->send_time : $request->time;
                $schedule->limit_time = empty ($request->limit) ? $schedule->limit_time : $request->limit;

                // counting diffrence betweet next send time and limit time
                $date1 = date_create($schedule->send_time);
                $date2 = date_create($schedule->limit_time);
                $diff = date_diff($date1,$date2);
                $selisih = ($diff->format("%a"))/365;
                $schedule->max_count = $selisih+1;
            }else if ($schedule->recurrent == "DAYS") {
                $schedule->specific_date = $request->specific_date;
                $specific_date = explode(";", $request->specific_date);
                $count = count($specific_date);
                $schedule->send_time = $specific_date[0];
                $schedule->limit_time = $specific_date[$count-1];
                $schedule->max_count = $count;
            }elseif ($schedule->recurrent == "NONE") {
                $schedule->send_time = empty ($request->time) ? $schedule->send_time : $request->time;
                $schedule->limit_time = empty ($request->limit) ? $schedule->limit_time : $request->limit;
                $schedule->max_count = 1;
            }
            $schedule->save();

            return response()->json([
                    "status" => 200,
                    "message" => "Schedule successfully updated",
                    "data" => $schedule
                ], 200);
        }else{
            return response()->json([
                "status" => 200,
                "message" => "Node not found",
                "data" => []
            ], 200);            
        }
    }

    public function checkSchedule()
    {
        // inisialisasi waktu sekarang dan 1 menit sebelumnya
        $now = strtotime(Carbon::now()->toDateTimeString());
        $back = strtotime(Carbon::now()->subMinutes(1)->toDateTimeString());
        $now = date('Y-m-d H:i:s',$now);
        $back = date('Y-m-d H:i:s',$back);
       
        // get schedule dari 1 menit kebelakang - sekarang
        $schedule = schedule_message::whereBetween('send_time', [$back, $now])->get()->toArray();
        print_r($schedule);
        
        if(empty($schedule[0])){
            return 'Tidak ada pesan yg harus dikirim';
        }
        

        if(!empty($schedule)){
            $data1 = (object)[];
            $data2 = (object)[];
            $data3 = (object)[];
            $response1 = [];
            $response2 = [];
            $response3 = [];
            foreach ($schedule as $key => $value) {
                // get device
                $device = new deviceController;
                $getDevice = $device->getDeviceById($value['id_device']); 
                $getDevice = $getDevice->getData();
                if(empty($getDevice->data[0])){
                    
                    return 'Devicenya gaada';
                }
                if($value['status'] == "ACTIVE"){
                    // get message
                    $message = new messageController;
                    $getMessage = $message->getMessageByID($value['id_message'])->getData();
                    
                    // get recipient
                    $getRecipient = $message->getRecipientByIDMessage($value['id_message'])->getData();
                    
                    // inisialisasi string tampungan untuk recipient masing2 tipe
                    $messageContact = '';
                    $messageGroup = '';
                    $messageBroadcast = '';

                    // mengisi string tampungan recipient  
                    foreach ($getRecipient->data as $k => $v) {
                        if($v->type == 'contactNew' || $v->type == 'contactWeb' || $v->type == 'contactDevice'){
                            if(empty($messageContact)){
                                $messageContact = $v->phone;
                            }else{
                                $messageContact .= ','. $v->phone;
                            }
                        }elseif($v->type == 'group'){
                            if(empty($messageGroup)){
                                $messageGroup = $v->phone;
                            }else{
                                $messageGroup .= ','. $v->phone;
                            }
                        }elseif($v->type == 'broadcast'){
                            if(empty($messageBroadcast)){
                                $messageBroadcast = $v->phone;
                            }else{
                                $messageBroadcast .= ','. $v->phone;
                            }
                        }
                    }

                    // send message ke masing2 recipient
                    // send to api send message
                    if($getMessage->data[0]->varStorage == 1){
                        // kondisi schedule punya var
                        // get var with id message
                        if((varStorage::where('id_message', $getMessage->data[0]->id)->count())>0){
                            $varStorage = varStorage::where('id_message', $getMessage->data[0]->id)->get()->toArray();
                            $objMessage = array(); 
                            $contactWeb = new contactController;
                            foreach ($varStorage as $key => $val) {
                                // temp array var
                                $var = array("var0"=>$val['var0'], "var1"=>$val['var1'], "var2"=>$val['var2'], "var3"=>$val['var3'], "var4"=>$val['var4'], "var5"=>$val['var5'], "var6"=>$val['var6'], "var7"=>$val['var7'], "var8"=>$val['var8'], "var9"=>$val['var9']);
                                
                                // ganti message varnya
                                $message = $getMessage->data[0]->message; 
                                foreach ($var as $key => $v) {
                                    $pola = '/\$'.$key.'/';
                                    if(isset($v)){
                                        $pesan = preg_replace($pola, $v, $message);
                                    }
                                    $message = $pesan;
                                }
                                // bikin object isinya message dan recipientnya
                                $data = [
                                    "to" => $val['phone'],
                                    "message" => $pesan,
                                    "type" => "message"
                                ];
                                array_push($objMessage, $data);
                            }
                        }else{
                            print_r("var not found");
                        }

                        // send to wa core  
                        $response1 = Http::post('https://wabot.pesanku.id/wa/'.$getDevice->data[0]->uid.'/send-message-multiple', $objMessage);
                        $data1 = $objMessage;
                        


                    }elseif(!is_null($getMessage->data[0]->id_media)){
                        // kondisi schedule punya media
                        // get media
                        $client = new Client;
                        $media = new mediaMessageController;
                        $getMedia = $media->getMedia($getMessage->data[0]->id_media)->getData();
                        $pathFile = public_path('/'.$getMedia->data[0]->path_file);  
                        $infoPath = pathinfo($pathFile);
                        $mime = mime_content_type($pathFile);
                        $extension = $infoPath['extension'];
                    
                        if(($extension == 'jpg') || ($extension == 'png') || ($extension == 'jpeg')){
                            $type = 'imageMessage';
                        }else{
                            $type = 'documentMessage';
                        }

                        // send to api send message
                        $url = 'https://wabot.pesanku.id/wa/'.$getDevice->data[0]->uid.'/send-media';
                        // type = message (contact, contact WA, number, category)
                        if(!empty($messageContact)){  
                            $cFile = curl_file_create($pathFile, $mime);
                            $data1 = array(
                                        'to' => $messageContact,
                                        'caption' => $getMessage->data[0]->message,
                                        'type' => 'message',     
                                        'mesageType' => $type,    
                                        'file'=> $cFile 
                            ); // Parameter to be sent
                            $ch = curl_init();
                            curl_setopt($ch, CURLOPT_URL, $url);
                            curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type : multipart/form-data'));
                            curl_setopt($ch, CURLOPT_POST,1);
                            curl_setopt($ch, CURLOPT_POSTFIELDS, $data1);
                            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
                            $result = curl_exec($ch);
                            $response1 = json_decode($result, true);
                            curl_close ($ch);
                        }
                        // type = group
                        if(!empty($messageGroup)){
                            $cFile = curl_file_create($pathFile, $mime);
                            $data2 = array(
                                        'to' => $messageGroup,
                                        'caption' => $getMessage->data[0]->message,
                                        'type' => 'group',     
                                        'mesageType' => $type,    
                                        'file'=> $cFile 
                            ); // Parameter to be sent
                            $ch = curl_init();
                            curl_setopt($ch, CURLOPT_URL, $url);
                            curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type : multipart/form-data'));
                            curl_setopt($ch, CURLOPT_POST,1);
                            curl_setopt($ch, CURLOPT_POSTFIELDS, $data2);
                            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
                            $response2 = json_decode(curl_exec($ch));
                            curl_close ($ch);  
                        }
                        // type = broadcast
                        if(!empty($messageBroadcast)){
                            $cFile = curl_file_create($pathFile, $mime);
                            $data3 = array(
                                        'to' => $messageBroadcast,
                                        'caption' => $getMessage->data[0]->message,
                                        'type' => 'broadcast',     
                                        'mesageType' => $type,    
                                        'file'=> $cFile 
                            ); // Parameter to be sent

                            $ch = curl_init();
                            curl_setopt($ch, CURLOPT_URL, $url);
                            curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type : multipart/form-data'));
                            curl_setopt($ch, CURLOPT_POST,1);
                            curl_setopt($ch, CURLOPT_POSTFIELDS, $data3);
                            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
                            $response3 = json_decode(curl_exec($ch));
                            curl_close ($ch);  
                        }

                    }else{
                        // kondisi schedule biasa
                        // type = message (contact, contact WA, number, category)
                        if(!empty($messageContact)){
                            $data1 = [
                                        'to' => $messageContact,
                                        'message' => $getMessage->data[0]->message,
                                        'type' => 'message',     
                            ];  
                            $response1 = Http::post('https://wabot.pesanku.id/wa/'.$getDevice->data[0]->uid.'/send-message', $data1);

                           
                        }
                        if(!empty($messageGroup)){
                            $data2 = [
                                        'to' => $messageGroup,
                                        'message' => $getMessage->data[0]->message,
                                        'type' => 'message',     
                            ];  
                            $response2 = Http::post('https://wabot.pesanku.id/wa/'.$getDevice->data[0]->uid.'/send-message', $data1);
                           
                        }
                        if(!empty($messageBroadcast)){
                            $data3 = [
                                        'to' => $messageBroadcast,
                                        'message' => $getMessage->data[0]->message,
                                        'type' => 'message',     
                            ];  
                            $response3 = Http::post('https://wabot.pesanku.id/wa/'.$getDevice->data[0]->uid.'/send-message', $data1);
                           
                        }

                    }

                    
                    // update schedule
                    $schedule = schedule_message::find($value['id']);
                    if($value['recurrent'] == "EVERYDAY"){
                        $schedule->send_time = date("Y-m-d H:i:s", strtotime($value['send_time'].'+ 1 days')); 
                    }elseif ($value['recurrent'] == "WEEK") {
                        $schedule->send_time = date("Y-m-d H:i:s", strtotime($value['send_time'].'+ 7 days'));
                    }elseif ($value['recurrent'] == "MONTH") {
                        $schedule->send_time = date("Y-m-d H:i:s", strtotime($value['send_time'].'+ 1 month'));
                    }elseif ($value['recurrent'] == "YEAR") {
                        $schedule->send_time = date("Y-m-d H:i:s", strtotime($value['send_time'].'+ 1 year'));
                    }elseif ($value['recurrent'] == "DAYS") {
                        $send_time = date("Y-m-d H:i:s", strtotime($value['send_time'].'+ 1 days'));
                        $send_time = Carbon::parse($send_time);
                        $dayOfTheWeek = $send_time->dayOfWeek;
                        if(($dayOfTheWeek == 1) || ($dayOfTheWeek == 2) || ($dayOfTheWeek == 3) || ($dayOfTheWeek == 4) || ($dayOfTheWeek == 5)){
                            $schedule->send_time = date("Y-m-d H:i:s", strtotime($send_time->toDateTimeString()));
                        }else if(($dayOfTheWeek == 6)){
                            $schedule->send_time = date("Y-m-d H:i:s", strtotime($value['send_time'].'+ 3 days'));
                        
                        }else if(($dayOfTheWeek == 0)){
                            $schedule->send_time = date("Y-m-d H:i:s", strtotime($value['send_time'].'+ 2 days'));    
                        }
                        
                    }
                    $schedule->sent_count = $schedule->sent_count + 1;
                    if($schedule->sent_count == $schedule->max_count){
                        $schedule->status = "INACTIVE";
                    }
                    $schedule->save();       
                }else{
                     print_r('Tidak ada pesan yg harus dikirim status INACTIVE');
                }
            }
            // response
            if((empty($response1)) && (empty($response2)) && (empty($response3))){
                return 'FAILED';
            }else{
                return 'OK';
            }
        }
    }
}
