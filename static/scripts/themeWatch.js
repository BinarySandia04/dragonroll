function updateLogoThemes(){
    let theme = localStorage.getItem('theme')
    let darkLogos = document.getElementsByClassName('logo-splash-dark');
    let lightLogos = document.getElementsByClassName('logo-splash-light');
    if(theme == 'dark'){
        for(let i = 0; i < darkLogos.length; i++)  darkLogos[i].style.display = "unset";
        for(let i = 0; i < lightLogos.length; i++) lightLogos[i].style.display = "none";
    } else {
        for(let i = 0; i < darkLogos.length; i++)  darkLogos[i].style.display = "none";
        for(let i = 0; i < lightLogos.length; i++) lightLogos[i].style.display = "unset";
    }
}

document.addEventListener("DOMContentLoaded", (event) => {

    const attrObserver = new MutationObserver((mutations) => {
        mutations.forEach(mu => {
        if (mu.type !== "attributes" && mu.attributeName !== "class") return;
            updateLogoThemes();
        });
    });

    const ELS_test = document.querySelectorAll("body");
    ELS_test.forEach(el => attrObserver.observe(el, {attributes: true}));

    updateLogoThemes();
});
