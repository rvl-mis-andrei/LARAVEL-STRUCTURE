<?php

namespace App\Http\Controllers\EditorController;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Cookie;

class Page extends Controller
{
    protected $url;
    protected $request;

    public function __construct(Request $request)
    {
        $this->url = $request->segment(2);
        $this->request = $request;
    }

    public function index()
    {
        Cookie::queue('editor-page',$this->url,1440);
        return view('system_admin.layout.app');
    }

    public function page_content()
    {
        $page  = $this->request->page ? $this->request->page : Cache::get('editor-page','dashboard');
        Cookie::queue('editor-page',$page,1440);

        return match ($page) {

            'dashboard' =>  view('editor.0001'),

            default => false,
        };
    }
}
