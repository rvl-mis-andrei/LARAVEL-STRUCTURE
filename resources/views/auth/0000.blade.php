
@extends('auth.app')

@section('title', 'Sign In | System Admin')

@section('login-form')
<div class="login-form">
    <div class="mb-20">
        <h3>Sign in Your Account</h3>
        <div class="text-muted font-weight-bold">Enter your details to login to your account:</div>
    </div>
    <form class="form" id="kt_login_singin_form" action="{{ route('login') }}">
        <div class="form-group mb-5">
            <input class="form-control h-auto form-control-solid py-4 px-8" type="text" placeholder="Username" name="username" autocomplete="off" />
        </div>
        <div class="form-group mb-5">
            <input class="form-control h-auto form-control-solid py-4 px-8" type="password" placeholder="Password" name="password" />
        </div>
        <div class="form-group d-flex flex-wrap justify-content-between align-items-center">
            <div class="checkbox-inline">
                <label class="checkbox m-0 text-muted">
                <input type="checkbox" name="remember" />
                <span></span>Remember me</label>
            </div>
            <a href="javascript:;" id="kt_login_forgot" class="text-muted text-hover-primary">Forget Password ?</a>
        </div>
        <button id="" class="kt_sign_in_submit btn btn-primary font-weight-bold px-9 py-4 my-3 mx-4">Sign In</button>
    </form>
    <div class="mt-10">
        <span class="opacity-70 mr-4">Don't have an account yet?</span>
        <a href="javascript:;" id="" class="text-muted text-hover-primary font-weight-bold">Contact Administrator</a>
    </div>
</div>
@endsection
