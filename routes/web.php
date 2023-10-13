<?php

use App\Http\Controllers\AuthController\Login as LoginController;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\SysAdminController\Page as SysAdminPage;

use App\Http\Controllers\AdminController\Page as AdminPage;
use App\Http\Controllers\EditorController\Page as EditorPage;



/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('csrf', function(){ return csrf_token(); });

Route::controller(LoginController::class)->group(function () {

    Route::group(['middleware' => ['prevent.authenticated']], function () {

        Route::get('/', 'index')->name('editor_login');
        Route::get('/system-admin', 'index')->name('sys_admin_login');
        Route::get('/admin', 'index')->name('admin_login');
        Route::get('/editor', 'index')->name('editor_login');

        Route::post('/login', 'login')->name('login');
    });

    Route::post('logout', 'logout')->name('logout');

});



Route::group(['prefix'=>'system-admin','middleware'=>['auth','system.admin']], function() {

    Route::controller(SysAdminPage::class)->group(function () {

        Route::post('/page-content', 'page_content');

        Route::get('/dashboard', 'index');

    });

});

Route::group(['prefix'=>'admin','middleware'=>['auth','admin']], function() {

    Route::controller(AdminPage::class)->group(function () {

        Route::post('/page-content', 'page_content');

        Route::get('/dashboard', 'index');

    });

});


Route::group(['prefix'=>'editor','middleware'=>['auth','editor']], function() {

    Route::controller(EditorPage::class)->group(function () {

        Route::post('/page-content', 'page_content');

        Route::get('/dashboard', 'index');

    });

});


