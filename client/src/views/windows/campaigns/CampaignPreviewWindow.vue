<script setup>
import { onMounted, onUpdated, ref } from 'vue';
import { SetupHandle, SetSize, SetPosition, ResetPosition } from '@/services/Windows';

import WindowHandle from '@/views/partials/WindowHandle.vue';
import PlayerList from '../../partials/PlayerList.vue';

const handle = ref(null);

const props = defineProps(['data']);
const data = props.data;

let id = data.id;
onMounted(() => {
    SetupHandle(id, handle);
    SetSize(id, {x: 1200, y: 750});
    ResetPosition(id, "center");
});
</script>


<template>
    <div class="window-wrapper" :id="'window-wrapper-' + id">
        <WindowHandle :window="id" ref="handle"></WindowHandle>

        <!-- Body 
         <h1>{{ data.campaign.name }}</h1> -->

         <div class="campaign-preview-container">
            <div class="campaign-preview-column left">
                <h2>Players</h2>
                <PlayerList :campaign="data.campaign"></PlayerList>
            </div>
            <div class="campaign-preview-column center">
            </div>
            <div class="campaign-preview-column right">
                <h2>Chat</h2>
            </div>
         </div>

    </div>
</template>


<style scoped lang="scss">
.campaign-preview-container {
    width: 100%;
    height: 100%;

    display: grid;
    grid-template-columns: 3fr 5fr 5fr;
}

.campaign-preview-column {
    display: flex;
    flex-direction: column;

    &.left {
        background-color: var(--color-background-soft);
    }

    &.center {
        background-color: var(--color-background-semisoft);
    }

    &.right {
        background-color: var(--chat-background);
    }
}

.window-wrapper {
    display: flex;
    user-select: none;
    align-items: center;
}

h1, h2 {
    font-family: MrEavesRemake;
}

</style>
