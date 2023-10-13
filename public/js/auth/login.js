import {gs_swalToast} from '../global.js';
"use strict";

var KTLoginForm = (function () {
    var form,fvLoginForm,formUrl,formSubmitButton;

    var _handlerefreshToken = function(){
        $.get('csrf').done(function(data){
            $("#csrf-token").attr('content',data);
        });
    }

    var _handleLoginForm = function() {

        form       = document.querySelector("#kt_login_singin_form");
        formUrl   = KTUtil.attr(form,'action');

        fvLoginForm = FormValidation.formValidation(form, {
            fields: {
                username: { validators: { notEmpty: { message: "Username is required" } },
                },
                password: { validators: { notEmpty: { message: "Password is required" } },
                },
            },
            plugins: {
                trigger: new FormValidation.plugins.Trigger(),
                submitButton: new FormValidation.plugins.SubmitButton(),
                bootstrap: new FormValidation.plugins.Bootstrap({
                })
            }
        });

        $('.kt_sign_in_submit').click(function (e) {
            e.preventDefault();
            let btn = $(this);
            fvLoginForm.validate().then(function (i) {
                if(i == "Valid"){
                    btn.attr("data-kt-indicator", "on").attr('disabled',true);
                    FormValidation.utils.fetch(formUrl, {
                        method: 'POST',
                        dataType: 'json',
                        credentials: "same-origin",
                        headers: {"X-CSRF-Token": $('meta[name="csrf-token"]').attr('content')},
                        params: {
                            username: form.querySelector('[name="username"]').value,
                            password: form.querySelector('[name="password"]').value,
                        },
                    }).then(function(response) {
                        if(response.status == 'success'){
                            gs_swalToast(response.message,response.status);
                            window.location.replace("/"+response.payload+"/dashboard");
                        }else{
                            gs_swalToast(response.message,response.status);
                            if(response.payload == 'throttle'){
                                btn.attr("data-kt-indicator", "on").attr('disabled',true);
                            }else{
                                _handlerefreshToken();
                                btn.attr("data-kt-indicator", "off").attr('disabled',false);
                            }
                        }
                    })
                }else{
                    Swal.fire({
                        title: "Ooops",
                        text: "Sorry, Please Complete The Login Form.",
                        icon: "info",
                        buttonsStyling: !1,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                            confirmButton: "btn btn-primary",
                        },
                    });
                }
            });
        });
    }

    return {
        init: function () {
            _handleLoginForm()
        }
    };

})();

jQuery(document).ready(function() {
    KTLoginForm.init();
});
