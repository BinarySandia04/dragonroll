function GetKey(from, key){
    let k = key.split('.');
    let obj = from;
    for(let i = 0; i < k.length; i++){
        if(typeof obj !== 'object'){
            // We found a literal before ending!
            return;
        }
        if(Object.keys(obj).includes(k[i])){
            obj = obj[k[i]];
        } else return;
    }
    return obj;
}

function SetKey(from, key, value){
    let k = key.split('.');
    let obj = from;
    for(let i = 0; i < k.length - 1; i++){
        if(!Object.keys(obj).includes(k[i])){
            obj[k[i]] = {};
        }
        obj = obj[k[i]];
    }
    obj[k[k.length - 1]] = value;
}

export {
    GetKey,
    SetKey
}