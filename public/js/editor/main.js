import {page_content} from './pg_content.js';
import {gs_sessionStorage,gs_getItem} from '../global.js';

'use strict';
var appHandler = function(){

    Array.from($("a[data-menu=main-menu],a[data-menu=sub-menu]")).forEach(function(element){
        if(element.getAttribute('data-url')){
            element.addEventListener("click", function(e){
                e.preventDefault();
                page_content(element.getAttribute('data-url'));
                gs_sessionStorage('editor-nav-link',element.getAttribute('href'));
                navbar_active(element.getAttribute('data-url'),element.getAttribute('data-menu'));
        })
      }else{
      }
    });

    var navbar_active = function(pg,type){

        if(type=="main-menu"){
          $('.menu-item').removeClass('menu-item-active menu-item-open');
          $('a[data-url='+pg+']').parent().addClass('menu-item-active');
        }else{
          $('.menu-item-submenu').removeClass('menu-item-open');
          $('a[data-url='+pg+']').parent().addClass('menu-item-open');
        }

    }

    var urlParams = async function(url){
        var params = {};
        var parser = document.createElement('a');
        parser.href = url;
        var query = parser.search.substring(1);
        var vars = query.split('&');
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');
            params[pair[0]] = decodeURIComponent(pair[1]);
        }
        return params;
    }

    var urlPage =  async function (url){

        let check =  await urlParams(window.location.href);
        let page  = "";


        if(url.split('/')[1] == 'editor')
        {
            page = url.split('/')[2];
            await page_content(page,check.view);
        }
        else
        {
            page =url.split('/')[1];
            // await page_content(page,check.view);
        };

        navbar_active(page,$('a[data-url='+page.replace('#','')+']').attr('data-menu'));

    };

    return {
        init: function(){
            urlPage(window.location.pathname);
        }
    };

}();

$(document).ready(function(){
    appHandler.init();
});
