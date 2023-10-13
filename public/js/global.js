export function gs_sessionStorage(session,val) {
    if (typeof(Storage) !== "undefined") {
        sessionStorage.setItem(session, val);
    } else {
        console.log("Sorry, your browser does not support Web Storage...");
    }
}

export function gs_getItem(session){
    return sessionStorage.getItem(session);
}

export function gs_clearSession(name){
    for (var i = 0; i < name.length; i++) {
        var names = name[i];
        sessionStorage.removeItem(names);
    }
}

export function gs_swalToast(title,icon){

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

    Toast.fire({ icon: icon, title: title })
}

export function gs_Modal(modal_id,action){

    let modal = bootstrap.Modal.getOrCreateInstance(document.querySelector(modal_id));

    if(action == 'show'){
        modal.show();
    }else if(action == 'hide'){
        modal.hide();
        $('.modal-backdrop').remove()
    }
}

export function gs_SelectSearch(select,modal_id)
{
    $(select).select2({
        dropdownParent: $(modal_id)
    });
}
