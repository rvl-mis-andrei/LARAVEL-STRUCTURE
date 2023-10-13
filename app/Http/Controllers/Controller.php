<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Pagination\Paginator;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Validator;
use Jenssegers\Agent\Agent;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    // Global functions for other Controllers

    public function _device()
    {
        $agent   = new Agent();
        $platform       = $agent->platform();
        $platform_ver   = $agent->version($platform);
        $browser        = $agent->browser();
        $browser_ver    = $agent->version($browser);
        $device         = $agent->device();
        return [ 'os'=>$platform.'['.$platform_ver.']', 'browser'=>$browser.'['.$browser_ver.']', 'device'=>$device ];
    }

    protected function _fieldValidation($request, $inputs)
    {
        foreach ($inputs as $key => $required) {
            if (!$this->_fieldValidator($request->all(), $key, $required)) {
                $this->_throwError('Missing Form field '.$key.', Please Try Again.',429);
            }
        }
    }

    protected function _fieldValidator($val ,$key,$value)
    {
        return Validator::make([$key => $val], [$key => $value])->passes();
    }

    public function _throwResponse($message,$code,$status,$payload=null)
    {
        return response()->json([
            'status' => $status,
            'message' => $message,
            'payload' => $payload
        ],$code)->throwResponse();
    }

    public function _throwEncryptedResponse($message,$code,$status,$payload=null)
    {
        return response()->json([
            'status' => $status,
            'message' => $message,
            'payload' => base64_encode(json_encode($payload))
        ],$code)->throwResponse();
    }

    protected function _encrypt($data)
    {
        return Crypt::encryptString($data);
    }

    protected function _decrypt($data)
    {
        return Crypt::decryptString($data);
    }

    public function _dateFormatter($date,$format)
    {
        if($date){
            return  Carbon::parse($date)->format($format);
        }else{
            return null;
        }
    }

    //Convert Flatpickr format
    public function _parseFlatpickr($date)
    {
        if($date){
            $originalFormat = 'd, M Y';
            $newFormat = 'Y-m-d';
            return Carbon::createFromFormat($originalFormat, $date)->format($newFormat);
        }else{
            return null;
        }
    }

    //Custom Pagination
    protected function _paginate($items, $perPage = 5, $page = 1, $options = []){
        $page = $page ?: (Paginator::resolveCurrentPage() ?: 1);
        $items = $items instanceof Collection ? $items : Collection::make($items);
        return new LengthAwarePaginator($items->forPage($page, $perPage), $items->count(), $perPage, $page, $options);
    }

    //Generate QR Code
    protected function _generateQRCode($qrCodeData,$qr_folder)
    {
        try {
            $qr_code = $this->quickRandom();
            $qr_data = url('/').$qrCodeData.'/'.$qr_code;
            QrCode::format('png')->size(200)->generate($qr_data,public_path("storage/$qr_folder/$qr_code.png"));
            return $qr_code;
        } catch (\Exception $e) {
            return false;
        }
    }


}
