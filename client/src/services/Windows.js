function SetupHandle(id){
    let currentWindowId = "window-wrapper-" + id;
    let currentWindowHandleId = "window-handle-" + id;
    
    let mouseDown = false;

    let currentWindow = document.getElementById(currentWindowId);

    let handler = document.getElementById(currentWindowHandleId);

    let offsetX = 0;
    let offsetY = 0;

    handler.addEventListener("mousedown", (event) => {
        mouseDown = true;

        let windowRect = currentWindow.getBoundingClientRect();
        offsetX = windowRect.left - event.clientX;
        offsetY = windowRect.top - event.clientY;
    })

    document.addEventListener("mousemove", (event) => {
        if(!mouseDown) return;

        if(event.clientX + offsetX < -currentWindow.getBoundingClientRect().width + 20) currentWindow.style.left = (-currentWindow.getBoundingClientRect().width + 20) + "px";
        else if(event.clientX + offsetX > window.innerWidth - 20) currentWindow.style.left = (window.innerWidth - 20) + "px";
        else currentWindow.style.left = (event.clientX + offsetX) + "px";

        if(event.clientY + offsetY < 0) currentWindow.style.top = (0) + "px";
        else if(event.clientY + offsetY > window.innerHeight - 20) currentWindow.style.top = (window.innerHeight - 20) + "px";
        else currentWindow.style.top = (event.clientY + offsetY) + "px";
    })

    document.addEventListener("mouseup", (event) => {
        mouseDown = false;
    });
}

function SetSize(id, size){
    let currentWindowId = "window-wrapper-" + id;
    let currentWindow = document.getElementById(currentWindowId);

    currentWindow.style.width = size.x + "px";
    currentWindow.style.height = size.y + "px";
}

function SetPosition(id, pos){
    let currentWindowId = "window-wrapper-" + id;
    let currentWindow = document.getElementById(currentWindowId);

    if(pos == "center"){
        let x = window.innerWidth / 2;
        let y = window.innerHeight / 2;
    
        currentWindow.style.left = (x - currentWindow.getBoundingClientRect().width / 2) + "px";
        currentWindow.style.top  = (y - currentWindow.getBoundingClientRect().height / 2) + "px";
    
        return;
    }

    currentWindow.style.top = pos.y + "px";
    currentWindow.style.left = pos.x + "px";
}


export {
    SetupHandle,
    SetSize,
    SetPosition
}