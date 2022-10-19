<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use App\Models\User;
use App\Models\package;
use App\Mail\SendMail;
use Validator;


class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    // public function __construct() {
    //     $this->middleware('api.auth', ['except' => ['login', 'register']]);
    // }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        if (! $token = auth()->attempt($validator->validated())) {
            return response()->json([
                    "status" => 400,
                    "message" => "Email or Password is wrong"
                ], 400);
        }

        return $this->createNewToken($token);
    }

    /**
     * Register a User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|between:2,100',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|confirmed|min:6',
        ]);
        if($validator->fails()){
            return response()->json([
                'status' => 400,
                'message' => 'The email has already been taken.',
            ], 400);
        }
        
        $user = User::create(array_merge(
                    $validator->validated(),
                    ['package_sent' => (int) $request->package_sent],
                    ['package_receive' => (int) $request->package_receive],
                    ['kuota_sent' => (int) (is_null($request->package_sent) ? 100 : $request->package_sent)],
                    ['kuota_receive' => (int) (is_null($request->package_receive) ? 100 : $request->package_receive)],
                    ['password' => bcrypt($request->password)],
                    ['token' => Str::random(60)]
                ));
        
        if(!empty($request->package_sent) || !empty($request->package_receive)){
            $package = new package;
            $package->id_user = $user->id;
            $package->package_sent = (int) $request->package_sent;
            $package->package_receive = (int) $request->package_receive;
            $package->save();
        }
        
        // $email = $request->get('email');
        
        // $data = ([
        //  'name' => $request->get('name'),
        //  'email' => $request->get('email'),
        //  'user' => $user,
        //  ]);

        //Mail::to($email)->send(new sendMail($data)) ;

        return response()->json([
            'status' => 200,
            'message' => 'User successfully registered',
            'data' => $user,
        ], 200);
    }


    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout() {
        auth()->logout();

        return response()->json(['message' => 'User successfully signed out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh() {
        return $this->createNewToken(auth()->refresh());
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function userProfile() {
        $checkAuth = auth()->check();
        if ($checkAuth == false){
            return response()->json([
                'status' => 400,
                'message' => 'Login Error',
                ], 400);    
        }else{
            return response()->json([
                'status' => 200,
                'message' => 'Get data user-profile success',
                'data' => auth()->user()
                ], 200);
        }
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function createNewToken($token){
        $data = ([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user()
         ]);
       
        return response()->json([
            'status' => 200,
            'message' => 'Login success',
            'data' => $data
        ], 200);
    }

    public function updateProfile(Request $request)
    {
        $currentUser = Auth::user();
        if (User::where('id', $currentUser->id)->exists()){
            $user = User::find($currentUser->id);
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

    public function deleteProfile(Request $request)
    {
        $currentUser = Auth::user();
        if(User::where('id', $currentUser->id)->exists()) {
            $user = User::find($currentUser->id);
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

    public function generateToken(Request $request)
    {
        $currentUser = Auth::user();
        if (User::where('id', $currentUser->id)->exists()){
            $user = User::find($currentUser->id);
            $user->token = Str::random(60);
            $user->save();
     
            return response()->json([
                "status" => 200,
                "message" => "Success",
                "data" => $user
            ], 200);
        }else{
            return response()->json([
                "status" => 400,
                "message" => "User not found"
            ], 400);
        }
        
    }

    public function getUserById($id)
    {
        if((User::where('id', $id)->count())>0){
            $user = User::where('id', $id)->get();               
            
            return response()->json([
                "status" => 200,
                "message" => "Succeess",            
                "data" => $user,
            ], 200);
        }else{
            return response()->json([
                "status" => 200,
                "message" => "User not found",
                "data" => [],
            ], 200);
        }
    }
    public function getUserByToken($token)
    {
        if((User::where('token', $token)->count())>0){
            $user = User::where('token', $token)->get();               
            
            return response()->json([
                "status" => 200,
                "message" => "Succeess",            
                "data" => $user,
            ], 200);
        }else{
            return response()->json([
                "status" => 200,
                "message" => "User not found",
                "data" => [],
            ], 200);
        }
    }

    public function updateDBById($data)
    {
        if((User::where('id', $data->id)->count()) > 0){
            $user = User::find($data->id);  
            $user->kuota_sent = (int) (empty($data->kuota_sent) ? $user->kuota_sent : $data->kuota_sent);
            $user->kuota_receive = (int) (empty($data->kuota_receive) ? $user->kuota_receive : $data->kuota_receive);
            $user->sent = (int) (empty($data->sent) ? $user->sent : $data->sent);
            $user->receive = (int) (empty($data->receive) ? $user->receive : $data->receive);
            $user->save();
        
            return response()->json([
                "status" => 200,
                "message" => "Status user successfully updated",
                "data" => $user
            ], 200);

        }else{
            return response()->json([
                "status" => 200,
                "message" => "user not found",
                "data" => []
            ], 200);            
        }
    }

    public function getPackageByUser(Request $request)
    {
        $currentUser = Auth::user();
        if((package::where('id_user', $currentUser->id)->count())>0){
            $package = package::where('id_user', $currentUser->id)->get();               
            
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