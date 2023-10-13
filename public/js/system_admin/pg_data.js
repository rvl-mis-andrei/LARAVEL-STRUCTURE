import {_dc} from './pg_scripts.js';
export async function _httpRequest(blockPage, formData,url='system-admin/page-data'){
    return new Promise((resolve, reject) => {
        let bP = false;
        if(blockPage == true){ bP = 'blockPage'; }
        let res = _ajaxrequest(url, "POST", _constructBlockUi(bP, false, 'Please wait...'), _constructForm(formData));
        if(res){
            resolve(true);
        }else{
            reject('Something went wrong, Try again later');

        }
    })
}
function _constructForm(args){
  let formData = new FormData();
  for (var i = 1; (args.length+1) > i; i++){
     formData.append('data'+ i, args[i-1]);
   }
  return formData;
};
function _constructBlockUi(type, element, message){
        let formData = new FormData();
         formData.append('type', type);
         formData.append('element', element);
         formData.append('message', message);
         if(formData){
           return formData;
         }
};
async function _ajaxrequest(url, type,blockui, formData){

  return new Promise((resolve, reject) => {
    var y = true;
    $.ajax({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      },
      url: url,
      type: type,
      data: formData,
      contentType: false,
      processData: false,
      dataType: "json",
      beforeSend: function(){
        // KTApp.block('#kt_body',{
        //     overlayColor: '#000000',
        //     state: 'primary',
        //     message: 'Please Wait...'
        // });
      },
      complete: function(){
        // $("#kt_content").fadeIn(500);
        // $("html, body").animate({ scrollTop: 0 }, "slow");
      },
      success: function(res){
        if(res.status == 'success'){
          if(window.atob(res.payload) != false){
            let result=  _dc(JSON.parse(window.atob(res.payload)), formData.get("data2"));
            if(result){
              resolve(true);
            }else{
              resolve(false);
            }
          }else{
            _construct(res.message, formData.get("data2"));
          }
        }else if(res.status == 'not_found'){
           Swal.fire("Ops!", res.message, "info");
        }else{
           Swal.fire("Ops!", res.message, "info");
        }
      },
    //   error: function(xhr,status,error){
    //     if(xhr.status == 200){
    //       console.log('200 : '+xhr.responseText)
    //       Swal.fire({
    //         title:"Oopps!",
    //         text: "Something went wrong..",
    //         icon: "info",
    //         showCancelButton: false,
    //         confirmButtonText: "Would you like to refresh?",
    //             reverseButtons: true
    //         }).then(function(result) {
    //              window.location.reload();
    //         });
    //     }else if(xhr.status == 500){
    //       console.log('500 : '+xhr.responseText)
    //       Swal.fire({
    //         title:"Oopps!",
    //         text: "Something went wrong..",
    //         icon: "info",
    //         showCancelButton: false,
    //         confirmButtonText: "Would you like to refresh?",
    //             reverseButtons: true
    //         }).then(function(result) {
    //              window.location.reload();
    //         })
    //     }else{
    //       console.log(xhr);
    //       console.log(status);
    //       Swal.fire({
    //         title:"Oopps!",
    //         text: "Something went wrong..",
    //         icon: "error",
    //         showCancelButton: false,
    //         confirmButtonText: "Would you like to refresh?",
    //         reverseButtons: true
    //         }).then(function(result) {
    //              window.location.reload();
    //         })
    //     }
    //   }
    });
  })
}
