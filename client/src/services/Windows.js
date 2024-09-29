import { reactive, ref } from 'vue'
import { Disconnect } from './Campaign';

const windows = ref([]);

import LoginWindow from '@/views/windows/LoginWindow.vue'
import ExampleWindow from '@/views/windows/ExampleWindow.vue'
import MainMenuWindow from '@/views/windows/MainMenuWindow.vue'
import EditProfileWindow from '@/views/windows/EditProfileWindow.vue'
import SettingsWindow from '@/views/windows/SettingsWindow.vue'
import CampaignListWindow from '@/views/windows/campaigns/CampaignListWindow.vue'
import NewCampaignWindow from '@/views/windows/campaigns/NewCampaignWindow.vue'
import JoinCampaignWindow from '@/views/windows/campaigns/JoinCampaignWindow.vue'
import CampaignPreviewWindow from '@/views/windows/campaigns/CampaignPreviewWindow.vue'
import ChatWindow from '@/views/windows/game/ChatWindow.vue'
import DiceWindow from '@/views/windows/game/DiceWindow.vue'
import MapButtons from '@/views/windows/dm/MapButtons.vue'
import EnvironmentWindow from '@/views/windows/dm/EnvironmentWindow.vue'
import SystemSelectorWindow from '@/views/windows/campaigns/SystemSelectorWindow.vue'
import MapWindow from '@/views/windows/dm/MapWindow.vue'
import CombatWindow from '@/views/windows/game/CombatWindow.vue'
import EntityWindow from '@/views/windows/dm/EntityWindow.vue'
import CharactersWindow from '@/views/windows/game/CharactersWindow.vue'
import WelcomeWindow from '@/views/windows/WelcomeWindow.vue'
import CompendiumWindow from '@/views/windows/CompendiumWindow.vue'
import BookAnvilWindow from '@/views/windows/BookAnvilWindow.vue'
import IconSelectorWindow from '@/views/windows/selectors/IconSelectorWindow.vue'
import DatabaseWindow from '@/views/windows/game/DatabaseWindow.vue'
import AccountManagementWindow from '@/views/windows/settings/AccountManagementWindow.vue'
import PluginManagementWindow from '@/views/windows/settings/PluginManagementWindow.vue'
import PluginWindow from '../views/windows/settings/PluginWindow.vue';
import FirstRegisterWindow from '../views/windows/FirstRegisterWindow.vue';
import RegisterUserWindow from '../views/windows/settings/RegisterUserWindow.vue';
import CopyPendingUserWindow from '../views/windows/settings/CopyPendingUserWindow.vue';

let windowMap = {
    test: ExampleWindow,
    login: LoginWindow,
    main_menu: MainMenuWindow,
    welcome: WelcomeWindow,
    first_register: FirstRegisterWindow,
    register_user: RegisterUserWindow,
    copy_pending_user_window: CopyPendingUserWindow,
    edit_profile: EditProfileWindow,
    settings: SettingsWindow,
    campaign_list: CampaignListWindow,
    new_campaign: NewCampaignWindow,
    join_campaign: JoinCampaignWindow,
    campaign_preview: CampaignPreviewWindow,
    chat: ChatWindow,
    dice_menu: DiceWindow,
    map_buttons: MapButtons,
    environment: EnvironmentWindow,
    system_selector: SystemSelectorWindow,
    map_window: MapWindow,
    combat_window: CombatWindow,
    entity_window: EntityWindow,
    characters_window: CharactersWindow,
    compendium_window: CompendiumWindow,
    book_anvil_window: BookAnvilWindow,
    icon_selector: IconSelectorWindow,
    database: DatabaseWindow,
    plugin_management: PluginManagementWindow,
    account_management: AccountManagementWindow,
    plugin_window: PluginWindow
};

async function InjectWindow(plugin, window_type, window_component){
    let systemWidows = {};
    systemWidows[plugin + "/" + window_type] = (await import(`../../plugins/${plugin}/views/${window_component}.vue`)).default;
    windowMap = {...windowMap, ...systemWidows};

    console.log("Window injected");
}

// Presets
const defValues = {
    'test': {
        id: "example",
        title: "Example",
        close: () => ClearWindow('example')
    },
    'login': {
        id: 'login',
        title: 'Login',
    },
    'first_register': {
        id: 'first_register',
        title: 'register-admin.title',
    },
    'main_menu': {
        id: 'main_menu',
        title: 'main-menu.title',
        create: () => {
            // CreateChildWindow('main_menu', 'welcome');
        }
    },
    'welcome': {
        id: 'welcome',
        title: "Welcome",
        close: () => ClearWindow('welcome')
    },
    'edit_profile': {
        id: 'edit_profile',
        title: "Edit Profile",
        close: () => ClearWindow('edit_profile')
    },
    'campaign_list': {
        id: 'campaign_list',
        title: 'campaigns.title',
        back: () => {
            ClearWindow('campaign_list');
            CreateWindow('main_menu');
        }
    },
    'new_campaign': {
        id: 'new_campaign',
        title: 'campaigns.create.title',
        parent: 'campaign_list',
        close: () => ClearWindow('new_campaign')
    },
    'join_campaign': {
        id: 'join_campaign',
        title: 'campaigns.join.title',
        parent: 'campaign_list',
        close: () => ClearWindow('join_campaign')
    },
    'campaign_preview': {
        id: 'campaign_preview',
        title: "campaigns.preview.title",
        back: () => {
            Disconnect();
            ClearWindow('campaign_preview');
            CreateWindow('campaign_list');
        }
    },
    'chat': {
        id: 'chat',
        title: 'Chat',
        close: () => ClearWindow('chat')
    },
    'dice_menu': {
        id: 'dice_menu',
        title: 'Dice roll',
        close: () => ClearWindow('dice_menu')
    },
    'map_buttons': {
        id: 'map_buttons',
        title: '',
        close: () => ClearWindow('map_buttons')
    },
    'environment': {
        id: 'environment',
        title: 'Edit environment',
        close: () => ClearWindow('environment')
    },
    'system_selector': {
        id: 'system-selector',
        title: 'systems.title',
        close: () => ClearWindow('system-selector')
    },
    'map_window': {
        id: 'map_window',
        title: 'Maps',
        close: () => ClearWindow('map_window')
    },
    'combat_window': {
        id: 'combat_window',
        title: "Combat",
        close: () => ClearWindow('combat_window')
    },
    'entity_window': {
        id: 'entity_window',
        title: "Entities",
        close: () => ClearWindow('entity_window')
    },
    'characters_window': {
        id: 'characters_window',
        title: "Characters",
        close: () => ClearWindow('characters_window')
    },
    'compendium_window': {
        id: 'compendium_window',
        title: "Compendium",
        close: () => ClearWindow('compendium_window')
    },
    'book_anvil_window': {
        id: 'book_anvil_window',
        title: "Book Anvil",
        back: () => {
            ClearWindow('book_anvil_window');
            CreateWindow('main_menu');
        }
    },
    'icon_selector': {
        id: 'icon-selector',
        title: "Select an Icon",
    },
    'database': {
        id: 'database',
        title: "database.title",
        close: () => ClearWindow('database')
    }
}

const reload = ref(0);

let ReloadRef = () => { return reload };
let Windows = () => { return windows };
let WindowMap = () => { return windowMap };

let currentIndex = 10;

function SetupHandle(id, handle){

    // Update window info with handle info
    
    let win = GetWindowWithId(id);

    let currentWindowId = "window-wrapper-" + id;
    let currentWindowHandleId = "window-handle-" + id;
    let currentWindowResizerId = "window-resize-handle-" + id;
    
    let draggingWindow = false;
    let resizingWindow = false;

    let currentWindow = document.getElementById(currentWindowId);
    let handler = document.getElementById(currentWindowHandleId);
    let resizer = document.getElementById(currentWindowResizerId);

    let offsetX = 0;
    let offsetY = 0;

    let resizeOffsetX = 0;
    let resizeOffsetY = 0;

    // Programar un resizer mitjanament competent

    currentWindow.addEventListener("mousedown", (event) => {
        SetOnTop(id);
    });

    handler.addEventListener("mousedown", (event) => {
        draggingWindow = true;

        let windowRect = currentWindow.getBoundingClientRect();
        offsetX = windowRect.left - event.clientX;
        offsetY = windowRect.top - event.clientY;
    })

    // Move window listeners
    document.addEventListener("mousemove", (event) => {
        if(!draggingWindow) return;

        if(event.clientX + offsetX < -currentWindow.getBoundingClientRect().width + 20) currentWindow.style.left = (-currentWindow.getBoundingClientRect().width + 20) + "px";
        else if(event.clientX + offsetX > window.innerWidth - 20) currentWindow.style.left = (window.innerWidth - 20) + "px";
        else currentWindow.style.left = (event.clientX + offsetX) + "px";

        if(event.clientY + offsetY < 0) currentWindow.style.top = (0) + "px";
        else if(event.clientY + offsetY > window.innerHeight - 20) currentWindow.style.top = (window.innerHeight - 20) + "px";
        else currentWindow.style.top = (event.clientY + offsetY) + "px";
    })

    document.addEventListener("mouseup", (event) => {
        draggingWindow = false;
        // ummm suposo que no pots tancar mentres mous?
        SaveWindowPos({id, x: parseInt(currentWindow.style.left, 10), y: parseInt(currentWindow.style.top, 10)});
    });

    // Resize window listeners
    resizer.addEventListener("mousedown", (event) => {
        resizingWindow = true;

        let windowRect = currentWindow.getBoundingClientRect();
        resizeOffsetX = parseInt(currentWindow.style.width) - event.clientX;
        resizeOffsetY = parseInt(currentWindow.style.height) - event.clientY;
    });

    document.addEventListener("mousemove", (event) => {
        if(!resizingWindow) return;

        let newWidth = event.clientX + resizeOffsetX;
        let newHeight = event.clientY + resizeOffsetY;

        if(win.minHeight) if(win.minHeight > newHeight) newHeight = win.minHeight;
        if(win.maxHeight) if(win.maxHeight < newHeight) newHeight = win.maxHeight;

        if(win.minWidth) if(win.minWidth > newWidth) newWidth = win.minWidth;
        if(win.maxWidth) if(win.maxWidth < newWidth) newWidth = win.maxWidth;

        currentWindow.style.width = newWidth + "px";
        currentWindow.style.height = newHeight + "px";
    });

    document.addEventListener("mouseup", (event) => {
        resizingWindow = false;
        
        win.width = parseInt(currentWindow.style.width, 10);
        win.height = parseInt(currentWindow.style.height, 10);
    });

    handle.value.setupHandle();
}

function SetResizable(id, resizable){
    let win = GetWindowWithId(id);
    win.resizable = resizable;
}

function SetSize(id, size){
    let currentWindowId = "window-wrapper-" + id;
    let currentWindow = document.getElementById(currentWindowId);
    let win = GetWindowWithId(id);

    currentWindow.style.width = size.width + "px";
    currentWindow.style.height = size.height + "px";

    win.width = size.width;
}

function SetMaxSize(id, maxSize){
    let win = GetWindowWithId(id);

    if(maxSize.width) win.maxWidth = maxSize.width;
    else win.maxWidth = win.width;

    if(maxSize.height) win.maxHeight = maxSize.height;
    else win.maxHeight = win.height;
}

function SetMinSize(id, minSize){
    let win = GetWindowWithId(id);

    if(minSize.width) win.minWidth = minSize.width;
    else win.minWidth = win.width;

    if(minSize.height) win.minHeight = minSize.height;
    else win.minHeight = win.height;
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

function GetPosition(id){
    let win = GetWindowWithId(id);
    return {x: win.x, y: win.y};
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


function CreateWindow(type, data = {}){

    let finalData = {...{type}, ...defValues[type], ...data}

    let contains = false;
    for (let i = 0; i < windows.value.length; i++) {
        if(windows.value[i].id == finalData.id){
            contains = true;
            break;
        }
    }
    if(!contains) {
        windows.value.push(finalData);
        // reload.value += 1;

        setTimeout(() => {
            SetOnTop(finalData.id);
            if(finalData.create) finalData.create();
        }, 0);
    }
}

function CreateChildWindow(parentId, type, data = {}){
    let finalData = {...{type}, ...defValues[type], ...data}

    let parent = GetWindowWithId(parentId);
    if(parent.children) parent.children.push(finalData.id);
    else parent.children = [finalData.id];
    CreateWindow(type, data);
}

function ClearAll(){
    Object.keys(windows).forEach((key) => {
        windows.value = [];
    });
}

function ClearWindows(data){
    for (let i = 0; i < windows.value.length; i++) {
        ClearWindow(windows.value[i].id);
    }
    // reload.value += 1;
}

function ClearWindow(id){
    let win = GetWindowWithId(id);
    if(!win) return;
    if(win.children) for(let i = 0; i < win.children.length; i++) ClearWindow(win.children[i]);
    windows.value = windows.value.filter((e) => {return e.id !== id});
    // reload.value += 1;
}

function GetWindowWithId(id){
    for(let i = 0; i < windows.value.length; i++){
        if(windows.value[i].id == id){
            return windows.value[i];
        }
    }
}

function CallWindow(id, callableName, arg){
    let win = GetWindowWithId(id);
    win[callableName](arg);
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
    SetResizable,
    SetMaxSize,
    SetMinSize,
    SetPosition,
    ResetPosition,
    Windows,
    WindowMap,
    InjectWindow,
    ReloadRef,
    ClearWindows,
    CreateWindow,
    CreateChildWindow,
    CallWindow,
    GetWindowWithId,
    SaveWindowPos,
    GetPosition,
    ClearWindow,
    ClearAll
}