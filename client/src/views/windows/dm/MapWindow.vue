<script setup>
import WindowHandle from '@/views/partials/WindowHandle.vue';

import { onMounted, onUpdated, ref, watch } from 'vue';
import { SetupHandle, SetSize, SetPosition, ResetPosition } from '@/services/Windows';
import { ImportDD2VTT } from '../../../services/Map';

import MapList from '../../partials/MapList.vue';
import IconButton from '@/views/partials/game/IconButton.vue';
import { SetMinSize, SetResizable, SetMaxSize } from '../../../services/Windows';

const props = defineProps(['data']);
const data = props.data;

const handle = ref(null);
const mapUploader = ref(null);

let id = data.id;

function UploadButton(){
    mapUploader.value.click();
}

function NewMapButton(){
    
}

onMounted(() => {
    SetupHandle(id, handle);
    SetSize(id, {width: 300, height: 600});
    SetResizable(id, true);
    SetMinSize(id, {width: 300, height: 300});
    SetMaxSize(id, {width: 300});
    ResetPosition(id, {x: 100, y: 10});

    mapUploader.value.addEventListener('change', (event) => {
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.addEventListener('load', (event) => {
            ImportDD2VTT(JSON.parse(event.target.result));
        });

        reader.readAsText(file);
    })
});
</script>


<template>

    <form id="send-map-form" enctype="multipart/form-data">
        <input name="file" type="file" accept=".dd2vtt" ref="mapUploader">
    </form>

    <div class="window-wrapper" :id="'window-wrapper-' + id">
        <WindowHandle :window="id" ref="handle"></WindowHandle>
        
        <div class="horizontal-button">
            <IconButton icon="/icons/iconoir/regular/upload.svg" :action="UploadButton"></IconButton>
            <IconButton icon="/icons/iconoir/regular/empty-page.svg" :action="NewMapButton"></IconButton>
        </div>

        <MapList></MapList>
    </div>
</template>


<style scoped>
#send-map-form {
    display: none;
}

.window-wrapper {
    display: flex;
    align-items: center;

    user-select: none;
}

.horizontal-button {
    margin-top: 5px;
    display: flex;
    flex-direction: row;
 
    user-select: none;
}
</style>
