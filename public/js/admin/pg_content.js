import {page_script} from './pg_scripts.js';
import {gs_sessionStorage} from '../global.js';

export async function page_content(page,v){
    
    $.ajax({
      url: '/system-admin/page-content',
      type: "POST",
      data: {page:page},
      processing: true,
      serverSide: true,
      dataType: "html",
      beforeSend: function(){
        window.history.pushState(null, null,page);
        KTApp.block('#kt_body',{
            overlayColor: '#000000',
            state: 'primary',
            message: 'Please Wait...'
        });
      },
      complete: function () {
        KTApp.unblock('#kt_body');
        $("#kt_content").fadeIn(500);
        $("html, body").animate({ scrollTop: 0 }, "slow");
        const pageTitle = page.replace(/[^A-Z0-9]+/ig, " ")
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
        $("head > title").empty().append("Exelpack - " + pageTitle);
        },
        success: async function(response){
            gs_sessionStorage('system-admin-page',page);
            $("#kt_content").empty().hide().append(response).promise().done(function(){
                page_script(page.split('/')[0],v);
            });
        },
        error: function(xhr,status,error){
            if (xhr.status == 200) {
                console.log('200 : '+xhr.responseText)
                Swal.fire({
                    title:"Oopps!",
                    text: "Something went wrong..",
                    icon: "info",
                    showCancelButton: false,
                    confirmButtonText: "Would you like to refresh?",
                    reverseButtons: true
                    }).then(function(result) {
                        window.location.reload();
                    });
            } else if (xhr.status == 500) {
                console.log('500 : '+xhr.responseText)
                Swal.fire({
                    title:"Oopps!",
                    text: "Something went wrong..",
                    icon: "info",
                    showCancelButton: false,
                    confirmButtonText: "Would you like to refresh?",
                    reverseButtons: true
                    }).then(function(result) {
                        window.location.reload();
                    });
            } else {
                console.log(xhr);
                console.log(status);
                Swal.fire({
                    title:"Oopps!",
                    text: "Something went wrong..",
                    icon: "error",
                    showCancelButton: false,
                    confirmButtonText: "Would you like to refresh?",
                    reverseButtons: true
                    }).then(function(result) {
                        window.location.reload();
                    })
            }
        }
    });

}
