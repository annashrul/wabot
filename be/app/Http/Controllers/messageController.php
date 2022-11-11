<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\Models\path;

use App\Models\receive_message;
use App\Models\conversation;
use App\Models\send_message;
use App\Models\message;
use App\Models\varStorage;
use App\Models\mediaStorage;
use Illuminate\Support\Facades\DB;
use App\Models\rule;
use App\Http\Controllers\wacoreController;

class messageController extends Controller
{

    //==================================================
    //=============== HISTORY MESSAGE ==================
    //==================================================

    public function getHistoryMessage(Request $request)
    {
        $device = new deviceController;
        $getDevice = $device->getDeviceDB()->getData();
        $message = array();
        foreach ($getDevice->data as $key => $value) {
            if((message::where('id_device', $value->id)->count()) > 0){
                $data = message::where('id_device', $value->id)->get();
                array_push($message, $data);
            }
        }
        if(!empty($message)){
            return response()->json([
                'status' => 200,
                'message' => 'Success',
                'data' => $message,
            ]);
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'Contact not found',
                'data' => [],

            ]);
        }

    }

    public function getRecipient(Request $request)
    {
        if((send_message::where('id_message', $request->id_message)->count())>0){
            $send_message = send_message::where('id_message', $request->id_message)->get();

            return response()->json([
                "status" => 200,
                "message" => "Succeess",
                "data" => $send_message,
            ], 200);
        }else{
            return response()->json([
                "status" => 200,
                "message" => "Recipient not found",
                "data" => [],
            ], 200);
        }
    }

    public function getRecipientVar(Request $request)
    {
        if((varStorage::where('id_message', $request->id_message)->count())>0){
            $varStorage = varStorage::where('id_message', $request->id_message)->get();

            return response()->json([
                "status" => 200,
                "message" => "Succeess",
                "data" => $varStorage,
            ], 200);
        }else{
            return response()->json([
                "status" => 200,
                "message" => "Recipient not found",
                "data" => [],
            ], 200);
        }
    }
    public function getMessageByID($id)
    {
        if((message::where('id', $id)->count()) > 0){
            $data = message::where('id', $id)->get();

            return response()->json([
                'status' => 200,
                'message' => 'Success',
                'data' => $data,
            ]);
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'Message not found',
                'data' => [],

            ]);
        }
    }
    public function getRecipientByIDMessage($id_message)
    {
        if((send_message::where('id_message', $id_message)->count())>0){
            $send_message = send_message::where('id_message', $id_message)->get();

            return response()->json([
                "status" => 200,
                "message" => "Succeess",
                "data" => $send_message,
            ], 200);
        }else{
            return response()->json([
                "status" => 200,
                "message" => "Recipient not found",
                "data" => [],
            ], 200);
        }
    }
    //==================================================
    //=============== RECEIVE MESSAGE ==================
    //==================================================
    public function receiveMessage(Request $request)
    {
        
        // preprocess receiver number
        $patern = '/((\@.*))/';
        $sender_number = preg_replace($patern, '', $request->meta['remoteJid']);

        // get device by uid receiver
        $device = new deviceController;
        $getDevice = $device->getDeviceByUid($request->device_id);
        $getDevice = $getDevice->getData();

        // get user
        $user = new AuthController;
        $getUser = $user->getUserById($getDevice->data[0]->id_user)->getData();


        // update count and kuota receive message
        $countReceive = $getUser->data[0]->receive + 1;
        $kuotaReceive = $getUser->data[0]->kuota_receive - 1;

        $data = (object)([
            'id' => $getUser->data[0]->id,
            'receive' => $countReceive,
            'kuota_receive' => $kuotaReceive,
        ]);

        $updateUserReceive = $user->updateDBById($data);

        // save message
        $receive_message = new receive_message;
        $receive_message->message = $request->message['conversation'];
        $receive_message->sender_jid = $request->meta['remoteJid'];
        $receive_message->id_device = $getDevice->data[0]->id;
        $receive_message->save();

        // check number is in contact or group?
        $wacore = new wacoreController;
        $isgroup = $wacore->getGroupDBByJid($request->meta['remoteJid'], $getDevice->data[0]->id)->getData();
        $iscontact = $wacore->getContactDBByJid($request->meta['remoteJid'], $getDevice->data[0]->id)->getData();


        if(!empty($isgroup->data)){
            $target = 'group';
        }
        elseif (!empty($iscontact->data)){
            $target = 'contact';
        }
        else{
            $target = 'default';
        }

        // check timestamp conversation
        $checkConversation=conversation::where('id_device', $getDevice->data[0]->id)->where('sender_jid', $request->meta['remoteJid'])->count() > 0;
        if($checkConversation){
            $data = conversation::where('id_device', $getDevice->data[0]->id)->where('sender_jid', $request->meta['remoteJid'])->get()->toArray();
            $updateTime = strtotime($data[0]['updated_at']);
            $interval = date('Y-m-dh:i',strtotime('+15 minutes', $updateTime));
            $now = Carbon::now()->format('Y-m-dh:i');

            if($interval<=$now){
                $conversation = new conversationController;
                $deleteConversation = $conversation->deleteConversation($data[0]['id']);
            }
        }
        $checkConversation=conversation::where('id_device', $getDevice->data[0]->id)->where('sender_jid', $request->meta['remoteJid'])->count() > 0;

        // check conversation
        if($checkConversation){
            $data = conversation::where('id_device', $getDevice->data[0]->id)->where('sender_jid', $request->meta['remoteJid'])->get()->toArray();
            // get path with id
            $path = new pathController;
            $getPath = $path->getPathByID($data[0]['id_path']);
            $getPath = $getPath->getData();

            // check branch, count path with same id next node
            // return $data;
            $pathByCurrentNode = $path->getPathByIdCurrentNode($getPath->data[0]->id_nextNode);
            $pathByCurrentNode = $pathByCurrentNode->getData();

            if(count($pathByCurrentNode->data) > 1){
                // condition with branch
                // compare receive message with key
                foreach ($pathByCurrentNode->data as $key => $value) {
                    if($receive_message->message == $value->key){
                        $next = $value;
                        break;
                    }else{
                        $next = $getPath->data[0];  // ini harus dibenerin buat kondisi kalo node nya api...

                    }
                }
            }
            else if(count($pathByCurrentNode->data) == 1){
                if(is_null($pathByCurrentNode->data[0]->key)){
                    $next = $pathByCurrentNode->data[0];
                }else{
                    if($receive_message->message == $pathByCurrentNode->data[0]->key){
                        $next = $pathByCurrentNode->data[0];
                    }else{
                        $next = $getPath->data[0];
                    }
                }
            }
            else{
                $next = $path->getPathInit($getPath->data[0]->id_rule)->getData();
                $next = $next->data[0];
            }

            if($next->type == "API"){
                // get id api in response node

                $node = new nodeController;
                $nodeAPI = $node->getNodeById($next->id_nextNode)->getData();

                // get table api
                $api = new apiNodeController;
                $getAPI = $api->getAPIByID($nodeAPI->data[0]->response)->getData();


                // temp array var
                $var = array("var0"=>$getAPI->data[0]->var0, "var1"=>$getAPI->data[0]->var1, "var2"=>$getAPI->data[0]->var2, "var3"=>$getAPI->data[0]->var3, "var4"=>$getAPI->data[0]->var4, "var5"=>$getAPI->data[0]->var5, "var6"=>$getAPI->data[0]->var6, "var7"=>$getAPI->data[0]->var7, "var8"=>$getAPI->data[0]->var8, "var9"=>$getAPI->data[0]->var9);

                // temp array param
                $param = array("param0"=>$getAPI->data[0]->param0, "param1"=>$getAPI->data[0]->param1, "param2"=>$getAPI->data[0]->param2, "param3"=>$getAPI->data[0]->param3, "param4"=>$getAPI->data[0]->param4, "param5"=>$getAPI->data[0]->param5);

                foreach ($param as $key => $value) {
                    if($value == "message"){
                        $param[$key] = $request->message['conversation'];
                    }else if($value == "phone_number"){
                        $param[$key] = $sender_number;
                    }
                }
                // call api
                $url = $getAPI->data[0]->url;
                foreach ($param as $key => $value) {
                    $url = preg_replace('/\$'.$key.'/', $value, $url);
                }

                if($getAPI->data[0]->method == "GET"){
                    $res = Http::get($url);
                }else if($getAPI->data[0]->method == "POST"){
                    $res = Http::post($url);
                }

                // get next node api
                $pathNext = $path->getPathByIdCurrentNode($next->id_nextNode)->getData();
                foreach ($pathNext->data as $key => $value) {

                    if(trim($value->key) == 1){ //            condition api node response success
                        $success = $value;
                    }else if(trim($value->key) == 0){ //      condition api node response failed
                        $failed = $value;
                    }
                }
                if($res->successful()){//               condition call to api success
                    $nodeResponse = $node->getNodeById($success->id_nextNode)->getData();
                    $response = (array)json_decode($res);
                    $pesan = $nodeResponse->data[0]->response;
                    foreach ($var as $key => $value) {
                        $pola = '/\$'.$key.'/';
                        if(isset($value)){
                            $hasil = $response['data']->{$value};
                            $pesan = preg_replace($pola, $hasil, $pesan);
                        }
                    }
                    $responseAPI = $success;
                }else{//                                 condition call to api failed
                    $nodeResponse = $node->getNodeById($failed->id_nextNode)->getData();
                    $pesan = $nodeResponse->data[0]->response;

                    $responseAPI = $failed;
                }
                $convo = (object)([
                    'id' => $data[0]['id'],
                    'id_path' => $responseAPI->id,
                ]);
                $conversation = new conversationController;
                $updateConversation = $conversation->updateConversation($convo);

                // send message
                $data = (object)([
                    'recipient' => $sender_number,
                    'id_device' => $getDevice->data[0]->id,
                    'message' => $pesan,
                    'type' => $target,
                ]);
            }
            else{
                $pathNext = $path->getPathByIdCurrentNode($next->id_nextNode)->getData();
                if(empty($pathNext->data)){
                    $conversation = new conversationController;
                    $deleteConversation = $conversation->deleteConversation($data[0]['id']);
                }else{
                    $convo = (object)([
                        'id' => $data[0]['id'],
                        'id_path' => $next->id,
                    ]);

                    $conversation = new conversationController;
                    $updateConversation = $conversation->updateConversation($convo);
                }

                // condition with no branch
                // get next node
                $node = new nodeController;
                $nextnode = $node->getNodeById($next->id_nextNode);
                $nextnode = $nextnode->getData();
                $nip=$request->message['conversation'];
                $fixMsg=$nextnode->data[0]->response;
                if($this->templateMsgVaksin($nip)){
                    $fixMsg=$this->templateMsgVaksin($nip);
                }
                if($nextnode->data[0]->id == 13){
                    $fixMsg=$this->envVaksinIndonesia();
                }
                $prefix=explode("-",$nip);
                if(count($prefix) === 4){
                   $fixMsg= $this->templateMsgTestCovid($nip);
                }

                $data = (object)([
                    'recipient' => $sender_number,
                    'id_device' => $getDevice->data[0]->id,
                    'message'   => $fixMsg,
                    'type'      => $target,
                ]);
                $exp=explode('+',$data->message);

            }
            $cek=[];
            for($i=0;$i<count($exp);$i++){
                $data->message = $exp[$i];
                $cek = $this->sendMessage($data);
            }
            return response()->json($cek);
        }
        else{

            // check rule
            $rule = rule::where('id_device', $getDevice->data[0]->id)->get();
            $path = path::where('id_rule', $getDevice->data[0]->id)->get();
            // return response()->json($getDevice->data);
            // $thisrule = $rule[0];
            if(sizeof($path) < 1){
                $path = path::where('id', 1)->get();
            }
            foreach ($path as $key => $value) {
                if($value->id_currentNode == 1){
                    $thispath = $value;
                }
            }

            if($thispath->type == "API"){
                // get id api in response node
                $node = new nodeController;
                $nodeAPI = $node->getNodeById($thispath->id_nextNode)->getData();

                // get table api
                $api = new apiNodeController;
                $getAPI = $api->getAPIByID($nodeAPI->data[0]->response)->getData();


                // temp array var
                $var = array("var0"=>$getAPI->data[0]->var0, "var1"=>$getAPI->data[0]->var1, "var2"=>$getAPI->data[0]->var2, "var3"=>$getAPI->data[0]->var3, "var4"=>$getAPI->data[0]->var4, "var5"=>$getAPI->data[0]->var5, "var6"=>$getAPI->data[0]->var6, "var7"=>$getAPI->data[0]->var7, "var8"=>$getAPI->data[0]->var8, "var9"=>$getAPI->data[0]->var9);

                // temp array param
                $param = array("param0"=>$getAPI->data[0]->param0, "param1"=>$getAPI->data[0]->param1, "param2"=>$getAPI->data[0]->param2, "param3"=>$getAPI->data[0]->param3, "param4"=>$getAPI->data[0]->param4, "param5"=>$getAPI->data[0]->param5);

                foreach ($param as $key => $value) {
                    if($value == "message"){
                        $param[$key] = $request->message['conversation'];
                    }else if($value == "phone_number"){
                        $param[$key] = $sender_number;
                    }
                }
                print_r($param);

                // call api
                $url = $getAPI->data[0]->url;
                foreach ($param as $key => $value) {
                    $url = preg_replace('/\$'.$key.'/', $value, $url);
                }

                if($getAPI->data[0]->method == "GET"){
                    $res = Http::get($url);
                }else if($getAPI->data[0]->method == "POST"){
                    $res = Http::post($url);
                }

                print_r((array)json_decode($res));

                // get next node api
                $pathNext = $path->getPathByIdCurrentNode($thispath->id_nextNode)->getData();
                foreach ($pathNext->data as $key => $value) {

                    if($value->key == 1){ //            condition api node response success
                        $success = $value;
                    }else if($value->key == 0){ //      condition api node response failed
                        $failed = $value;
                    }
                }

                if($res->successful()){//               condition call to api success
                    $nodeResponse = $node->getNodeById($success->id_nextNode)->getData();
                    $response = (array)json_decode($res);
                    print_r($response);
                    $pesan = $nodeResponse->data[0]->response;
                    foreach ($var as $key => $value) {
                        $pola = '/\$'.$key.'/';
                        if(isset($value)){
                            $hasil = $response['data']->{$value};
                            $pesan = preg_replace($pola, $hasil, $pesan);
                        }
                    }
                    $responseAPI = $success;
                }else{//                                 condition call to api failed
                    $nodeResponse = $node->getNodeById($failed->id_nextNode)->getData();
                    $pesan = $nodeResponse->data[0]->response;

                    $responseAPI = $failed;
                }

                // create conversation
                $convo = (object)([
                    'id_device' => $getDevice->data[0]->id,
                    'id_path' => $responseAPI->id,
                    'sender_jid' => $request->meta['remoteJid'],
                ]);

                $conversation = new conversationController;
                $createConversation = $conversation->newConversation($convo);

                // send message
                $data = (object)([
                    'recipient' => $sender_number,
                    'id_device' => $getDevice->data[0]->id,
                    'message' => $pesan,
                    'type' => $target,
                ]);
            }
            else{
                // get node response
                $node = new nodeController;
                $currentNode = $node->getNodeById($thispath->id_nextNode);
                $currentNode = $currentNode->getData();

                // create conversation
                $convo = (object)([
                    'id_device' => $getDevice->data[0]->id,
                    'id_path' => $thispath->id,
                    'sender_jid' => $request->meta['remoteJid'],
                ]);

                $conversation = new conversationController;
                $createConversation = $conversation->newConversation($convo);

                // send message
                $data = (object)([
                    'recipient' => $sender_number,
                    'id_device' => $getDevice->data[0]->id,
                    'message' => $currentNode->data[0]->response,
                    'type' => $target,
                ]);
            }


            return $this->sendMessage($data);
        }
    }

    private function envVaksinIndonesia(){
        $response = Http::get("https://apicovid19indonesia-v2.vercel.app/api/indonesia");
        $newRes=json_decode($response->body());
        $positif = number_format((int)$newRes->positif)." ORANG";
        $dirawat = number_format($newRes->dirawat)." ORANG";
        $sembuh = number_format($newRes->sembuh)." ORANG";
        $meninggal = number_format($newRes->meninggal)." ORANG";
        $fixMsg="STATUS UPDATE COVID INDONESIA \n\nTANGGAL : ".date("y-m-d",strtotime($newRes->lastUpdate))."\n";
        $fixMsg.= "POSITIF : $positif\nDIRAWAT : $dirawat\nSEMBUH : $sembuh\nMENINGGAL : $meninggal\n\n0. Kembali ke menu sebelumnya\n99. Kembali ke menu awal";
        return $fixMsg;
    }

    private function templateMsgTestCovid($msg){
        $baseUrl='https://testcovid19.toyota.co.id/api/';
        $noReg=$msg;
        $prefix=explode("-",$msg);
        if(count($prefix)==4){
            $url = $baseUrl."login";
            $body=[
                "email"=>"daffigusti0890@gmail.com",
                "password"=>"admin123"
            ];
            $response = Http::post($url,$body);
            $newRes=json_decode($response->body(),TRUE);
            $token= $newRes['data']['token'];
            $newResponse= Http::withToken($token)->get($baseUrl.'test/result?registration_id='.$noReg);
            $resDetail=json_decode($newResponse->body(),TRUE);
            $fixMsg="ID PASIEN : ".strtoupper($resDetail['data']['id_pasien'])."\n";
            $fixMsg.="TIPE PASIEN : ".strtoupper($resDetail['data']['tipe_pasien'])."\n";
            $fixMsg.="NAMA PASIEN : ".strtoupper($resDetail['data']['nama_pasien'])."\n";
            $fixMsg.="NOMOR HP PASIEN : ".strtoupper($resDetail['data']['nomor_hp'])."\n";
            $fixMsg.="DIVISI PASIEN : ".strtoupper($resDetail['data']['divisi'])."\n";
            $fixMsg.="ALAMAT PASIEN : ".strtoupper($resDetail['data']['alamat'])."\n";
            $fixMsg.="TIPE TEST : ".strtoupper($resDetail['data']['tipe_test'])."\n";
            $fixMsg.="LOKASI TEST : ".strtoupper($resDetail['data']['lokasi_test'])."\n";
            $fixMsg.="STATUS : ".strtoupper($resDetail['data']['status'])."\n";
            $fixMsg.="TANGGAL TEST : ".strtoupper($resDetail['data']['tanggal_test'])."\n";
            $fixMsg.="\n\n0. Kembali ke menu sebelumnya\n";
            $fixMsg.="99. Kembali ke menu awal";
            return $fixMsg;
        }

    }


    private function templateMsgVaksin($nip){
        $vaksin = DB::table('vaksin_table')->where("nip_no",$nip)->get();
        if(count($vaksin)>0){
            $pesan="STATUS VAKSINASI ANDA\n\nDATA PEGAWAI\n\nDATA PEGAWAI\nNOREG : $nip\nDIVISI : ";
            $pesanDynamic="";
            $getDivisi="";
            foreach($vaksin as $row){
                $stts=$row->empl_cat;
                if($row->vacc_dose != 'NOT YET'){
                    $getDivisi=$row->div_cd;
                }
                $pesanDynamic.="STATUS : {$stts}\nNAMA : {$row->pat_name}\nTIPE VAKSIN  : {$row->vacc1_cd}\nVAKSIN DOSIS 1 : {$row->vacc1_dt}\nVAKSIN DOSIS 2 :{$row->vacc2_dt}\nVAKSIN DOSIS 3 : {$row->vacc3_dt}\n\n";
            }
            $pesan.="$getDivisi";
            $pesan.="\n\nSTATUS VAKSINASI\n\n{$pesanDynamic}\n\n0. Kembali ke menu sebelumnya\n99. Kembali ke menu awal";
            return $pesan;
        }else{
            return false;
        }

    }

    public function getReceiveMessage()
    {
        $receive_message = receive_message::all();
        if(!empty($receive_message)){
            return response()->json([
                'status' => 200,
                'message' => 'Success',
                'data' => $receive_message,
            ]);
        }else{
            return response()->json([
                'status' => 400,
                'message' => 'Failed',
                'data' => [],
            ]);
        }
    }


    //==================================================
    //================ SEND MESSAGE ====================
    //==================================================

    //--------------------------------------- SEND TEXT MESSAGE TO ALL -----------------------------------
    public function sendMessageAll(Request $request)
    {
          $getUrl = new wacoreController;
        $apiDb = $getUrl->getUrlApi();
        // get current time
        $current_date_time = Carbon::now()->toDateTimeString();
        // get device by id
        $device = new deviceController;
        $getDevice = $device->getDeviceById($request->id_device);
        $getDevice = $getDevice->getData();
        if(empty($getDevice->data[0])){
            return response()->json([
                "status" => 200,
                "message" => "Device not found",
            ], 200);
        }
        // get user
        $user = new AuthController;
        $getUser = $user->getUserById($getDevice->data[0]->id_user)->getData();

        if($getUser->data[0]->kuota_sent != 0){
            // save to message table
            $message = new message;
            $message->id_device = $request->id_device;
            $message->message = $request->message;
            $message->recipient = $request->total;
            $message->time = is_null ($request->time['time']) ? $current_date_time: $request->time['time'];
            $message->type = "Text Message";
            $message->save();
            $id_message = $message->id;

            // update kuota count sent
            $countSent = $getUser->data[0]->sent + $request->total;
            $kuotaSent = $getUser->data[0]->kuota_sent - $request->total;
            $data = (object)([
                'id' => $getUser->data[0]->id,
                'sent' => $countSent,
                'kuota_sent' => $kuotaSent,
            ]);
            $updateUserSent = $user->updateDBById($data);
            $recipient_number = array();
            foreach ($request->recipient as $key => $value) {
                if($key == "contactWeb"){
                    foreach ($value as $i => $v) {
                        // get contact by id
                        $contact = new contactController;
                        $getContact = $contact->getContactById($v)->getData();
                        if(empty($getContact->data[0])){
                            return response()->json([
                                "status" => 200,
                                "message" => "Contact Web not found",
                            ], 200);
                        }

                        // save to recipient table
                        $recipient = new send_message;
                        $recipient->name = $getContact->data[0]->contact_name;
                        $recipient->phone = $getContact->data[0]->contact_number;
                        $recipient->type = $key;
                        $recipient->id_message = $id_message;
                        $recipient->save();

                        if($i == 0) {
                            $recipient_number[$key] = $getContact->data[0]->contact_number;
                        }else{
                            $recipient_number[$key] .= ',' . $getContact->data[0]->contact_number;
                        }
                    }
                }else if($key == "contactDevice"){
                    foreach ($value as $i => $v) {
                        // get zontact by id
                        $contactWA = new wacoreController;
                        $getContactWA = $contactWA->getContactDBById($v)->getData();
                        if(empty($getContactWA->data[0])){
                            return response()->json([
                                "status" => 200,
                                "message" => "Contact WA not found",
                            ], 200);
                        }

                        // preprocess receiver number
                        $contact_number = preg_replace('/((\@.*))/', '', $getContactWA->data[0]->jid);

                        // save to recipient table
                        $recipient = new send_message;
                        $recipient->name = $getContactWA->data[0]->name;
                        $recipient->phone = $contact_number;
                        $recipient->type = $key;
                        $recipient->id_message = $id_message;
                        $recipient->save();

                        if($i == 0) {
                            $recipient_number[$key] = $contact_number;
                        }else{
                            $recipient_number[$key] .= ',' . $contact_number;
                        }
                    }
                }else if($key == "contactNew") {
                    foreach ($value as $i => $v) {
                        // save to recipient table
                        $recipient = new send_message;
                        $recipient->phone = $v;
                        $recipient->type = $key;
                        $recipient->id_message = $id_message;
                        $recipient->save();

                        if($i == 0) {
                            $recipient_number[$key] = $v;
                        }else{
                            $recipient_number[$key] .= ',' . $v;
                        }
                    }
                }else if($key == "group"){
                    foreach ($value as $i => $v) {
                        // get zontact by id
                        $groupWA = new wacoreController;
                        $getGroupWA = $groupWA->getGroupDBById($v)->getData();
                        if(empty($getGroupWA->data[0])){
                            return response()->json([
                                "status" => 200,
                                "message" => "Group WA not found",
                            ], 200);
                        }

                        // save to recipient table
                        $recipient = new send_message;
                        $recipient->name = $getGroupWA->data[0]->name;
                        $recipient->phone = $getGroupWA->data[0]->jid;
                        $recipient->type = $key;
                        $recipient->id_message = $id_message;
                        $recipient->save();

                        if($i == 0) {
                            $recipient_number[$key] = $getGroupWA->data[0]->jid;
                        }else{
                            $recipient_number[$key] .= ',' . $getGroupWA->data[0]->jid;
                        }
                    }
                }else if($key == "broadcast"){
                    foreach ($value as $i => $v) {
                        // get zontact by id
                        $broadcastWA = new wacoreController;
                        $getBroadcastWA = $broadcastWA->getBroadcastDBById($v)->getData();
                        if(empty($getBroadcastWA->data[0])){
                            return response()->json([
                                "status" => 200,
                                "message" => "Broadcast WA not found",
                            ], 200);
                        }
                        // save to recipient table
                        $recipient = new send_message;
                        $recipient->name = $getBroadcastWA->data[0]->name;
                        $recipient->phone = $getBroadcastWA->data[0]->jid;
                        $recipient->type = $key;
                        $recipient->id_message = $id_message;
                        $recipient->save();

                        if($i == 0) {
                            $recipient_number[$key] = $getBroadcastWA->data[0]->jid;
                        }else{
                            $recipient_number[$key] .= ',' . $getBroadcastWA->data[0]->jid;
                        }
                    }
                }elseif ($key == "category") {
                    foreach ($value as $i => $v) {
                        // get member in category
                        $categoryContact = new categoryController;
                        $member = $categoryContact->getMemberById($v)->getData();

                        foreach ($member->member as $j => $k) {
                            // save to recipient table
                            $recipient = new send_message;
                            $recipient->name = $k->contact_name;
                            $recipient->phone = $k->contact_number;
                            $recipient->type = $key;
                            $recipient->id_message = $id_message;
                            $recipient->save();

                            if($j == 0) {
                                $recipient_number[$key] = $k->contact_number;
                            }else{
                                $recipient_number[$key] .= ',' . $k->contact_number ;
                            }
                        }
                    }
                }
            }

            // merge the recipient number type message
            $recipient_final = '';
            foreach ($recipient_number as $key => $value) {
                if(($key == "contactWeb") || ($key == "contactDevice") || ($key == "contactNew") || ($key == "category")){
                    if(!empty($value)){
                        if(empty($recipient_final)) {
                            $recipient_final = $value;
                        }else{
                            $recipient_final .= ',' . $value ;
                        }
                    }
                }
            }

            if(!is_null($request->time['time'])){
                // send data to schedule message
                $data = [
                    'id_device' => $request->id_device,
                    'time' => $request->time,
                    'id_message' => $id_message,
                ];
                $schedule = new scheduleMessageController;
                $createSchedule = $schedule->createScheduleDB($data);


                if($createSchedule==1){
                    return response()->json([
                        'status' => 200,
                        'message' => 'Schedule successfully inserted',
                        'data' => $data,
                    ]);
                }else{
                    return response()->json([
                        'status' => 400,
                        'message' => 'Failed',
                        'data' => [],
                    ]);
                }
            }else{
                // send to api send message
                $data1 = (object)[];
                $data2 = (object)[];
                $data3 = (object)[];
                $response1 = [];
                $response2 = [];
                $response3 = [];
                // type = message (contact, contact WA, number, category)
                if(!empty($recipient_final)){
                    $data1 = [
                        'to' => $recipient_final,
                        'message' => $request->message,
                        'type' => 'message',
                    ];
                    $response1 = Http::post($apiDb.'wa/'.$getDevice->data[0]->uid.'/send-message', $data1);

                }
                // type = group
                if(!empty($recipient_number['group'])){
                    $data2 = [
                        'to' => $recipient_number['group'],
                        'message' => $request->message,
                        'type' => 'group',
                    ];
                    $response2 = Http::post($apiDb.'wa/'.$getDevice->data[0]->uid.'/send-message', $data2);

                }
                // type = broadcast
                if(!empty($recipient_number['broadcast'])){
                    $data3 = [
                        'to' => $recipient_number['broadcast'],
                        'message' => $request->message,
                        'type' => 'broadcast',
                    ];
                    $response3 = Http::post($apiDb.'wa/'.$getDevice->data[0]->uid.'/send-message', $data3);
                }

                if((empty($response1)) && (empty($response2)) && (empty($response3))){
                    return response()->json([
                        'status' => 400,
                        'message' => 'Failed',
                        'data' => [$data1, $data2, $data3]
                    ]);
                }else{
                    return response()->json([
                        'status' => 200,
                        'message' => 'The Message Will be Process',
                        'data' => [$data1, $data2, $data3]
                    ], 200);
                }
            }
        }else{
            return response()->json([
                'status' => 400,
                'message' => 'Your message quota has run out',
                'data' => [],
            ]);
        }

    }

    //------------------------------------------SEND MEDIA MESSAGE--------------------------------------------------
    public function sendMediaMessage(Request $request)
    {
        $getUrl = new wacoreController;
        $apiDb = $getUrl->getUrlApi();
        // get current time
        $current_date_time = Carbon::now()->toDateTimeString();
        // get device by id
        $device = new deviceController;
        $getDevice = $device->getDeviceById($request->id_device);
        $getDevice = $getDevice->getData();
        if(empty($getDevice->data[0])){
            return response()->json([
                "status" => 200,
                "message" => "Device not found",
            ], 200);
        }
        // get user
        $user = new AuthController;
        $getUser = $user->getUserById($getDevice->data[0]->id_user)->getData();

        if($getUser->data[0]->kuota_sent != 0){
            // save to message table
            $message = new message;
            $message->id_device = $request->id_device;
            $message->message = $request->message;
            $message->recipient = $request->total;
            $message->time = is_null ($request->time['time']) ? $current_date_time: $request->time['time'];
            $message->id_media = $request->id_media;
            $message->type = "Media Message";
            $message->save();
            $id_message = $message->id;

            // update kuota count sent
            $countSent = $getUser->data[0]->sent + $request->total;
            $kuotaSent = $getUser->data[0]->kuota_sent - $request->total;
            $data = (object)([
                'id' => $getUser->data[0]->id,
                'sent' => $countSent,
                'kuota_sent' => $kuotaSent,
            ]);
            $updateUserSent = $user->updateDBById($data);
            $recipient_number = array();
            foreach ($request->recipient as $key => $value) {
                if($key == "contactWeb"){
                    foreach ($value as $i => $v) {
                        // get contact by id
                        $contact = new contactController;
                        $getContact = $contact->getContactById($v)->getData();
                        if(empty($getContact->data[0])){
                            return response()->json([
                                "status" => 200,
                                "message" => "Contact Web not found",
                            ], 200);
                        }

                        // save to recipient table
                        $recipient = new send_message;
                        $recipient->name = $getContact->data[0]->contact_name;
                        $recipient->phone = $getContact->data[0]->contact_number;
                        $recipient->type = $key;
                        $recipient->id_message = $id_message;
                        $recipient->save();

                        if($i == 0) {
                            $recipient_number[$key] = $getContact->data[0]->contact_number;
                        }else{
                            $recipient_number[$key] .= ',' . $getContact->data[0]->contact_number;
                        }
                    }
                }else if($key == "contactDevice"){
                    foreach ($value as $i => $v) {
                        // get zontact by id
                        $contactWA = new wacoreController;
                        $getContactWA = $contactWA->getContactDBById($v)->getData();
                        if(empty($getContactWA->data[0])){
                            return response()->json([
                                "status" => 200,
                                "message" => "Contact WA not found",
                            ], 200);
                        }

                        // preprocess receiver number
                        $contact_number = preg_replace('/((\@.*))/', '', $getContactWA->data[0]->jid);

                        // save to recipient table
                        $recipient = new send_message;
                        $recipient->name = $getContactWA->data[0]->name;
                        $recipient->phone = $contact_number;
                        $recipient->type = $key;
                        $recipient->id_message = $id_message;
                        $recipient->save();

                        if($i == 0) {
                            $recipient_number[$key] = $contact_number;
                        }else{
                            $recipient_number[$key] .= ',' . $contact_number;
                        }
                    }
                }else if($key == "contactNew") {
                    foreach ($value as $i => $v) {
                        // save to recipient table
                        $recipient = new send_message;
                        $recipient->phone = $v;
                        $recipient->type = $key;
                        $recipient->id_message = $id_message;
                        $recipient->save();

                        if($i == 0) {
                            $recipient_number[$key] = $v;
                        }else{
                            $recipient_number[$key] .= ',' . $v;
                        }
                    }
                }else if($key == "group"){
                    foreach ($value as $i => $v) {
                        // get zontact by id
                        $groupWA = new wacoreController;
                        $getGroupWA = $groupWA->getGroupDBById($v)->getData();
                        if(empty($getGroupWA->data[0])){
                            return response()->json([
                                "status" => 200,
                                "message" => "Group WA not found",
                            ], 200);
                        }

                        // save to recipient table
                        $recipient = new send_message;
                        $recipient->name = $getGroupWA->data[0]->name;
                        $recipient->phone = $getGroupWA->data[0]->jid;
                        $recipient->type = $key;
                        $recipient->id_message = $id_message;
                        $recipient->save();

                        if($i == 0) {
                            $recipient_number[$key] = $getGroupWA->data[0]->jid;
                        }else{
                            $recipient_number[$key] .= ',' . $getGroupWA->data[0]->jid;
                        }
                    }
                }else if($key == "broadcast"){
                    foreach ($value as $i => $v) {
                        // get zontact by id
                        $broadcastWA = new wacoreController;
                        $getBroadcastWA = $broadcastWA->getBroadcastDBById($v)->getData();
                        if(empty($getBroadcastWA->data[0])){
                            return response()->json([
                                "status" => 200,
                                "message" => "Broadcast WA not found",
                            ], 200);
                        }
                        // save to recipient table
                        $recipient = new send_message;
                        $recipient->name = $getBroadcastWA->data[0]->name;
                        $recipient->phone = $getBroadcastWA->data[0]->jid;
                        $recipient->type = $key;
                        $recipient->id_message = $id_message;
                        $recipient->save();

                        if($i == 0) {
                            $recipient_number[$key] = $getBroadcastWA->data[0]->jid;
                        }else{
                            $recipient_number[$key] .= ',' . $getBroadcastWA->data[0]->jid;
                        }
                    }
                }elseif ($key == "category") {
                    foreach ($value as $i => $v) {
                        // get member in category
                        $categoryContact = new categoryController;
                        $member = $categoryContact->getMemberById($v)->getData();

                        foreach ($member->member as $j => $k) {
                            // save to recipient table
                            $recipient = new send_message;
                            $recipient->name = $k->contact_name;
                            $recipient->phone = $k->contact_number;
                            $recipient->type = $key;
                            $recipient->id_message = $id_message;
                            $recipient->save();

                            if($j == 0) {
                                $recipient_number[$key] = $k->contact_number;
                            }else{
                                $recipient_number[$key] .= ',' . $k->contact_number ;
                            }
                        }
                    }
                }
            }

            // merge the recipient number type message
            $recipient_final = '';
            foreach ($recipient_number as $key => $value) {
                if(($key == "contactWeb") || ($key == "contactDevice") || ($key == "contactNew") || ($key == "category")){
                    if(!empty($value)){
                        if(empty($recipient_final)) {
                            $recipient_final = $value;
                        }else{
                            $recipient_final .= ',' . $value ;
                        }
                    }
                }
            }

            if(!is_null($request->time['time'])){
                // send data to schedule message
                $data = [
                    'id_device' => $request->id_device,
                    'time' => $request->time,
                    'id_message' => $id_message,
                ];
                $schedule = new scheduleMessageController;
                $createSchedule = $schedule->createScheduleDB($data);


                if($createSchedule==1){
                    return response()->json([
                        'status' => 200,
                        'message' => 'Schedule successfully inserted',
                        'data' => $data,
                    ]);
                }else{
                    return response()->json([
                        'status' => 400,
                        'message' => 'Failed',
                        'data' => [],
                    ]);
                }
            }else{
                // get media
                $client = new Client;
                $media = new mediaMessageController;
                $getMedia = $media->getMedia($request->id_media)->getData();
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
                $post1 = (object)[];
                $post2 = (object)[];
                $post3 = (object)[];
                $result1 = [];
                $result2 = [];
                $result3 = [];
                $url = $apiDb.'wa/'.$getDevice->data[0]->uid.'/send-media';
                // type = message (contact, contact WA, number, category)

                if(!empty($recipient_final)){
                    $cFile = curl_file_create($pathFile, $mime);
                    $post1 = array(
                        'to' => $recipient_final,
                        'caption' => $request->message,
                        'type' => 'message',
                        'mesageType' => $type,
                        'file'=> $cFile
                    ); // Parameter to be sent
                    $ch = curl_init();
                    curl_setopt($ch, CURLOPT_URL, $url);
                    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type : multipart/form-data'));
                    curl_setopt($ch, CURLOPT_POST,1);
                    curl_setopt($ch, CURLOPT_POSTFIELDS, $post1);
                    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
                    $result1 = json_decode(curl_exec($ch));
                    curl_close ($ch);

                    if($type != 'imageMessage'){
                        $data1 = [
                            'to' => $recipient_final,
                            'message' => $request->message,
                            'type' => 'message',
                        ];
                        $response1 = Http::post($apiDb.'wa/'.$getDevice->data[0]->uid.'/send-message', $data1);

                    }
                }
                // type = group
                if(!empty($recipient_number['group'])){
                    $cFile = curl_file_create($pathFile, $mime);
                    $post2 = array(
                        'to' => $recipient_number['group'],
                        'caption' => $request->message,
                        'type' => 'group',
                        'mesageType' => $type,
                        'file'=> $cFile
                    ); // Parameter to be sent
                    $ch = curl_init();
                    curl_setopt($ch, CURLOPT_URL, $url);
                    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type : multipart/form-data'));
                    curl_setopt($ch, CURLOPT_POST,1);
                    curl_setopt($ch, CURLOPT_POSTFIELDS, $post2);
                    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
                    $result2 = json_decode(curl_exec($ch));
                    curl_close ($ch);

                    if($type != 'imageMessage'){
                        $data1 = [
                            'to' => $recipient_number['group'],
                            'message' => $request->message,
                            'type' => 'message',
                        ];
                        $response1 = Http::post($apiDb.'wa/'.$getDevice->data[0]->uid.'/send-message', $data1);

                    }
                }
                // type = broadcast
                if(!empty($recipient_number['broadcast'])){
                    $cFile = curl_file_create($pathFile, $mime);
                    $post3 = array(
                        'to' => $recipient_number['broadcast'],
                        'caption' => $request->message,
                        'type' => 'broadcast',
                        'mesageType' => $type,
                        'file'=> $cFile
                    ); // Parameter to be sent

                    $ch = curl_init();
                    curl_setopt($ch, CURLOPT_URL, $url);
                    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type : multipart/form-data'));
                    curl_setopt($ch, CURLOPT_POST,1);
                    curl_setopt($ch, CURLOPT_POSTFIELDS, $post3);
                    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
                    $result3 = json_decode(curl_exec($ch));
                    curl_close ($ch);

                    if($type != 'imageMessage'){
                        $data1 = [
                            'to' => $recipient_number['broadcast'],
                            'message' => $request->message,
                            'type' => 'message',
                        ];
                        $response1 = Http::post($apiDb.'wa/'.$getDevice->data[0]->uid.'/send-message', $data1);

                    }
                }
                if((empty($result1)) && (empty($result2)) && (empty($result3))){
                    return response()->json([
                        'status' => 400,
                        'message' => 'Failed',
                        'data' => [$post1, $post2, $post3]
                    ]);
                }else{

                    return response()->json([
                        'status' => 200,
                        'message' => 'The Message Will be Process',
                        'data' => [$post1, $post2, $post3]
                    ], 200);
                }
            }
        }else{
            return response()->json([
                'status' => 400,
                'message' => 'Your message quota has run out',
                'data' => [],
            ]);
        }

    }

    //------------------------------------------SEND MESSAGE BY CSV---------------------------------------------------
    public function sendMessageByCSV(Request $request)
    {
        $getUrl = new wacoreController;
        $apiDb = $getUrl->getUrlApi();
        // get current time
        $current_date_time = Carbon::now()->toDateTimeString();
        // get device by id
        $device = new deviceController;
        $getDevice = $device->getDeviceById($request->id_device);
        $getDevice = $getDevice->getData();
        if(empty($getDevice->data[0])){
            return response()->json([
                "status" => 200,
                "message" => "Device not found",
            ], 200);
        }
        // get user
        $user = new AuthController;
        $getUser = $user->getUserById($getDevice->data[0]->id_user)->getData();

        if($getUser->data[0]->kuota_sent != 0){

            // save to message table
            $message = new message;
            $message->id_device = $request->id_device;
            $message->message = $request->message;
            $message->recipient = $request->total;
            $message->time = is_null ($request->time['time']) ? $current_date_time: $request->time['time'];
            $message->varStorage = 1;
            $message->type = "Variable Message";
            $message->save();
            $id_message = $message->id;

            // update kuota count sent
            $countSent = $getUser->data[0]->sent + $request->total;
            $kuotaSent = $getUser->data[0]->kuota_sent - $request->total;
            $data = (object)([
                'id' => $getUser->data[0]->id,
                'sent' => $countSent,
                'kuota_sent' => $kuotaSent,
            ]);
            $updateUserSent = $user->updateDBById($data);

            if(!is_null($request->category_name)){
                $currentUser = Auth::user();
                // create category
                $category = (object)[
                    'id_user' => $currentUser->id,
                    'category_name' => $request->category_name
                ];
                $categoryWeb = new categoryController;
                $newCategoryWeb = $categoryWeb->createCategoryDB($category)->getData();

                // save contact
                $contactWeb = new contactController;
                foreach ($request->data as $key => $value) {
                    $dataReq = (object)array('contact_number' => $value['phone'], 'contact_name' => $value['name'], 'id_user' => $currentUser->id);
                    $newContactWeb = $contactWeb->createContactDB($dataReq)->getData();


                    // add member category
                    $member = (object)[
                        'id_category' => $newCategoryWeb->data->id,
                        'id_contact' => $newContactWeb->data->id
                    ];
                    $addMember = $categoryWeb->addMemberCategory($member)->getData();

                    // save var to varStorage table
                    $varStorage = new varStorage;
                    $varStorage->phone = $value['phone'];
                    $varStorage->name = $value['name'];
                    $varStorage->id_message = $id_message;
                    $varStorage->var0 = empty($value['var0']) ? null : $value['var0'];
                    $varStorage->var1 = empty($value['var1']) ? null : $value['var1'];
                    $varStorage->var2 = empty($value['var2']) ? null : $value['var2'];
                    $varStorage->var3 = empty($value['var3']) ? null : $value['var3'];
                    $varStorage->var4 = empty($value['var4']) ? null : $value['var4'];
                    $varStorage->var5 = empty($value['var5']) ? null : $value['var5'];
                    $varStorage->var6 = empty($value['var6']) ? null : $value['var6'];
                    $varStorage->var7 = empty($value['var7']) ? null : $value['var7'];
                    $varStorage->var8 = empty($value['var8']) ? null : $value['var8'];
                    $varStorage->var9 = empty($value['var9']) ? null : $value['var9'];
                    $varStorage->save();

                    // save to send message table
                    $recipient = new send_message;
                    $recipient->id_message = $message->id;
                    $recipient->type = 'contactWeb';
                    $recipient->phone = $value['phone'];
                    $recipient->name = $value['name'];
                    $recipient->save();
                }

            }else{
                foreach ($request->data as $key => $value) {
                    // save var to varStorage table
                    $varStorage = new varStorage;
                    $varStorage->phone = $value['phone'];
                    $varStorage->name = $value['name'];
                    $varStorage->id_message = $id_message;
                    $varStorage->var0 = empty($value['var0']) ? null : $value['var0'];
                    $varStorage->var1 = empty($value['var1']) ? null : $value['var1'];
                    $varStorage->var2 = empty($value['var2']) ? null : $value['var2'];
                    $varStorage->var3 = empty($value['var3']) ? null : $value['var3'];
                    $varStorage->var4 = empty($value['var4']) ? null : $value['var4'];
                    $varStorage->var5 = empty($value['var5']) ? null : $value['var5'];
                    $varStorage->var6 = empty($value['var6']) ? null : $value['var6'];
                    $varStorage->var7 = empty($value['var7']) ? null : $value['var7'];
                    $varStorage->var8 = empty($value['var8']) ? null : $value['var8'];
                    $varStorage->var9 = empty($value['var9']) ? null : $value['var9'];
                    $varStorage->save();

                    // save to send message table
                    $recipient = new send_message;
                    $recipient->id_message = $message->id;
                    $recipient->type = 'contactWeb';
                    $recipient->phone = $value['phone'];
                    $recipient->name = $value['name'];
                    $recipient->save();
                }


            }

            if(empty($request->time['time'])){
                // send message now
                // get var with id message
                if((varStorage::where('id_message', $id_message)->count())>0){
                    $varStorage = varStorage::where('id_message', $id_message)->get()->toArray();
                    $objMessage = array();
                    foreach ($varStorage as $key => $value) {
                        //$getContact = $contactWeb->getContactById($value['id_contact'])->getData();

                        // temp array var
                        $var = array("var0"=>$value['var0'], "var1"=>$value['var1'], "var2"=>$value['var2'], "var3"=>$value['var3'], "var4"=>$value['var4'], "var5"=>$value['var5'], "var6"=>$value['var6'], "var7"=>$value['var7'], "var8"=>$value['var8'], "var9"=>$value['var9']);

                        // ganti message varnya
                        $message = $request->message;
                        foreach ($var as $key => $v) {
                            $pola = '/\$'.$key.'/';
                            if(isset($v)){
                                $pesan = preg_replace($pola, $v, $message);
                            }
                            $message = $pesan;
                        }
                        // bikin object isinya message dan recipientnya
                        $data = [
                            "to" => $value['phone'],
                            "message" => $pesan,
                            "type" => "message"
                        ];
                        array_push($objMessage, $data);
                    }
                }else{
                    return response()->json([
                        "status" => 200,
                        "message" => "Var not found",
                        "data" => [],
                    ], 200);
                }

                // send to wa core
                $response = Http::post($apiDb.'wa/'.$getDevice->data[0]->uid.'/send-message-multiple', $objMessage);
                if ($response->successful()) {
                    return response()->json([
                        'status' => 200,
                        'message' => 'The Message Will be Process',
                        'data' => $objMessage,
                    ], 200);
                }else{
                    return response()->json([
                        'status' => 400,
                        'message' => 'Failed',
                        'data' => $objMessage,
                    ]);
                }

            }else{
                // scheduled message
                // send data to schedule message
                $data = [
                    'id_device' => $request->id_device,
                    'time' => $request->time,
                    'id_message' => $id_message,
                ];
                $schedule = new scheduleMessageController;
                $createSchedule = $schedule->createScheduleDB($data);


                if($createSchedule==1){
                    return response()->json([
                        'status' => 200,
                        'message' => 'Schedule successfully inserted',
                        'data' => $data,
                    ]);
                }else{
                    return response()->json([
                        'status' => 400,
                        'message' => 'Failed',
                        'data' => [],
                    ]);
                }
            }
        }else{
            return response()->json([
                'status' => 400,
                'message' => 'Your message quota has run out',
                'data' => [],
            ]);
        }




    }

    //----------------------------------------SEND MESSAGE TO CONTACT--------------------------------------------------
    public function sendMessageContact(Request $request)
    {
        $getUrl = new wacoreController;
        $apiDb = $getUrl->getUrlApi();
        // get device by id
        $device = new deviceController;
        $getDevice = $device->getDeviceById($request->id_device);
        $getDevice = $getDevice->getData();

        // get user
        $user = new AuthController;
        $getUser = $user->getUserById($getDevice->data[0]->id_user)->getData();


        if($getUser->data[0]->kuota_sent != 0){

            // save to message table
            $message = new message;
            $message->id_device = $request->id_device;
            $message->message = $request->message;
            $message->recipient = $request->total;
            $message->time = is_null ($request->time['time']) ? $current_date_time: $request->time['time'];
            $message->varStorage = 1;
            $message->type = "Text Message";
            $message->save();
            $id_message = $message->id;


            // update kuota count sent
            $countSent = $getUser->data[0]->sent + count($request->recipient);
            $kuotaSent = $getUser->data[0]->kuota_sent - count($request->recipient);
            $data = (object)([
                'id' => $getUser->data[0]->id,
                'sent' => $countSent,
                'kuota_sent' => $kuotaSent,
            ]);

            $updateUserSent = $user->updateDBById($data);

            foreach ($request->recipient as $key => $value) {
                // preprocess receiver number
                $patern = '/((\@.*))/';
                $receiver_number = preg_replace($patern, '', $value['jid']);
                // save to send message table
                $send_message = new send_message;
                $send_message->id_message = $message->id;
                $send_message->id_device = $request->id_device;
                $send_message->message = $request->message;
                $send_message->jid = $value['jid'];
                $send_message->name = $value['name'];
                $send_message->save();

                if($key == 0) {
                    $recipient = $receiver_number;
                }else{
                    $recipient .= ',' . $receiver_number;
                }
            }

            // send to API
            if(count($request->recipient)==1){
                $data = [
                    'to' => $receiver_number,
                    'message' => $request->message,
                    'type' => 'message',
                ];
                $response = Http::post($apiDb.'wa/'.$getDevice->data[0]->uid.'/send-message', $data);
                if ($response->successful()) {
                    return response()->json([
                        'status' => 200,
                        'message' => 'The Message Will be Process',
                        'data' => $data,
                    ], 200);
                }else{
                    return response()->json([
                        'status' => 400,
                        'message' => 'Failed',
                        'data' => $data,
                    ]);
                }
            }else{
                $data = [
                    'to' => $recipient,
                    'message' => $request->message,
                    'type' => 'message',
                ];
                $response = Http::post($apiDb.'wa/'.$getDevice->data[0]->uid.'/send-message', $data);
                if ($response->successful()) {
                    return response()->json([
                        'status' => 200,
                        'message' => 'The Message Will be Process',
                        'data' => $data,
                    ], 200);
                }else{
                    return response()->json([
                        'status' => 400,
                        'message' => 'Failed',
                        'data' => $data,
                    ]);
                }
            }
        }else{
            return response()->json([
                'status' => 400,
                'message' => 'Your message quota has run out',
                'data' => [],
            ]);
        }

    }


    //------------------------------------------SEND MESSAGE BY TO GROUP------------------------------------------------
    public function sendMessageGroup(Request $request)
    {
        $getUrl = new wacoreController;
        $apiDb = $getUrl->getUrlApi();
        // get device by id
        $device = new deviceController;
        $getDevice = $device->getDeviceById($request->id_device);
        $getDevice = $getDevice->getData();

        // get user
        $user = new AuthController;
        $getUser = $user->getUserById($getDevice->data[0]->id_user)->getData();

        if($getUser->data[0]->kuota_sent != 0){
            // save to message table
            $message = new message;
            $message->message = $request->message;
            $message->id_device = $request->id_device;
            $message->total = count($request->recipient);
            $message->type = "Group";
            $message->save();

            // update kuota count sent
            $countSent = $getUser->data[0]->sent + count($request->recipient);
            $kuotaSent = $getUser->data[0]->kuota_sent - count($request->recipient);
            $data = (object)([
                'id' => $getUser->data[0]->id,
                'sent' => $countSent,
                'kuota_sent' => $kuotaSent,
            ]);

            $updateUserSent = $user->updateDBById($data);

            foreach ($request->recipient as $key => $value) {
                // save to send message table
                $send_message = new send_message;
                $send_message->id_message = $message->id;
                $send_message->id_device = $request->id_device;
                $send_message->message = $request->message;
                $send_message->jid = $value['jid'];
                $send_message->name = $value['name'];
                $send_message->save();

                if($key == 0) {
                    $recipient = $value['jid'];
                }else{
                    $recipient .= ',' . $value['jid'];
                }
            }

            // send to API
            if(count($request->recipient)==1){
                $data = [
                    'to' => $value['jid'],
                    'message' => $request->message,
                    'type' => 'group',
                ];
                $response = Http::post($apiDb.'wa/'.$getDevice->data[0]->uid.'/send-message', $data);
                if ($response->successful()) {
                    return response()->json([
                        'status' => 200,
                        'message' => 'The Message Will be Process',
                        'data' => $data,
                    ], 200);
                }else{
                    return response()->json([
                        'status' => 400,
                        'message' => 'Failed',
                        'data' => $data,
                    ]);
                }
            }else{
                $data = [
                    'to' => $recipient,
                    'message' => $request->message,
                    'type' => 'group',
                ];
                $response = Http::post($apiDb.'wa/'.$getDevice->data[0]->uid.'/send-message', $data);
                if ($response->successful()) {
                    return response()->json([
                        'status' => 200,
                        'message' => 'The Message Will be Process',
                        'data' => $data,
                    ], 200);
                }else{
                    return response()->json([
                        'status' => 400,
                        'message' => 'Failed',
                        'data' => $data,
                    ]);
                }
            }
        }else{
            return response()->json([
                'status' => 400,
                'message' => 'Your message quota has run out',
                'data' => [],
            ]);
        }
    }


    //------------------------------------------SEND MESSAGE TO BROADCAST LIST-----------------------------------------------
    public function sendMessageBroadcast(Request $request)
    {
        $getUrl = new wacoreController;
        $apiDb = $getUrl->getUrlApi();
        // get device by id
        $device = new deviceController;
        $getDevice = $device->getDeviceById($request->id_device);
        $getDevice = $getDevice->getData();

        // get user
        $user = new AuthController;
        $getUser = $user->getUserById($getDevice->data[0]->id_user)->getData();

        if($getUser->data[0]->kuota_sent != 0){
            // save to message table
            $message = new message;
            $message->message = $request->message;
            $message->id_device = $request->id_device;
            $message->total = count($request->recipient);
            $message->type = "Broadcast";
            $message->save();

            // update kuota count sent
            $countSent = $getUser->data[0]->sent + count($request->recipient);
            $kuotaSent = $getUser->data[0]->kuota_sent - count($request->recipient);
            $data = (object)([
                'id' => $getUser->data[0]->id,
                'sent' => $countSent,
                'kuota_sent' => $kuotaSent,
            ]);

            $updateUserSent = $user->updateDBById($data);

            foreach ($request->recipient as $key => $value) {
                // save to send message table
                $send_message = new send_message;
                $send_message->id_message = $message->id;
                $send_message->id_device = $request->id_device;
                $send_message->message = $request->message;
                $send_message->jid = $value['jid'];
                $send_message->name = $value['name'];
                $send_message->save();

                if($key == 0) {
                    $recipient = $value['jid'];
                }else{
                    $recipient .= ',' . $value['jid'];
                }
            }

            // send to API
            if(count($request->recipient)==1){
                $data = [
                    'to' => $value['jid'],
                    'message' => $request->message,
                    'type' => 'broadcast',
                ];
                $response = Http::post($apiDb.'wa/'.$getDevice->data[0]->uid.'/send-message', $data);
                if ($response->successful()) {
                    return response()->json([
                        'status' => 200,
                        'message' => 'The Message Will be Process',
                        'data' => $data,
                    ], 200);
                }else{
                    return response()->json([
                        'status' => 400,
                        'message' => 'Failed',
                        'data' => $data,
                    ]);
                }
            }else{
                $data = [
                    'to' => $recipient,
                    'message' => $request->message,
                    'type' => 'broadcast',
                ];
                $response = Http::post($apiDb.'wa/'.$getDevice->data[0]->uid.'/send-message', $data);
                if ($response->successful()) {
                    return response()->json([
                        'status' => 200,
                        'message' => 'The Message Will be Process',
                        'data' => $data,
                    ], 200);
                }else{
                    return response()->json([
                        'status' => 400,
                        'message' => 'Failed',
                        'data' => $data,
                    ]);
                }
            }
        }else{
            return response()->json([
                'status' => 400,
                'message' => 'Your message quota has run out',
                'data' => [],
            ]);
        }
    }


    //------------------------------------------SEND MESSAGE TO CATEGORY---------------------------------------------------
    public function sendMessageCategory(Request $request)
    {
         $getUrl = new wacoreController;
        $apiDb = $getUrl->getUrlApi();
        // get device by id
        $device = new deviceController;
        $getDevice = $device->getDeviceById($request->id_device);
        $getDevice = $getDevice->getData();

        // get user
        $user = new AuthController;
        $getUser = $user->getUserById($getDevice->data[0]->id_user)->getData();

        if($getUser->data[0]->kuota_sent != 0){
            // get member in category
            $categoryContact = new categoryController;
            $member = $categoryContact->getMemberById($request->id_category)->getData();
            $category = $categoryContact->getCategoryById($request->id_category)->getData();

            // save to message table
            $message = new message;
            $message->message = $request->message;
            $message->total = $member->data[0]->jumlah_member;
            $message->id_device = $request->id_device;
            $message->type = "Category Web";
            $message->save();

            // update kuota count sent
            $countSent = $getUser->data[0]->sent + $member->data[0]->jumlah_member;
            $kuotaSent = $getUser->data[0]->kuota_sent - $member->data[0]->jumlah_member;
            $data = (object)([
                'id' => $getUser->data[0]->id,
                'sent' => $countSent,
                'kuota_sent' => $kuotaSent,
            ]);

            $updateUserSent = $user->updateDBById($data);

            foreach ($member->member as $key => $value) {
                // save to send message table
                $send_message = new send_message;
                $send_message->id_message = $message->id;
                $send_message->id_device = $request->id_device;
                $send_message->message = $request->message;
                $send_message->name = $category->data[0]->category_name;
                $send_message->jid = $value->contact_number.'@categoryWeb';
                $send_message->save();
                if($key == 0) {
                    $recipient = $value->contact_number;
                }else{
                    $recipient .= ',' . $value->contact_number;
                }
            }

            // send to API
            if($member->data[0]->jumlah_member==1){
                $data = [
                    'to' => $value->contact_number,
                    'message' => $request->message,
                    'type' => 'message',
                ];
                $response = Http::post($apiDb.'wa/'.$getDevice->data[0]->uid.'/send-message', $data);
                if ($response->successful()) {
                    return response()->json([
                        'status' => 200,
                        'message' => 'The Message Will be Process',
                        'data' => $data,
                    ], 200);
                }else{
                    return response()->json([
                        'status' => 400,
                        'message' => 'Failed',
                        'data' => $data,
                    ]);
                }
            }else{
                $data = [
                    'to' => $recipient,
                    'message' => $request->message,
                    'type' => 'message',
                ];
                $response = Http::post($apiDb.'wa/'.$getDevice->data[0]->uid.'/send-message', $data);
                if ($response->successful()) {
                    return response()->json([
                        'status' => 200,
                        'message' => 'The Message Will be Process',
                        'data' => $data,
                    ], 200);
                }else{
                    return response()->json([
                        'status' => 400,
                        'message' => 'Failed',
                        'data' => $data,
                    ]);
                }
            }
        }else{
            return response()->json([
                'status' => 400,
                'message' => 'Your message quota has run out',
                'data' => [],
            ]);
        }
    }

    public function sendMessageCategoryIn($request)
    {
         $getUrl = new wacoreController;
        $apiDb = $getUrl->getUrlApi();
        // get device by id
        $device = new deviceController;
        $getDevice = $device->getDeviceById($request->id_device);
        $getDevice = $getDevice->getData();

        // get user
        $user = new AuthController;
        $getUser = $user->getUserById($getDevice->data[0]->id_user)->getData();

        if($getUser->data[0]->kuota_sent != 0){
            // get member in category
            $categoryContact = new categoryController;
            $member = $categoryContact->getMemberById($request->id_category)->getData();
            $category = $categoryContact->getCategoryById($request->id_category)->getData();

            // save to message table
            $message = new message;
            $message->message = $request->message;
            $message->total = $member->data[0]->jumlah_member;
            $message->id_device = $request->id_device;
            $message->type = "Category Web";
            $message->save();

            // update kuota count sent
            $countSent = $getUser->data[0]->sent + $member->data[0]->jumlah_member;
            $kuotaSent = $getUser->data[0]->kuota_sent - $member->data[0]->jumlah_member;
            $data = (object)([
                'id' => $getUser->data[0]->id,
                'sent' => $countSent,
                'kuota_sent' => $kuotaSent,
            ]);

            $updateUserSent = $user->updateDBById($data);

            foreach ($member->member as $key => $value) {
                // save to send message table
                $send_message = new send_message;
                $send_message->id_message = $message->id;
                $send_message->id_device = $request->id_device;
                $send_message->message = $request->message;
                $send_message->name = $category->data[0]->category_name;
                $send_message->jid = $value->contact_number.'@categoryWeb';
                $send_message->save();
                if($key == 0) {
                    $recipient = $value->contact_number;
                }else{
                    $recipient .= ',' . $value->contact_number;
                }
            }

            // send to API
            if($member->data[0]->jumlah_member==1){
                $data = [
                    'to' => $value->contact_number,
                    'message' => $request->message,
                    'type' => 'message',
                ];
                $response = Http::post($apiDb.'wa/'.$getDevice->data[0]->uid.'/send-message', $data);
                if ($response->successful()) {
                    return response()->json([
                        'status' => 200,
                        'message' => 'The Message Will be Process',
                        'data' => $data,
                    ], 200);
                }else{
                    return response()->json([
                        'status' => 400,
                        'message' => 'Failed',
                        'data' => $data,
                    ]);
                }
            }else{
                $data = [
                    'to' => $recipient,
                    'message' => $request->message,
                    'type' => 'message',
                ];
                $response = Http::post($apiDb.'wa/'.$getDevice->data[0]->uid.'/send-message', $data);
                if ($response->successful()) {
                    return response()->json([
                        'status' => 200,
                        'message' => 'The Message Will be Process',
                        'data' => $data,
                    ], 200);
                }else{
                    return response()->json([
                        'status' => 400,
                        'message' => 'Failed',
                        'data' => $data,
                    ]);
                }
            }
        }else{
            return response()->json([
                'status' => 400,
                'message' => 'Your message quota has run out',
                'data' => [],
            ]);
        }
    }
    //------------------------------------------SEND MESSAGE TO CONTACT WEB-------------------------------------------------
    public function sendMessageContactWeb(Request $request)
    {
         $getUrl = new wacoreController;
        $apiDb = $getUrl->getUrlApi();
        // get device by id
        $device = new deviceController;
        $getDevice = $device->getDeviceById($request->id_device);
        $getDevice = $getDevice->getData();

        // get user
        $user = new AuthController;
        $getUser = $user->getUserById($getDevice->data[0]->id_user)->getData();

        if($getUser->data[0]->kuota_sent != 0){
            // save to message table
            $message = new message;
            $message->message = $request->message;
            $message->id_device = $request->id_device;
            $message->total = count($request->recipient);
            $message->type = "Contact Web";
            $message->save();

            // update kuota count sent
            $countSent = $getUser->data[0]->sent + count($request->recipient);
            $kuotaSent = $getUser->data[0]->kuota_sent - count($request->recipient);
            $data = (object)([
                'id' => $getUser->data[0]->id,
                'sent' => $countSent,
                'kuota_sent' => $kuotaSent,
            ]);

            $updateUserSent = $user->updateDBById($data);

            $contact = new contactController;
            foreach ($request->recipient as $key => $value) {
                // get contact web
                $getContact = $contact->getContactById($value)->getData();
                // save to send message table
                $send_message = new send_message;
                $send_message->id_message = $message->id;
                $send_message->id_device = $request->id_device;
                $send_message->message = $request->message;
                $send_message->jid = $getContact->data[0]->contact_number.'@contactWeb';
                $send_message->save();
                if($key == 0) {
                    $recipient = $getContact->data[0]->contact_number;
                }else{
                    $recipient .= ',' . $getContact->data[0]->contact_number;
                }
            }

            // send to API
            if(count($request->recipient)==1){
                $data = [
                    'to' => $getContact->data[0]->contact_number,
                    'message' => $request->message,
                    'type' => 'message',
                ];
                $response = Http::post($apiDb.'wa/'.$getDevice->data[0]->uid.'/send-message', $data);
                if ($response->successful()) {
                    return response()->json([
                        'status' => 200,
                        'message' => 'The Message Will be Process',
                        'data' => $data,
                    ], 200);
                }else{
                    return response()->json([
                        'status' => 400,
                        'message' => 'Failed',
                        'data' => $data,
                    ]);
                }
            }else{
                $data = [
                    'to' => $recipient,
                    'message' => $request->message,
                    'type' => 'message',
                ];
                $response = Http::post($apiDb.'wa/'.$getDevice->data[0]->uid.'/send-message', $data);
                if ($response->successful()) {
                    return response()->json([
                        'status' => 200,
                        'message' => 'The Message Will be Process',
                        'data' => $data,
                    ], 200);
                }else{
                    return response()->json([
                        'status' => 400,
                        'message' => 'Failed',
                        'data' => $data,
                    ]);
                }
            }
        }else{
            return response()->json([
                'status' => 400,
                'message' => 'Your message quota has run out',
                'data' => [],
            ]);
        }

    }

    // function for preprocess contact name in message
    public function preprocess($message, $contact)
    {
        $pattern = '/\$\[(\w+)\]/i';
        return preg_replace($pattern, $contact, $message);
    }

    public function sendMessage($request)
    {
        $getUrl = new wacoreController;
        $apiDb = $getUrl->getUrlApi();
        // save to message table
        $message = new message;
        $message->message = $request->message;
        $message->id_device = $request->id_device;
        $message->save();

        // get device by id
        $device = new deviceController;
        $getDevice = $device->getDeviceById($request->id_device);
        $getDevice = $getDevice->getData();



        // // save to send message table
        // $send_message = new send_message;
        // $send_message->id_message = $message->id;
        // $send_message->name = NULL;
        // $send_message->phone = $request->recipient;
        // $send_message->type = "chatbot";
        // $send_message->save();

        if($request->type == "Contact" || $request->type == "contact" || $request->type == "default"){
            $target = "message";
        }

        // send to API

        $data = [
            'to' => $request->recipient,
            'message' => $request->message,
            'type' => $target,
        ];
        $pattern = '~[a-z]+://\S+~';
        $url=[];
        if($num_found = preg_match_all($pattern, $request->message, $out))
        {
            $url[]=$out[0];
        }
        $buttons=[];
        $link=$apiDb.'wa/'.$getDevice->data[0]->uid.'/send-message';
        $newMsg=$request->message;
        if(count($url)>0){
            $link=$apiDb.'wa-md/'.$getDevice->data[0]->uid.'/send-message-custom';
            for($i=0;$i<count($url);$i++){
                for($j=0;$j<count($url[$i]);$j++){
                    $urlArr = explode("-",$url[$i][$j]);
                    if(count($urlArr) > 0){
                        $buttonsName = explode(",",$urlArr[0]);
                        for($x=0;$x<count($buttonsName);$x++){
                            $buttons[]=[
                                "index"=>$j+1,
                                "urlButton"=>[
                                    "displayText"=>$buttonsName[$x],
                                    "url"=>$urlArr[$x]
                                ]
                            ];
                        }
                        $newMsg= str_replace($url[$i][$j],"",$newMsg);
                    }

                }
            }
            $data['message'] = [
                'text'=>$newMsg,
                'templateButtons'=>$buttons,
                "headerType"=>1,
            ];
        }
        $response = Http::post($link, $data);
        if ($response->successful()) {
            return response()->json([
                'status' => 200,
                'message' => 'The Message Will be Process',
                'data' => $data,
            ], 200);
        }else{
            return response()->json([
                'status' => 400,
                'message' => 'Failed',
                'data' => $data,
            ]);
        }
    }

    //------------------------------------------SEND MESSAGE TO ALL OPEN API--------------------------------------------------

    public function sendMessageAllOpen(Request $request)
    {
        $getUrl = new wacoreController;
        $apiDb = $getUrl->getUrlApi();
        
        // get current time
        $current_date_time = Carbon::now()->toDateTimeString();

        // get user
        $user = new AuthController;
        $getUser = $user->getUserByToken($request->bearerToken())->getData();


        // get device by id
        $device = new deviceController;
        $getDevice = $device->getDeviceByNumberUser($getUser->data[0]->id, $request->phone);
        $getDevice = $getDevice->getData();
        if(empty($getDevice->data[0])){
            return response()->json([
                "status" => 200,
                "message" => "Device not found",
            ], 200);
        }


        if($getUser->data[0]->kuota_sent != 0){
            // save to message table
            $message = new message;
            $message->id_device = $getDevice->data[0]->id;
            $message->message = $request->message;
            $message->recipient = $request->total;
            $message->time = is_null ($request->time['time']) ? $current_date_time: $request->time['time'];
            $message->save();
            $id_message = $message->id;

            // update kuota count sent
            $countSent = $getUser->data[0]->sent + $request->total;
            $kuotaSent = $getUser->data[0]->kuota_sent - $request->total;
            $data = (object)([
                'id' => $getUser->data[0]->id,
                'sent' => $countSent,
                'kuota_sent' => $kuotaSent,
            ]);
            $updateUserSent = $user->updateDBById($data);
            $recipient_number = array();
            foreach ($request->recipient as $key => $value) {
                if($key == "contactWeb"){
                    foreach ($value as $i => $v) {
                        // get contact by id
                        $contact = new contactController;
                        $getContact = $contact->getContactById($v)->getData();
                        if(empty($getContact->data[0])){
                            return response()->json([
                                "status" => 200,
                                "message" => "Contact Web not found",
                            ], 200);
                        }

                        // save to recipient table
                        $recipient = new send_message;
                        $recipient->name = $getContact->data[0]->contact_name;
                        $recipient->phone = $getContact->data[0]->contact_number;
                        $recipient->type = $key;
                        $recipient->id_message = $id_message;
                        $recipient->save();

                        if($i == 0) {
                            $recipient_number[$key] = $getContact->data[0]->contact_number;
                        }else{
                            $recipient_number[$key] .= ',' . $getContact->data[0]->contact_number;
                        }
                    }
                }else if($key == "contactDevice"){
                    foreach ($value as $i => $v) {
                        // get zontact by id
                        $contactWA = new wacoreController;
                        $getContactWA = $contactWA->getContactDBById($v)->getData();
                        if(empty($getContactWA->data[0])){
                            return response()->json([
                                "status" => 200,
                                "message" => "Contact WA not found",
                            ], 200);
                        }

                        // preprocess receiver number
                        $contact_number = preg_replace('/((\@.*))/', '', $getContactWA->data[0]->jid);

                        // save to recipient table
                        $recipient = new send_message;
                        $recipient->name = $getContactWA->data[0]->name;
                        $recipient->phone = $contact_number;
                        $recipient->type = $key;
                        $recipient->id_message = $id_message;
                        $recipient->save();

                        if($i == 0) {
                            $recipient_number[$key] = $contact_number;
                        }else{
                            $recipient_number[$key] .= ',' . $contact_number;
                        }
                    }
                }else if($key == "contact") {
                    foreach ($value as $i => $v) {
                        // save to recipient table
                        $recipient = new send_message;
                        $recipient->phone = $v;
                        $recipient->type = $key;
                        $recipient->id_message = $id_message;
                        $recipient->save();

                        if($i == 0) {
                            $recipient_number[$key] = $v;
                        }else{
                            $recipient_number[$key] .= ',' . $v;
                        }
                    }
                }else if($key == "group"){
                    foreach ($value as $i => $v) {
                        // get zontact by id
                        $groupWA = new wacoreController;
                        $getGroupWA = $groupWA->getGroupDBById($v)->getData();
                        if(empty($getGroupWA->data[0])){
                            return response()->json([
                                "status" => 200,
                                "message" => "Group WA not found",
                            ], 200);
                        }

                        // save to recipient table
                        $recipient = new send_message;
                        $recipient->name = $getGroupWA->data[0]->name;
                        $recipient->phone = $getGroupWA->data[0]->jid;
                        $recipient->type = $key;
                        $recipient->id_message = $id_message;
                        $recipient->save();

                        if($i == 0) {
                            $recipient_number[$key] = $getGroupWA->data[0]->jid;
                        }else{
                            $recipient_number[$key] .= ',' . $getGroupWA->data[0]->jid;
                        }
                    }
                }else if($key == "broadcast"){
                    foreach ($value as $i => $v) {
                        // get zontact by id
                        $broadcastWA = new wacoreController;
                        $getBroadcastWA = $broadcastWA->getBroadcastDBById($v)->getData();
                        if(empty($getBroadcastWA->data[0])){
                            return response()->json([
                                "status" => 200,
                                "message" => "Broadcast WA not found",
                            ], 200);
                        }
                        // save to recipient table
                        $recipient = new send_message;
                        $recipient->name = $getBroadcastWA->data[0]->name;
                        $recipient->phone = $getBroadcastWA->data[0]->jid;
                        $recipient->type = $key;
                        $recipient->id_message = $id_message;
                        $recipient->save();

                        if($i == 0) {
                            $recipient_number[$key] = $getBroadcastWA->data[0]->jid;
                        }else{
                            $recipient_number[$key] .= ',' . $getBroadcastWA->data[0]->jid;
                        }
                    }
                }elseif ($key == "category") {
                    foreach ($value as $i => $v) {
                        // get member in category
                        $categoryContact = new categoryController;
                        $member = $categoryContact->getMemberById($v)->getData();

                        foreach ($member->member as $j => $k) {
                            // save to recipient table
                            $recipient = new send_message;
                            $recipient->name = $k->contact_name;
                            $recipient->phone = $k->contact_number;
                            $recipient->type = $key;
                            $recipient->id_message = $id_message;
                            $recipient->save();

                            if($j == 0) {
                                $recipient_number[$key] = $k->contact_number;
                            }else{
                                $recipient_number[$key] .= ',' . $k->contact_number ;
                            }
                        }
                    }
                }
            }

            // merge the recipient number type message
            $recipient_final = '';
            foreach ($recipient_number as $key => $value) {
                if(($key == "contactWeb") || ($key == "contactDevice") || ($key == "contact") || ($key == "category")){
                    if(!empty($value)){
                        if(empty($recipient_final)) {
                            $recipient_final = $value;
                        }else{
                            $recipient_final .= ',' . $value ;
                        }
                    }
                }
            }

            if(!is_null($request->time['time'])){
                // send data to schedule message
                $data = [
                    'id_device' => $getDevice->data[0]->id,
                    'time' => $request->time,
                    'id_message' => $id_message,
                ];
                $schedule = new scheduleMessageController;
                $createSchedule = $schedule->createScheduleDB($data);


                if($createSchedule==1){
                    return response()->json([
                        'status' => 200,
                        'message' => 'Schedule successfully inserted',
                        'data' => $data,
                    ]);
                }else{
                    return response()->json([
                        'status' => 400,
                        'message' => 'Failed',
                        'data' => [],
                    ]);
                }
            }else{
                // send to api send message
                $data1 = (object)[];
                $data2 = (object)[];
                $data3 = (object)[];
                $response1 = [];
                $response2 = [];
                $response3 = [];
                // type = message (contact, contact WA, number, category)
                if(!empty($recipient_final)){
                    $data1 = [
                        'to' => $recipient_final,
                        'message' => $request->message,
                        'type' => 'message',
                    ];
                    $response1 = Http::post($apiDb.'wa/'.$getDevice->data[0]->uid.'/send-message', $data1);

                }
                // type = group
                if(!empty($recipient_number['group'])){
                    $data2 = [
                        'to' => $recipient_number['group'],
                        'message' => $request->message,
                        'type' => 'group',
                    ];
                    $response2 = Http::post($apiDb.'wa/'.$getDevice->data[0]->uid.'/send-message', $data2);

                }
                // type = broadcast
                if(!empty($recipient_number['broadcast'])){
                    $data3 = [
                        'to' => $recipient_number['broadcast'],
                        'message' => $request->message,
                        'type' => 'broadcast',
                    ];
                    $response3 = Http::post($apiDb.'wa/'.$getDevice->data[0]->uid.'/send-message', $data3);
                }
                if((empty($response1)) && (empty($response2)) && (empty($response3))){
                    return response()->json([
                        'status' => 400,
                        'message' => 'Failed',
                        'data' => [$data1, $data2, $data3]
                    ]);
                }else{
                    return response()->json([
                        'status' => 200,
                        'message' => 'The Message Will be Process',
                        'data' => [$data1, $data2, $data3]
                    ], 200);
                }
            }
        }else{
            return response()->json([
                'status' => 400,
                'message' => 'Your message quota has run out',
                'data' => [],
            ]);
        }

    }

    //------------------------------------------SEND MEDIA MESSAGE OPEN API--------------------------------------------------
    public function sendMediaMessageOpen(Request $request)
    {
          $getUrl = new wacoreController;
        $apiDb = $getUrl->getUrlApi();

        // get user
        $user = new AuthController;
        $getUser = $user->getUserByToken($request->bearerToken())->getData();


        // get device by id
        $device = new deviceController;
        $getDevice = $device->getDeviceByNumberUser($getUser->data[0]->id, $request->phone);
        $getDevice = $getDevice->getData();
        if(empty($getDevice->data[0])){
            return response()->json([
                "status" => 200,
                "message" => "Device not found",
            ], 200);
        }

        // get current time
        $current_date_time = Carbon::now()->toDateTimeString();

        if($getUser->data[0]->kuota_sent != 0){
            // save to message table
            $message = new message;
            $message->id_device = $getDevice->data[0]->id;
            $message->message = $request->message;
            $message->recipient = $request->total;
            $message->time = is_null ($request->time) ? $current_date_time: $request->time;
            $message->id_media = $request->id_media;
            $message->save();
            $id_message = $message->id;

            // update kuota count sent
            $countSent = $getUser->data[0]->sent + $request->total;
            $kuotaSent = $getUser->data[0]->kuota_sent - $request->total;
            $data = (object)([
                'id' => $getUser->data[0]->id,
                'sent' => $countSent,
                'kuota_sent' => $kuotaSent,
            ]);
            $updateUserSent = $user->updateDBById($data);
            $recipient_number = array();

            if(!empty($request->contact)){
                $recipient_number['contactNew'] = $request->contact;
                $recipient_contact = array (explode(",", $request->contact));

                foreach ($recipient_contact[0] as $i => $v) {
                    // save to recipient table
                    $recipient = new send_message;
                    $recipient->phone = $v;
                    $recipient->type = 'contactNew';
                    $recipient->id_message = $id_message;
                    $recipient->save();
                }
            }



            // merge the recipient number type message
            $recipient_final = '';
            foreach ($recipient_number as $key => $value) {
                if(($key == "contactWeb") || ($key == "contactDevice") || ($key == "contactNew") || ($key == "category")){
                    if(!empty($value)){
                        if(empty($recipient_final)) {
                            $recipient_final = $value;
                        }else{
                            $recipient_final .= ',' . $value ;
                        }
                    }
                }
            }

            if(!is_null($request->time)){
                // send data to schedule message
                $data = [
                    'id_device' => $request->id_device,
                    'time' => $request->time,
                    'id_message' => $id_message,
                ];
                $schedule = new scheduleMessageController;
                $createSchedule = $schedule->createScheduleDB($data);


                if($createSchedule==1){
                    return response()->json([
                        'status' => 200,
                        'message' => 'Schedule successfully inserted',
                        'data' => $data,
                    ]);
                }else{
                    return response()->json([
                        'status' => 400,
                        'message' => 'Failed',
                        'data' => [],
                    ]);
                }
            }else{
                // upload media
                $file = $request->file('file');
                $destinationPath = 'file_storage/';
                $originalFile = $file->getClientOriginalName();
                $now = Carbon::now()->format('Y-m-d_H-i-s_');
                $filename = $now.$originalFile;

                $media = new mediaStorage;
                $media->path_file = $destinationPath.$filename;
                $media->save();
                $id_media = $media->id;

                $file->move($destinationPath, $filename);
                // get media
                $client = new Client;
                $media = new mediaMessageController;
                $getMedia = $media->getMedia($id_media)->getData();
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
                $post1 = (object)[];
                $post2 = (object)[];
                $post3 = (object)[];
                $result1 = [];
                $result2 = [];
                $result3 = [];
                $url = $apiDb.'wa/'.$getDevice->data[0]->uid.'/send-media';
                // type = message (contact, contact WA, number, category)


                if(!empty($recipient_final)){
                    $cFile = curl_file_create($pathFile, $mime);
                    $post1 = array(
                        'to' => $recipient_final,
                        'caption' => $request->message,
                        'type' => 'message',
                        'mesageType' => $type,
                        'file'=> $cFile
                    ); // Parameter to be sent
                    $ch = curl_init();
                    curl_setopt($ch, CURLOPT_URL, $url);
                    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type : multipart/form-data'));
                    curl_setopt($ch, CURLOPT_POST,1);
                    curl_setopt($ch, CURLOPT_POSTFIELDS, $post1);
                    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
                    $result1 = json_decode(curl_exec($ch));
                    curl_close ($ch);

                    if($type != 'imageMessage'){
                        $data1 = [
                            'to' => $recipient_final,
                            'message' => $request->message,
                            'type' => 'message',
                        ];
                        $response1 = Http::post($apiDb.'wa/'.$getDevice->data[0]->uid.'/send-message', $data1);

                    }
                }
                // type = group
                if(!empty($recipient_number['group'])){
                    $cFile = curl_file_create($pathFile, $mime);
                    $post2 = array(
                        'to' => $recipient_number['group'],
                        'caption' => $request->message,
                        'type' => 'group',
                        'mesageType' => $type,
                        'file'=> $cFile
                    ); // Parameter to be sent
                    $ch = curl_init();
                    curl_setopt($ch, CURLOPT_URL, $url);
                    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type : multipart/form-data'));
                    curl_setopt($ch, CURLOPT_POST,1);
                    curl_setopt($ch, CURLOPT_POSTFIELDS, $post2);
                    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
                    $result2 = json_decode(curl_exec($ch));
                    curl_close ($ch);

                    if($type != 'imageMessage'){
                        $data1 = [
                            'to' => $recipient_number['group'],
                            'message' => $request->message,
                            'type' => 'message',
                        ];
                        $response1 = Http::post($apiDb.'wa/'.$getDevice->data[0]->uid.'/send-message', $data1);

                    }
                }
                // type = broadcast
                if(!empty($recipient_number['broadcast'])){
                    $cFile = curl_file_create($pathFile, $mime);
                    $post3 = array(
                        'to' => $recipient_number['broadcast'],
                        'caption' => $request->message,
                        'type' => 'broadcast',
                        'mesageType' => $type,
                        'file'=> $cFile
                    ); // Parameter to be sent

                    $ch = curl_init();
                    curl_setopt($ch, CURLOPT_URL, $url);
                    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type : multipart/form-data'));
                    curl_setopt($ch, CURLOPT_POST,1);
                    curl_setopt($ch, CURLOPT_POSTFIELDS, $post3);
                    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
                    $result3 = json_decode(curl_exec($ch));
                    curl_close ($ch);

                    if($type != 'imageMessage'){
                        $data1 = [
                            'to' => $recipient_number['broadcast'],
                            'message' => $request->message,
                            'type' => 'message',
                        ];
                        $response1 = Http::post($apiDb.'wa/'.$getDevice->data[0]->uid.'/send-message', $data1);

                    }
                }
                if((empty($result1)) && (empty($result2)) && (empty($result3))){
                    return response()->json([
                        'status' => 400,
                        'message' => 'Failed',
                        'data' => [$post1, $post2, $post3]
                    ]);
                }else{

                    return response()->json([
                        'status' => 200,
                        'message' => 'The Message Will be Process',
                        'data' => [$post1, $post2, $post3]
                    ], 200);
                }
            }
        }else{
            return response()->json([
                'status' => 400,
                'message' => 'Your message quota has run out',
                'data' => [],
            ]);
        }

    }
}