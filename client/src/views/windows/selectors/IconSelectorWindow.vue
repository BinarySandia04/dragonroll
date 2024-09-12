<script setup>
import WindowHandle from '@/views/partials/WindowHandle.vue';

import { onMounted, ref } from 'vue';
import { SetMinSize, SetMaxSize, SetResizable, SetupHandle, SetSize, ResetPosition } from '@/services/Windows';
import { CallWindow } from '../../../services/Windows';
import { GetIcons } from '../../../services/Resources';
const props = defineProps(['data']);
const data = props.data;

const handle = ref(null);
const imgContainer = ref(null);

let id = data.id;

let selectedImageElement;
let selectedFile;

onMounted(() => {
    SetupHandle(id, handle);
    SetSize(id, {width: 310, height: 450});
    SetResizable(id, true);
    SetMinSize(id, {width: 310, height: 200});
    ResetPosition(id, "center");

    let images = GetIcons();
    let imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                var image = entry.target;
                image.src = image.dataset.src;
                // image.classList.remove("lazy");
                imageObserver.unobserve(image);
            }
        });
    });

    images.forEach(image => {
        let imgElement = document.createElement('img');
        imgElement.setAttribute('data-src', image.path);
        imgElement.setAttribute('draggable', 'false')
        imgElement.classList.add('icon-element');

        imgElement.addEventListener('click', (e) => {
            if(selectedImageElement) selectedImageElement.classList.remove('selected');
            selectedImageElement = imgElement;
            selectedFile = image;
            imgElement.classList.add('selected');
        });

        imageObserver.observe(imgElement);
        imgContainer.value.appendChild(imgElement);
    });

});

function ConfirmSelection(){
    CallWindow(id, 'done', {
        selected: selectedFile
    })
}
</script>


<template>
    <div class="window-wrapper" :id="'window-wrapper-' + id">
        <WindowHandle :window="id" ref="handle"></WindowHandle>
        
        <div class="content">
            <div class="images-container" ref="imgContainer">
                
            </div>

            <div class="footer">
                <button class="btn-primary sound-click" v-on:click.prevent="ConfirmSelection">Select</button>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
.icon-element {
    width: 50px;
    height: 50px;
    margin-bottom: -7px;
    margin-left: 1px;

    &.selected {
        border: 1px solid rgb(43, 188, 255);
    }
}
</style>

<style lang="scss" scoped>

.images-container {
    flex-grow: 1;
    overflow-y: auto;
}
.content {
    width: 100%;
    height: calc(100% - 24px);
    display: flex;
    flex-direction: column;
}

.footer {
    width: 100%;
}

.window-wrapper {
    display: flex;
    align-items: center;

    user-select: none;
}
</style>
