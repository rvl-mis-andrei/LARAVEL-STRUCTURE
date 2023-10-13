<?php

namespace App\Http\Controllers\EditorController\Action;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class Update extends Controller
{
    protected $array;
    protected $request;
    protected $alert;
    protected $res;

    public function __construct(Request $request)
    {
        $this->request = $request;
        $this->array   = array();
        $this->res     = false;

        $this->alert = [
            'Record is updated successfully',
            'Something went wrong, Try again later',
        ];
    }

    public function editor_create(){

        if(isset($this->request->action)){

            $this->res = match($this->request->action){
                '' => '',
                default => false,
            };
        }

        $this->_throwEncryptedResponse('Request Accepted',200,'success',$this->res);

    }
}
