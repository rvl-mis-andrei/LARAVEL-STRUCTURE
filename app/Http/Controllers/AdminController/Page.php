<?php

namespace App\Http\Controllers\AdminController;

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
        Cookie::queue('admin-page',$this->url,1440);
        return view('admin.layout.app');
    }

    public function page_content(Request $request)
    {
        $page  = $request->page ? $request->page : Cache::get('admin-page','dashboard');
        Cookie::queue('admin-page',$page,1440);

        return match ($page) {

            'dashboard' =>  view('admin.0001'),

            default => false,
        };
    }
}
