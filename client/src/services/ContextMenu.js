// You should hide the context menu when the element that has the
// event gets removed

let margin = -3;

let cursorX = 0;
let cursorY = 0;

let arrowIcon = "icons/iconoir/regular/nav-arrow-right.svg";

function Show(){
    let contextMenu = document.getElementById('context-menu');
    contextMenu.style.display = "flex";
    contextMenu.style.top = (cursorY + margin) + "px";
    contextMenu.style.left = (cursorX + margin) + "px";
}

function HideContextMenu(){
    let contextMenu = document.getElementById('context-menu');
    contextMenu.style.display = "none";
}

function PopulateContext(val){
    let children = [];
    val.forEach(element => {
        let contextMenuElement = document.createElement('div');
        contextMenuElement.classList.add("context-menu-element");
        if(element.action)
            contextMenuElement.addEventListener("click", element.action);
        
        let spanInfo = document.createElement('span');
        spanInfo.innerHTML = element.name;
        contextMenuElement.appendChild(spanInfo);

        if(element.icon){
            let iconContextElement = document.createElement('img');
            iconContextElement.src = element.icon;
            contextMenuElement.appendChild(iconContextElement);
        }

        if(element.context){
            let iconContextElement = document.createElement('img');
            iconContextElement.src = arrowIcon;
            contextMenuElement.appendChild(iconContextElement);

            let childContextMenuElement = document.createElement('div');
            childContextMenuElement.classList.add("context-menu");
            childContextMenuElement.style.left = "100%";
            childContextMenuElement.style.top = "0";
            childContextMenuElement.style.display = "none";
    
            let childChildren = PopulateContext(element.context);
            childChildren.forEach((child) => childContextMenuElement.appendChild(child));
    
            contextMenuElement.addEventListener("mouseenter", () => {
                childContextMenuElement.style.display = "flex";
            });

            contextMenuElement.addEventListener("mouseleave", () => {
                childContextMenuElement.style.display = "none";
            })

            contextMenuElement.appendChild(childContextMenuElement);
        }

        children.push(contextMenuElement);
    });

    return children;
}

function PopulateContextMenu(val){
    let contextMenu = document.getElementById('context-menu');
    let children = PopulateContext(val);

    contextMenu.replaceChildren();
    children.forEach((el) => contextMenu.appendChild(el));
}

function AddContextMenu(element, val){
    element._dr_context = val;
    element.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        PopulateContextMenu(val);
        Show();
    });
}



function UpdateVisibility(){
    let contextMenu = document.getElementById('context-menu');
    let element = document.elementFromPoint(cursorX, cursorY);
    let mustHide = true;
    while(element){
        if(element == contextMenu){
            mustHide = false;
            break;
        }
        element = element.parentElement;
    }
    if(mustHide) HideContextMenu();
}

function SetupContextMenu(){
    HideContextMenu();

    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
    });

    document.addEventListener('mousedown', UpdateVisibility);
}

function ShowContextMenu(val){
    PopulateContextMenu(val);
    Show();
}

export {
    SetupContextMenu,
    AddContextMenu,
    ShowContextMenu,
    HideContextMenu
};