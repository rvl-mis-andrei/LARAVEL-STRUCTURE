<?php

namespace App\Http\Controllers\EditorController;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PageData extends Controller
{
    protected $request;
    protected $array;
    protected $res;

    public function __construct(Request $request)
    {
        $this->request = $request;
        $this->array   = array();
        $this->res     = false;

    }

    public function page_data()
    {
        if(isset($this->request->data1)){

            $this->res = match($this->request->data1){

                '' => '',

                default => false

            };

        }

        $this->_throwEncryptedResponse('Request Accepted',200,'success',$this->res);

    }
}
