<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n() 


import { onMounted, ref, shallowRef, toRaw } from 'vue';
import { SetupHandle, SetSize, ResetPosition } from '@/services/Windows';
import Server from '@/services/Server'

import WindowHandle from '@/views/partials/WindowHandle.vue';
import ConceptList from '@/views/partials/ConceptList.vue';
import { backendUrl } from '@/services/BackendURL';
import { ClearWindow, CreateChildWindow } from '@/services/Windows';
import FixedBottomButtons from '@/views/partials/FixedBottomButtons.vue';

const handle = ref(null);

const props = defineProps(['data']);
const data = props.data;

let id = data.id;

const elements = shallowRef([]);

onMounted(() => {
    SetupHandle(id, handle);
    SetSize(id, {width: 500, height: 380});
    ResetPosition(id, "center");

    RefreshUsers();
});

function RefreshUsers(){
    Server().get('/admin/users').then(response => {
        let users = response.data.users;
        elements.value = [];
        users.forEach(user => {
            if(user.setupCode){
                elements.value.push({
                    name: t('register-account.pending-account'),
                    _id: user._id,
                    info: {
                        name: t('register-account.pending-account')
                    },
                    user
                })
            } else elements.value.push({
                name: user.username,
                _id: user._id,
                info: {
                    name: user.username
                },
                user
            })
        });
    }).catch((err) => console.log(err));
}

async function ElementIcon(element){
    let response = await Server().get('/user/retrieve-avatar?username=' + element.name);
    if(response.data.image) return backendUrl + "public/" + response.data.image;
    return "public/img/def-avatar.jpg";
}

function OpenAccount(data){
    if(data.user.setupCode){
        CreateChildWindow(id, 'copy_pending_user_window', {
            code: data.user.setupCode,
            id: 'copy_pending_user_window',
            close: () => ClearWindow('copy_pending_user_window')
        });
    } else {
        CreateChildWindow(id, 'edit_profile', {
            user: toRaw(data.user),
            close: () => ClearWindow('edit_profile')
        });
    }
}

function OpenCreateAccount(){
    CreateChildWindow(id, 'register_user', {
        title: 'register-account.title',
        id: 'register_user',
        done: () => {
            RefreshUsers();
            ClearWindow('register_user');
        },
        close: () => ClearWindow('register_user')
    })
}
</script>


<template>
    <div class="window-wrapper" :id="'window-wrapper-' + id">
        <WindowHandle :window="id" ref="handle"></WindowHandle>

        <!-- Body -->
        <ConceptList 
            :elements="elements"
            :icon="ElementIcon"
            :open="OpenAccount"
        ></ConceptList>

        <FixedBottomButtons :plus="OpenCreateAccount"></FixedBottomButtons>
    </div>
</template>


<style scoped>
.window-wrapper {
    display: flex;
    align-items: center;
}
</style>


