import {gs_getItem} from '../global.js';
import {page_array} from './page.js';

async function import_function(page,subpage){

    const module = await import('./controller/'+page_array(page)+'.js');
    module.controller(page,subpage);

}
async function importConstruct(page,type,res=false){

    const module = await import('./controller/'+page_array(page)+'.js');
    module.construct(res,type);

}
export async function page_script(page,subpage=false){

    let rep1       = page.replace('-','_');
    let strReplace = rep1.replace('-','_');
    import_function(strReplace,subpage);

}
export function _dc(res,type){

    let page       = gs_getItem('mis-page');
    let rep1       = page.replace('-','_');
    let strReplace = rep1.replace('-','_');
    importConstruct(strReplace,type,res);
}
