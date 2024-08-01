import { ref } from 'vue';

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
    LogoutUser
}