<script setup>

import { onMounted, ref, getCurrentInstance, defineExpose } from 'vue';
import { ClearWindow, CreateChildWindow } from '../../services/Windows';

const image = ref(null);
const props = defineProps(['window']);

const uuid = getCurrentInstance().uid;
const icon = ref(null);

function SelectIcon(){
    CreateChildWindow(props.window, 'icon_selector', {
        id: 'icon-selector-' + uuid,
        done: (res) => {
            icon.value = res;
            console.log(res);
            image.value.src = res.selected.path;
            ClearWindow('icon-selector-' + uuid);
        },
        close: () => {
            ClearWindow('icon-selector-' + uuid);
        }
    })
}

defineExpose({
    icon
});

</script>


<template>
    <div class="icon-selector">
        <img ref="image" src="icons/sundries/books/book-red-exclamation.webp" v-on:click.prevent="SelectIcon">
    </div>
</template>


<style scoped lang="scss">
.icon-selector {
    img {
        border: 1px solid var(--color-border);
        width: 64px;
        height: 64px;
    }
}
</style>