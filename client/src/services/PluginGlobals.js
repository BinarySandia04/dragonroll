// We store it in window because i don't know somewhere else to 
// store global variables

const Global = (plugin) => {
    if(window['__DRAGONROLL'] === undefined) window['__DRAGONROLL'] = {};
    if(window['__DRAGONROLL'][plugin] === undefined) window['__DRAGONROLL'][plugin] = {};

    return window.__DRAGONROLL[plugin];
}

export {
    Global
}