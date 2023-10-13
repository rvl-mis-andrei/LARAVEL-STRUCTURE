<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class isSystemAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::check()) {
            if(Auth::user()->role == 0){
                return $next($request);
            }else{

                $role_url = [
                    0 => 'system-admin',
                    1 => 'admin',
                    2 => 'editor',
                ];

                $acc_role = Auth::user()->role;
                Auth::logout();
                return redirect($role_url[$acc_role]);
            }
        }
    }
}
