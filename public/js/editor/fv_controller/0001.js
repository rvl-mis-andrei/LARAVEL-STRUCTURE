import {_pickDate,gs_swalToast,gs_getEmployee,gs_sessionStorage,gs_Modal,gs_getItem} from './../../global_scripts.js';
"use strict";

export function _fvNewSystemUser(){

    var fvNewSystemUser = (function () {

        var _handleNewSystemUser = function(){

                let form = document.querySelector("#form-0001");

                let fvNewSystemUser = FormValidation.formValidation(form, {
                    fields: {
                        new_sys_user: {validators: { notEmpty: { message: 'This field is required' } }},
                        assign_role: {validators: { notEmpty: { message: 'This field is required' } }},
                    },
                    plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: ".fv-row",
                        eleInvalidClass: "",
                        eleValidClass: "",
                    }),
                    },
                })

            //SAVE FORM
            $(document).on('click','.btn-form-save',function(e){
                e.preventDefault();
                e.stopImmediatePropagation();
                let btn_save = $(this);
                fvNewSystemUser && fvNewSystemUser.validate().then(function (v) {
                    if(v == "Valid"){
                        Swal.fire({
                            title: "Submit Form ?",
                            text: "Double check before submitting.",
                            icon: "question",
                            buttonsStyling: !1,
                            confirmButtonText: "Yes, submit it!",
                            cancelButtonText: "No, return",
                            showCancelButton: !0,
                            customClass: {
                                confirmButton: "btn btn-primary",
                                cancelButton: "btn btn-light"
                            },
                        }).then(function (e){
                            if(e.isConfirmed){
                                btn_save.attr("data-kt-indicator", "on");
                                let url    = form.getAttribute("url");
                                let action = form.getAttribute("action");
                                _handleSubmitForm(null, form, action, url)
                                .then(function (result) {
                                    if(result){
                                        form.reset();
                                        fvNewSystemUser.resetField();
                                        $('#tbl_sys_user_list').DataTable().draw()
                                    }
                                })
                                .catch(function (error) {
                                    console.error(error);
                                });
                                setTimeout(function () {
                                    btn_save.attr("data-kt-indicator","off");
                                }, 1000)
                            }
                        })
                    }else{
                        Swal.fire({
                            text: "Sorry, looks like there are empty fields, please try again.",
                            icon: "info",
                            buttonsStyling: !1,
                            confirmButtonText: "Ok, got it!",
                            customClass: { confirmButton: "btn btn-primary" },
                        });
                    }
                });
            });

            // CANCEL FORM
            $(document).on('click','.btn0001-cancel',function(e){
                e.preventDefault();
                e.stopImmediatePropagation();
                Swal.fire({
                    text: "Are you sure you would like to cancel?",
                    icon: "question",
                    showCancelButton: !0,
                    buttonsStyling: !1,
                    confirmButtonText: "Yes, cancel it!",
                    cancelButtonText: "No, return",
                    customClass: {
                      confirmButton: "btn btn-primary",
                      cancelButton: "btn btn-active-light",
                    },
                  }).then(function (t) {
                    if(t.value){
                        form.reset(),
                        fvNewSystemUser.resetForm();
                        gs_Modal('#modal_new_sys_user','hide')
                    }else{
                        Swal.fire({
                            text: "Your form has not been cancelled!.",
                            icon: "info",
                            buttonsStyling: !1,
                            confirmButtonText: "Ok, got it!",
                            customClass: { confirmButton: "btn btn-primary" },
                        });

                    }
                });
            });

        }

    return {
        init: function () {
            _handleNewSystemUser();
        },
      };

    })();

    KTUtil.onDOMContentLoaded(function () {
        fvNewSystemUser.init();
    });

}
