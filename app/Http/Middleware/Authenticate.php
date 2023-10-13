<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     */
    protected function redirectTo(Request $request): ?string
    {
        if(!$request->expectsJson()){
            return match($request->segment(1)){

                'system-admin' => route('sys_admin_login'),
                'admin'        => route('admin_login'),
                default => route('editor_login'),
            };
        }else{
            return null;
        };
    }
}
