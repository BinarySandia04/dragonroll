<script setup>
import { onMounted, ref, shallowRef } from 'vue';
import { SetupHandle, SetSize, ResetPosition } from '@/services/Windows';
import Api from '@/services/Api'

import IconButton from '@/views/partials/game/IconButton.vue'

import WindowHandle from '@/views/partials/WindowHandle.vue';
import ConceptList from '../../partials/ConceptList.vue';
import { backendUrl } from '../../../services/BackendURL';

const handle = ref(null);

const props = defineProps(['data']);
const data = props.data;

let id = data.id;

const elements = shallowRef([]);

onMounted(() => {
    SetupHandle(id, handle);
    SetSize(id, {width: 500, height: 380});
    ResetPosition(id, "center");

    Api().get('/admin/users').then(response => {
        let users = response.data.users;
        elements.value = [];
        users.forEach(user => {
            elements.value.push({
                name: user.username,
                _id: user._id,
                info: {
                    name: user.username
                }
            })
        });
    }).catch((err) => console.log(err));
});

async function ElementIcon(element){
    let response = await Api().get('/user/retrieve-avatar?username=' + element.name);
    if(response.data.image) return backendUrl + "public/" + response.data.image;
}
</script>


<template>
    <div class="window-wrapper" :id="'window-wrapper-' + id">
        <WindowHandle :window="id" ref="handle"></WindowHandle>

        <!-- Body -->
        <ConceptList 
            :elements="elements"
            :icon="ElementIcon"
        ></ConceptList>

        <div class="fixed-bottom-buttons">
            <IconButton icon="/icons/iconoir/regular/plus.svg" :action="OpenCreateItemPrompt"></IconButton>
        </div>
    </div>
</template>


<style scoped>
.window-wrapper {
    display: flex;
    align-items: center;
}

.fixed-bottom-buttons {
    position: absolute;
    bottom: 10px;
    right: 10px;
    z-index: 2;
    display: flex;
}
</style>


