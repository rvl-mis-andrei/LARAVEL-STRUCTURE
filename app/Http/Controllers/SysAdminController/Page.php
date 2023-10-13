<?php

namespace App\Http\Controllers\SysAdminController;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Cookie;

class Page extends Controller
{
    protected $url;
    protected $device_details;

    public function __construct(Request $request)
    {
        $this->url = $request->segment(2);
        $this->device_details = $this->_device();
    }

    public function index()
    {
        Cookie::queue('sys-admin-page',$this->url,1440);
        return view('system_admin.layout.app');
    }

    public function page_content(Request $request)
    {
        $page  = $request->page ? $request->page : Cache::get('sys-admin-page','dashboard');
        Cookie::queue('sys-admin-page',$page,1440);

        return match ($page) {

            'dashboard' =>  view('system_admin.0001'),

            default => false,
        };
    }
}
