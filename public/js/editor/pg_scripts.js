import {gs_getItem} from '../global.js';
import {pg_array} from './page.js';

async function importController(page,subpage){
    const module = await import('./controller/'+pg_array(page)+'.js');
    module.controller(page,subpage);
}

async function importConstruct(page,type,res=false){
    const module = await import('./controller/'+pg_array(page)+'.js');
    module.construct(res,type);
}

export async function _pageController(page,subpage=false){
    let rep1       = page.replace(/-/g, "_");
    importController(rep1,subpage);
}

export function _pageConstruct(res,type){
    let page       = gs_getItem('editor-page');
    let rep1       = page.replace(/-/g, "_");
    importConstruct(rep1,type,res);
}
