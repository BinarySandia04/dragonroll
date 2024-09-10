import { ref } from 'vue';

let content = ref("");
let margin = 14;

let cursorX = 0;
let cursorY = 0;

function ShowTooltip(){
    let tooltip = document.getElementById('mouse-tooltip');
    tooltip.style.display = "block";
}

function HideTooltip(){
    let tooltip = document.getElementById('mouse-tooltip');
    tooltip.style.display = "none";
}

function AddTooltip(element, val, data = {}){
    element._dr_tooltip = {value: val, ...data};
}

function UpdateVisibilityThread(){
    let tooltip = document.getElementById('mouse-tooltip');
    let element = document.elementFromPoint(cursorX, cursorY);
    if(element._dr_tooltip){
        ShowTooltip();
        content.value = element._dr_tooltip.value;
        if(element._dr_tooltip.max_width) tooltip.style.maxWidth = element._dr_tooltip.max_width + "px";
        else tooltip.style.maxWidth = "none";
    } else HideTooltip();

    setTimeout(UpdateVisibilityThread, 0);
}

function SetupTooltip(){
    let tooltip = document.getElementById('mouse-tooltip');

    document.addEventListener("mousemove", (event) => {
        cursorX = event.clientX;
        cursorY = event.clientY;

        tooltip.style.top = (cursorY + margin) + "px";
        tooltip.style.left = (cursorX + margin) + "px";
    });

    UpdateVisibilityThread();
}

let GetContentRef = () => content;

export {
    SetupTooltip,
    GetContentRef,
    AddTooltip,
};