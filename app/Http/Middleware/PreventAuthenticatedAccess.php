<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class PreventAuthenticatedAccess
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::check()) {
            $role_url = [
                0 => 'system-admin/dashboard',
                1 => 'admin/dashboard',
                2 => 'editor/dashboard',
            ];

            return redirect($role_url[Auth::user()->role]);
            exit(0);
        }

        return $next($request);
    }
}
