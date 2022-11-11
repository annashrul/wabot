<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

use App\Http\Controllers\wacoreController;
use App\Http\Controllers\deviceController;
use App\Http\Controllers\contactController;
use App\Http\Controllers\categoryController;

class agregasiController extends Controller
{
    public function getTotal(Request $request)
    {
        $currentUser = Auth::user();
        //   device per user
        $device = new deviceController;
        $getDevice = $device->getDeviceDB()->getData();
        if(empty($getDevice->data)){
            return response()->json([
                "status" => 200,
                "message" => "Device not found",
                "data" => [],
            ], 200);
        }
       
        // get wa contact device per user
        $wacore = new wacoreController;
        $countContactWA = 0;
        foreach ($getDevice->data as $key => $value) {  
            $contact = $wacore->getContactDB($value->id)->getData();
            $countContactWA = $countContactWA + count($contact->data);
        }
         
        // get contact web per user
        $contactWeb = new contactController;
        $getContactWeb = $contactWeb->getContact()->getData();
        $countContactWeb = count($getContactWeb->data);

        // get category per user
        $category = new categoryController;
        $getCategory = $category->getCategory()->getData();
        $countCategory = count($getCategory->data);

        // get group wa per user
        $countGroupWA = 0;
        foreach ($getDevice->data as $key => $value) {  
            $group = $wacore->getGroupDB($value->id)->getData();
            $countGroupWA = $countGroupWA + count($group->data);
        }
        // get broadcastlist per user
        $countBroadcastWA = 0;
        foreach ($getDevice->data as $key => $value) {  
            $broadcast = $wacore->getBroadcastDB($value->id)->getData();
            $countBroadcastWA = $countBroadcastWA + count($broadcast->data);
        }

        $data = (object)([
            'user' => $currentUser,
            'Contact WA' => $countContactWA,
            'Contact Web' => $countContactWeb,
            'Category Web' => $countCategory,
            'Group WA' => $countGroupWA,
            'Broadcast List WA' => $countBroadcastWA,
                             
        ]); 
        if(!empty($data)){
            return response()->json([
                "status" => 200,
                "message" => "Sucess",
                "data" => $data,
            ], 200);
        }else{
            return response()->json([
                "status" => 200,
                "message" => "Failed",
                "data" => [],
            ], 200);
        }

    }

    public function getIndo()
    {
        $pesan = "Di Indonesia ini tercatat kasus positif sebanyak {positif} orang, sembuh {sembuh} orang, dan meninggal sebanyak {meninggal} orang.";
        $res = Http::get('https://api.kawalcorona.com/indonesia');
        $response = (array)json_decode($res);

        $positif = '/{positif}/';
        $sembuh = '/{sembuh}/';
        $meninggal = '/{meninggal}/';
        $pesan = preg_replace($positif, $response[0]->positif, $pesan);
        $pesan = preg_replace($sembuh, $response[0]->sembuh, $pesan);
        $pesan = preg_replace($meninggal, $response[0]->meninggal, $pesan);
        print_r($pesan);
    }

     public function getJakarta()
    {
        $pesan = "Di provinsi DKI Jakarta ini tercatat kasus positif sebanyak {positif} orang, sembuh {sembuh} orang, dan meninggal sebanyak {meninggal} orang.";
        $res = Http::get('https://api.kawalcorona.com/indonesia/provinsi');
        $response = (array)json_decode($res);
        
        $positif = '/{positif}/';
        $sembuh = '/{sembuh}/';
        $meninggal = '/{meninggal}/';
        $pesan = preg_replace($positif, $response[0]->attributes->Kasus_Posi, $pesan);
        $pesan = preg_replace($sembuh, $response[0]->attributes->Kasus_Semb, $pesan);
        $pesan = preg_replace($meninggal, $response[0]->attributes->Kasus_Meni, $pesan);
        print_r($pesan);
    }

    public function getVaksin(Request $request)
    {
        $pesan = "*HASIL PEMERIKSAAN RAPID TEST COVID 19*\n\n*DATA PROFIL PASIEN*\nID\/NO.REG. : {id_pasien}\nJENIS PASIEN : {tipe_pasien}\nNAMA PASIEN : {nama}\nDIVISI : {divisi}\nNO HP : {nomor_hape}\n\n*HASIL TESTING COVID-19*\nLOKASI TEST : {lokasi_test}\nTANGGAL TEST : {tanggal_test}\nTIPE TEST : {tipe_test}\nHASIL TEST : {catatan}\n\nTetap jaga protokol kesehatan dan daya tahan tubuh anda.\nTerimakasih.";
        $res = Http::get('https://testcovid19.toyota.co.id/api/test/result?registration_id='.$request->id);
                $response = (array)json_decode($res);
                $id_pasien = '/{id_pasien}/';
                $tipe_pasien = '/{tipe_pasien}/';
                $nama_pasien = '/{nama}/';
                $divisi = '/{divisi}/';
                $no_hp = '/{nomor_hape}/';
                $lokasi = '/{lokasi_test}/';
                $tanggal_test = '/{tanggal_test}/';
                $tipe_test = '/{tipe_test}/';
                $hasil_test = '/{catatan}/';
                
                $pesan = preg_replace($id_pasien, $response['data']->id_pasien, $pesan);
                $pesan = preg_replace($tipe_pasien, $response['data']->tipe_pasien, $pesan);
                $pesan = preg_replace($nama_pasien, $response['data']->nama_pasien, $pesan);
                $pesan = preg_replace($divisi, $response['data']->divisi, $pesan);
                $pesan = preg_replace($no_hp, $response['data']->nomor_hp, $pesan);
                $pesan = preg_replace($lokasi, $response['data']->lokasi_test, $pesan);
                $pesan = preg_replace($tanggal_test, $response['data']->tanggal_test, $pesan);
                $pesan = preg_replace($tipe_test, $response['data']->tipe_test, $pesan);
                $pesan = preg_replace($hasil_test, $response['data']->catatan, $pesan);
                
                
                print_r($pesan);
              
    }
}