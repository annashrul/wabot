<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ruleController;
use App\Http\Controllers\contactController;
use App\Http\Controllers\messageController;
use App\Http\Controllers\categoryController;
use App\Http\Controllers\deviceController;
use App\Http\Controllers\eFormController;
use App\Http\Controllers\nodeController;
use App\Http\Controllers\pathController;
use App\Http\Controllers\conversationController;
use App\Http\Controllers\wacoreController;
use App\Http\Controllers\agregasiController;
use App\Http\Controllers\scheduleMessageController;
use App\Http\Controllers\adminController;
use App\Http\Controllers\apiNodeController;
use App\Http\Controllers\automationPathController;
use App\Http\Controllers\mediaMessageController;
/*/*

|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/user', [AuthController::class, 'register']);
Route::post('/auth/refresh', [AuthController::class, 'refresh']);

Route::group([
    'middleware' => 'admin.auth',
    'prefix' => 'admin'

], function ($router) {
    Route::get('/user', [adminController::class, 'getUser']);
    Route::get('/user/{id_user}', [adminController::class, 'getUserById']);
    Route::put('/user/{id_user}', [adminController::class, 'updateUser']);
    Route::delete('/user/{id_user}', [adminController::class, 'deleteUser']);
    Route::get('/user/device/{id_user}', [adminController::class, 'getDeviceByUser']);
    Route::get('/device', [adminController::class, 'getDevice']);
    Route::get('/device/{id_device}', [adminController::class, 'getDeviceById']);
    Route::put('/device/{id_device}', [adminController::class, 'updateDevice']);
    Route::get('/package', [adminController::class, 'getPackage']);
    Route::get('/package/{id_user}', [adminController::class, 'getPackageByUser']);
});


Route::group([
    'middleware' => 'openAPI.auth',
    'prefix' => 'open'

], function ($router) {
      Route::post('/message/send', [messageController::class,'sendMessageAllOpen']);  
      Route::post('/message/media', [messageController::class,'sendMediaMessageOpen']); 
});


Route::group([
    'middleware' => 'api.auth',
    'prefix' => 'auth'

], function ($router) {
    Route::post('/user/token', [AuthController::class, 'generateToken']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'userProfile']);   
	Route::put('/user', [AuthController::class, 'updateProfile']);
	Route::delete('/user', [AuthController::class, 'deleteProfile']);
    Route::get('/user/package', [AuthController::class, 'getPackageByUser']);
});

Route::group([
    'middleware' => 'api.auth'
], function ($router)
{
    Route::post('/pathFe', [pathController::class,'createPathFe']);  
   Route::post('/nodeFe', [nodeController::class,'createNodeFe']);  
   
   
  Route::post('/contact', [contactController::class, 'createContact']);
  Route::get('/contact', [contactController::class, 'getContact']);
  Route::put('/contact', [contactController::class, 'updateContact']);
  Route::delete('/contact', [contactController::class, 'deleteContact']); 
  
  Route::post('/category', [categoryController::class, 'createCategory']);
  Route::get('/category', [categoryController::class, 'getCategory']);
  Route::put('/category', [categoryController::class, 'updateCategory']);
  Route::delete('/category', [categoryController::class, 'deleteCategory']);
  Route::post('/category/member', [categoryController::class, 'createMember']);
  Route::get('/category/member/{id_category}', [categoryController::class, 'getMember']);
  Route::delete('/category/member/', [categoryController::class, 'deleteMember']);

  Route::get('/contactWA', [wacoreController::class, 'getAllContact']);
  Route::get('/contactWA/{id_device}', [wacoreController::class, 'getContact']);
  Route::delete('/contactWA/{id_device}', [wacoreController::class, 'deleteContact']);
  Route::get('/groupWA/{id_device}', [wacoreController::class, 'getGroup']);
  Route::get('/broadcastWA/{id_device}', [wacoreController::class, 'getBroadcastList']);
  Route::get('/syncContactWA/{id_device}', [wacoreController::class, 'syncContact']);
  Route::get('/syncGroupWA/{id_device}', [wacoreController::class, 'syncGroup']);
  Route::get('/syncBroadcastWA/{id_device}', [wacoreController::class, 'syncBroadcast']);



  Route::post('/device', [deviceController::class, 'newDevice']); 
  Route::get('/device', [deviceController::class, 'getDevice']); 
  Route::put('/device', [deviceController::class, 'updateDevice']);
  Route::delete('/device', [deviceController::class, 'deleteDevice']); 

  Route::post('/eform', [eFormController::class, 'createEform']);
  Route::get('/eform/{id_device}', [eFormController::class, 'getEform']);
  Route::put('/eform/{id_device}', [eFormController::class, 'updateEform']);
  Route::delete('/eform/{id_device}', [eFormController::class, 'deleteEform']);

  Route::post('/eform/quest', [eFormController::class, 'createQuestion']);
  Route::get('/eform/quest/{id_eform}', [eFormController::class, 'getQuestion']);
  Route::put('/eform/quest/{id_eform}', [eFormController::class, 'updateQuestion']);
  Route::delete('/eform/quest/{id_eform}', [eFormController::class, 'deleteQuestion']);

  Route::post('/node/api', [apiNodeController::class,'createNodeAPI']);  
  Route::get('/node/api/{id_device}', [apiNodeController::class,'getNodeAPI']); 
  Route::put('/node/api/{id_api}', [apiNodeController::class,'updateNodeAPI']);  
  Route::delete('/node/api/{id_api}', [apiNodeController::class,'deleteNodeAPI']);

  Route::post('/rule', [ruleController::class,'createRule']);  
  Route::get('/rule', [ruleController::class,'getRuleByUser']);  
  Route::get('/rule/{id_device}', [ruleController::class, 'getRule']);
  Route::put('/rule/{id_rule}', [ruleController::class, 'updateRule']);
  Route::delete('/rule/{id_rule}', [ruleController::class, 'deleteRule']);

  Route::post('/node', [nodeController::class,'createNode']);  
 
  Route::get('/node', [nodeController::class, 'getNode']);
  Route::get('/node/{id_node}', [nodeController::class, 'getNodeById']);
  Route::put('/node/{id_node}', [nodeController::class, 'updateNode']);
  Route::delete('/node/{id_node}', [nodeController::class, 'deleteNode']);

  
  Route::post('/path', [pathController::class,'createPath']);  
  Route::get('/path', [pathController::class, 'getPath']);
  Route::get('/path/{id_rule}', [pathController::class, 'getPathbyRule']);
  Route::put('/path/{id_path}', [pathController::class, 'updatePath']);
  Route::delete('/path/{id_path}', [pathController::class, 'deletePath']);
  Route::post('/path/eform', [pathController::class,'createPathEform']);
  Route::post('/path/api', [pathController::class,'createPathApi']);
  Route::post('/path/initial', [pathController::class,'createPathInit']);  

  Route::post('/conversation', [conversationController::class,'createConversation']);  
  Route::get('/conversation/{id_device}', [conversationController::class, 'getConversation']);
  Route::delete('/conversation/{id}', [conversationController::class, 'deleteConversationDB']);

  Route::post('/message/send', [messageController::class,'sendMessageAll']); 
  Route::post('/message/contact', [messageController::class,'sendMessageContact']);  
  Route::post('/message/group', [messageController::class,'sendMessageGroup']); 
  Route::post('/message/broadcast', [messageController::class,'sendMessageBroadcast']);
  Route::post('/message/category', [messageController::class,'sendMessageCategory']); 
  Route::post('/message/contactWeb', [messageController::class,'sendMessageContactWeb']);
  Route::post('/message/csv', [messageController::class,'sendMessageByCSV']);  
  Route::post('/message/media', [messageController::class,'sendMediaMessage']);  
  
  Route::get('/message/history', [messageController::class,'getHistoryMessage']);
  Route::get('/message/{id_message}/recipient', [messageController::class,'getRecipient']);
  Route::get('/message/var/{id_message}/recipient', [messageController::class,'getRecipientVar']);

  Route::post('/message/schedule', [scheduleMessageController::class,'createSchedule']); 
  Route::get('/message/schedule', [scheduleMessageController::class,'getListSchedule']); 
  Route::delete('/message/schedule/{id_schedule}', [scheduleMessageController::class,'deleteSchedule']);  
  Route::put('/message/schedule/{id_schedule}', [scheduleMessageController::class,'updateSchedule']); 
  Route::get('/message/schedule/check', [scheduleMessageController::class,'checkSchedule']); 

  Route::post('/message/media/upload', [mediaMessageController::class,'uploadMedia']); 
  Route::get('/message/media/{id}', [mediaMessageController::class,'getMediaById']); 
  Route::post('/message/media/delete', [mediaMessageController::class,'deleteDir']);

  Route::get('/total', [agregasiController::class,'getTotal']);

  Route::post('/automation/tmmin', [agregasiController::class,'getTotal']);

});

Route::post('/message/send-message-button', [messageController::class,'sendMessageButton']);
Route::post('/message/receive', [messageController::class,'receiveMessage']);
Route::get('/message/receive', [messageController::class,'getReceiveMessage']);
Route::get('/getIndo', [agregasiController::class,'getIndo']);
Route::get('/getJakarta', [agregasiController::class,'getJakarta']);

Route::get('/getVaksin/{id}', [agregasiController::class,'getVaksin']);
// Route::post('/node', [treeController::class,'createNode']);