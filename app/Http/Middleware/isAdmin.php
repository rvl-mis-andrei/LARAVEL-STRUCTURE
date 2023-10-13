<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class isAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::check()) {
            if(Auth::user()->role == 1){
                return $next($request);
            }else{

                $role_url = [
                    0 => 'system-admin/dashboard',
                    1 => 'admin/dashboard',
                    2 => 'editor/dashboard',
                ];

                return redirect($role_url[Auth::user()->role]);
            }
        }else{

        }
    }
}
