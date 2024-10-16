<script setup>

import { onMounted, ref, getCurrentInstance } from 'vue';
import { ClearWindow, CreateChildWindow } from '../../services/Windows';

const image = ref(null);
const props = defineProps(['window', 'done']);

const uuid = getCurrentInstance().uid;
const icon = ref('icons/game-icons/ffffff/lorc/crossed-swords.svg');
const done = props.done;

function SelectIcon(){
    CreateChildWindow(props.window, 'icon_selector', {
        id: 'icon-selector-' + uuid,
        done: (res) => {
            icon.value = res.selected.path;
            done(res);
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
        <img ref="image" :src="icon" v-on:click.prevent="SelectIcon">
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