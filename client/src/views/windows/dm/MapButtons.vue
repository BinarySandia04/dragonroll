<script setup>
import WindowHandle from '@/views/partials/WindowHandle.vue';

import { onMounted, onUpdated, ref } from 'vue';
import { SetupHandle, SetSize, SetPosition, ResetPosition } from '@/services/Windows';
import IconButton from '@/views/partials/game/IconButton.vue'
import { ImportDD2VTT } from '../../../services/Map';
import { CreateChildWindow, GetPosition } from '../../../services/Windows';

const props = defineProps(['data']);
const data = props.data;

const handle = ref(null);
const mapUploader = ref(null);

let id = data.id;

onMounted(() => {
    SetupHandle(id, handle);
    SetSize(id, {x: 40, y: 500});
    ResetPosition(id, {x: 10, y: 200});

    mapUploader.value.addEventListener('change', (event) => {
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.addEventListener('load', (event) => {
            ImportDD2VTT(JSON.parse(event.target.result));
        });

        reader.readAsText(file);
    })
});

function UploadButton(){
    mapUploader.value.click();
}

function EditEnvironment(){
    let winPos = GetPosition(id);
    CreateChildWindow(id, 'environment', {x: winPos.x + 50, y: winPos.y});
}

</script>


<template>
    <form id="send-map-form" enctype="multipart/form-data">
        <input name="file" type="file" accept=".dd2vtt" ref="mapUploader">
    </form>


    <div class="window-wrapper" :id="'window-wrapper-' + id">
        <WindowHandle :window="id" ref="handle"></WindowHandle>
        
        <div class="vertical-button">
            <IconButton icon="icons/iconoir/regular/upload.svg" :action="UploadButton"></IconButton>
            <hr>
            <IconButton icon="icons/iconoir/regular/square-3d-three-points.svg" :action="UploadButton"></IconButton>
            <IconButton icon="icons/iconoir/regular/orthogonal-view.svg" :action="UploadButton"></IconButton>
            <hr>
            <IconButton icon="icons/iconoir/regular/sun-light.svg" :action="EditEnvironment"></IconButton>
        </div>
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

.vertical-button {
    position: absolute;
    top: 26px;
    left: 2px;
    display: flex;
    flex-direction: column;
    z-index: 1;

    user-select: none;

    &.gm {
        left: 48px;
    }

    hr::before {
        width: 0px;
        height: 0px;
    }

    hr {
        margin-left: auto;
        margin-right: auto;
        width: 30px;
        margin-top: 1px;
        margin-bottom: 1px;
        background-color: var(--separator-color);
    }
}
</style>
