let icons = [];

async function GetJson(url){
    let obj = await (await fetch(url)).json();
    return obj;
}

async function FetchVanillaResources(){ 
  icons = (await GetJson('/data/icons.json')).files;
}

function GetIcons(){
    return icons;
}

export {
    FetchVanillaResources,
    
    GetIcons,
};