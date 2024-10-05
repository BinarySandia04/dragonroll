import { ref } from 'vue';
import Server from '@/services/Server'


const UserStatus = ref(0);

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function SetUser(token){
    localStorage.setItem('token', token);
    UserStatus.value = 1;
}

async function HasAdmin(){
    let response = await Server().get('/user/has-admin');
    return response.data.status != "init";
}

function SetUserSetting(key, value){
    return new Promise((resolve, reject) => {
        let user = GetUser()
        if(!user.settings) user.settings = {};
        user.settings[key] = value;
        Server().post('/user/update-settings', {settings: user.settings}).then(response => {
            resolve(response.data.settings);
        });
    });
}

function GetUserSetting(key){
    return new Promise((resolve, reject) => {
        Server().get('/user/get-settings').then(response => {
            if(response.data.settings)
                resolve(response.data.settings[key]);
            else resolve(undefined);
        }).catch((ex) => reject(ex));
    });
}

function GetUser(){
    const token = localStorage.getItem('token');

    if(token){
        const data = parseJwt(token);

        // We check if user is caducado
        const now = Date.now() / 1000;
        if(now > data.exp){
            LogoutUser();
            return undefined;
        }

        return data;
    }
    return undefined;
}

function IsAdmin(){
    const user = GetUser();
    if(user){
        return user.admin;
    }
}

function LoadUser(){
    const token = localStorage.getItem('token');
    if(token) UserStatus.value = 1;
}

function LogoutUser(){
    localStorage.removeItem("token");
    UserStatus.value = 0;
}

export {
    UserStatus,
    GetUser,
    SetUser,
    LoadUser,
    IsAdmin,
    LogoutUser,
    HasAdmin,
    GetUserSetting,
    SetUserSetting
}