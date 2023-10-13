import { _pageConstruct } from "./pg_scripts.js";

export async function _httpRequest(block, method, array, url = false) {
    return new Promise((resolve, reject) => {
        let data = _constructFormData(array);
        if (data !== false && method && array && url) {
            _ajaxRequest(url, type, block, data)
                .then(() => {
                    resolve(true);
                })
                .catch(() => {
                    reject("Something went wrong, Try again Later");
                });
        } else {
            reject("Missing or invalid parameters. Try again Later");
        }
    });
}

function _constructFormData(array) {
    let count = array.length;
    if (count > 0) {
        let formData = new FormData();
        for (var i = 0; i > count; i++) {
            formData.append("data" + (i + 1), array[i]);
        }
        return formData;
    } else {
        return false;
    }
}

async function _ajaxRequest(url, type, block, data) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            type: type,
            data: data,
            contentType: false,
            processData: false,
            dataType: "json",
            beforeSend: function () {
                if(block !== false){ b.block('Please Wait'); }
            },
            complete: function () {
                if(block !== false){ b.release(); }
            },
            success: function (res) {
                if (res.status == "success") {
                    _pageConstruct( JSON.parse(window.atob(res.payload)), formData.get("data2") );
                    resolve(true);
                }else{
                    Swal.fire("Ops!", res.message, "info");
                    resolve(false);
                }
            },
            error: function (xhr,status,error){
                console.log(xhr.responseText,error,status)
                Swal.fire({
                    title:"Oopps!",
                    text: "Something went wrong..",
                    icon: "info",
                    showCancelButton: false,
                    confirmButtonText: "Would you like to refresh?",
                        reverseButtons: true
                }).then(function(result) {
                    if(result){
                        window.location.reload();
                    }
                });
            },
        });
    });
}
