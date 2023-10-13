<?php

namespace App\Http\Controllers\AuthController;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Cache\RateLimiter;

use Throwable;

class Login extends Controller
{

    protected $request_url;
    protected $path;
    protected $device_details;
    protected $ip_address;
    protected $role_url;
    protected $current_url;

    public function __construct(Request $request)
    {
        $this->request_url = $request->segment(1);
        $this->device_details = $this->_device();
        $this->ip_address = $request->ip();
        $this->current_url = collect(explode('/', parse_url($request->header('referer'), PHP_URL_PATH)))->last();

        $this->role_url = [
            0 => 'system-admin',
            1 => 'admin',
            2 => 'editor',
        ];
    }

    public function index()
    {
        return match($this->request_url){

            'system-admin' => view('auth.0000'),
            'admin'        => view('auth.0001'),
            default => view('auth.0002'),
        };

    }

    protected function login(Request $request)
    {
        $this->_throttle($this->ip_address,'check-attempts');
        $rules = [
            'username'  => 'required',
            'password'  => 'required',
        ];
        $this->_fieldValidation($request, $rules);
        if (Auth::attempt($request->only('username','password'))){
            $user = Auth::user();
            if($user->is_active){
                if(array_key_exists($user->role,$this->role_url)){
                    if($this->current_url == $this->role_url[$user->role]){
                        $this->_throttle($this->ip_address,'clear');
                        $this->_throwResponse('Login Success',200,'success',$this->role_url[$user->role]);
                    }else{
                        $this->_throttle($this->ip_address,'hit');
                        Auth::logout();
                        $this->_throwResponse('Login Failed, Contact your Administrator.',401,'error');
                    }
                }else{
                    $this->_throttle($this->ip_address,'hit');
                    Auth::logout();
                    $this->_throwResponse('Login Failed, Contact your Administrator.',401,'error');
                }
            }else{
                $this->_throttle($this->ip_address,'hit');
                Auth::logout();
                $this->_throwResponse('Login Restricted, Account is Deactivated',401,'error');
            }
        }else{
            $this->_throttle($this->ip_address,'hit');
            $this->_throwResponse('Login Failed, Check your username or password.',401,'error');
        }
    }

    protected function logout()
    {
        if(Auth::check()){
            $url = explode('/', $this->role_url[Auth::user()->role]);
            Auth::logout();
            return redirect($url[0]);
        }
    }

    protected function _throttle($ip, $action)
    {
        $limiter = app(RateLimiter::class);
        $key     = "login_throttle_$ip";

        switch($action){
            case 'hit':
                $limiter->hit($key, 3*60);
            break;

            case 'clear':
                $limiter->clear($key);
            break;

            case 'check-attempts':
                if ($limiter->tooManyAttempts($key, 5, 3*60)){
                    $this->_throwResponse('Too many login attempts.Try again later.',429,'error','throttle');
                }
            break;

            default:
                return null;
            break;
        }
    }

}
