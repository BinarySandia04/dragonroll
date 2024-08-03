import { reactive, ref } from 'vue'

const windows = {
    login: ref([]),
    register: ref([]),
    test: ref([]),
    main_menu: ref([]),
    edit_profile: ref([]),
    account_settings: ref([]),
    db_window: ref([])
};

const reload = ref(0);

let ReloadRef = () => { return reload };
let Windows = () => { return windows };

let currentIndex = 1;

function SetupHandle(id, handle){

    // Update window info with handle info
    
    let win = GetWindowWithId(id);

    let currentWindowId = "window-wrapper-" + id;
    let currentWindowHandleId = "window-handle-" + id;
    
    let mouseDown = false;

    let currentWindow = document.getElementById(currentWindowId);
    let handler = document.getElementById(currentWindowHandleId);

    let offsetX = 0;
    let offsetY = 0;

    currentWindow.addEventListener("mousedown", (event) => {
        SetOnTop(id);
    });

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
        // ummm suposo que no pots tancar mentres mous?
        SaveWindowPos({id, x: parseInt(currentWindow.style.left, 10), y: parseInt(currentWindow.style.top, 10)});
    });

    handle.value.setupHandle();
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

    SaveWindowPos({id, x: pos.x, y: pos.y})
}

function ResetPosition(id, pos){
    let win = GetWindowWithId(id);
    let data = {x: win.x, y: win.y};

    if(data.x && data.y){
        SetPosition(id, data);
        return;
    }
    SetPosition(id, pos);
}


function CreateWindow(data){
    if(windows[data.type] === undefined){
        console.error("Window type " + data.type + " is not defined!");
        return;
    }

    let contains = false;
    for (let i = 0; i < windows[data.type].length; i++) {
        if(windows[data.type][i].id == data.id){
            contains = true;
            break;
        }
    }

    if(!contains) {
        windows[data.type].value.push(data);
        // reload.value += 1;

        setTimeout(() => SetOnTop(data.id), 0);
    }
}

function ClearWindows(data){
    windows[data.type].value = [];
    // reload.value += 1;
}

function ClearWindow(id){
    let win = GetWindowWithId(id);
    windows[win.type].value = windows[win.type].value.filter((e) => {return e.id !== id});
    // reload.value += 1;
}

function GetWindowWithId(id){
    for(let key of Object.keys(windows)){
        for(let i = 0; i < windows[key].value.length; i++){
            if(windows[key].value[i].id == id){
                return windows[key].value[i];
            }
        }
    }
}

function SaveWindowPos(data){
    let win = GetWindowWithId(data.id);
    if(win === undefined) return;
    win.x = data.x;
    win.y = data.y;
}

function SetOnTop(id){
    let currentWindowId = "window-wrapper-" + id;
    let currentWindow = document.getElementById(currentWindowId);

    currentIndex += 1;
    currentWindow.style.zIndex = currentIndex;
}

export {
    SetupHandle,
    SetSize,
    SetPosition,
    ResetPosition,
    Windows,
    ReloadRef,
    ClearWindows,
    CreateWindow,
    GetWindowWithId,
    SaveWindowPos,
    ClearWindow
}