import { _pageController } from "./pg_scripts.js";
import { gs_sessionStorage } from "../global.js";

export async function page_content(page, v) {
    $.ajax({
        url: "/editor/page-content",
        type: "POST",
        data: { page: page },
        processing: true,
        serverSide: true,
        dataType: "html",
        beforeSend: function () {
            window.history.pushState(null, null, page);
            b.block("Please Wait");
        },
        complete: function () {
            b.block("Please Wait");
            $("#kt_content").fadeIn(500);
            $("html, body").animate({ scrollTop: 0 }, "slow");
            const pageTitle = page.replace(/[^A-Z0-9]+/gi, " ").split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
            $("head > title").empty().append("Exelpack - " + pageTitle);
        },
        success: async function (res) {
            gs_sessionStorage("editor-page", page);
            $("#kt_content").empty().hide().append(res).promise().done(function () {
                _pageController(page.split("/")[0], v);
            });
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText, error, status);
            Swal.fire({
                title: "Oopps!",
                text: "Something went wrong..",
                icon: "info",
                showCancelButton: false,
                confirmButtonText: "Would you like to refresh?",
                reverseButtons: true,
            }).then(function (result) {
                if (result) {
                    window.location.reload();
                }
            });
        },
    });
}
