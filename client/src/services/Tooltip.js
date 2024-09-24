import { ref } from 'vue';
import { animate } from 'motion';

let content = ref("");
let margin = 14;

let cursorX = 0;
let cursorY = 0;1

let showed = false;
let hided = false;

function ShowTooltip(){
    let tooltip = document.getElementById('mouse-tooltip');

    tooltip.style.display = "block";

    if(!showed){
        animate(tooltip, {
            opacity: [0, 1],
            translateY: [20, 0]
        }, {duration: 0.1, ease: 'ease-out'});
        showed = true;
        hided = false;
    }
}

function HideTooltip(){
    let tooltip = document.getElementById('mouse-tooltip');
    
    
    if(!hided){
        animate(tooltip, {
            opacity: [1, 0],
            translateY: [0, 20]
       }, {duration: 0.1, ease: 'ease-in'}).finished.then(() => tooltip.style.display = "none")
       hided = true;
       showed = false;
    }
}

function AddTooltip(element, val, data = {}){
    element._dr_tooltip = {value: val, ...data};
}

function UpdateVisibilityThread(){
    let tooltip = document.getElementById('mouse-tooltip');
    let elements = document.elementsFromPoint(cursorX, cursorY);

    let visible = false;
    for(let i = 0; i < elements.length; i++){
        let element = elements[i];
        if(element._dr_tooltip){
            ShowTooltip();
            content.value = element._dr_tooltip.value;
            if(element._dr_tooltip.max_width) tooltip.style.maxWidth = element._dr_tooltip.max_width + "px";
            else tooltip.style.maxWidth = "none";
            visible = true;
            break;
        }
    }
    if(!visible) HideTooltip();

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