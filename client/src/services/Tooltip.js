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

function AddTooltip(element, val){
    element._dr_tooltip = val;
}

function UpdateVisibilityThread(){
    let hiding = true;
    document.elementsFromPoint(cursorX, cursorY).forEach(element => {
        if(element._dr_tooltip){
            hiding = false;
            content.value = element._dr_tooltip;
        }
    });
    if(hiding) HideTooltip();
    else ShowTooltip();

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