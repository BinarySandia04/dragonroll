<script setup>
import WindowHandle from '@/views/partials/WindowHandle.vue';

import { onMounted, ref } from 'vue';
import { SetupHandle, SetSize, ResetPosition } from '@/services/Windows';
const props = defineProps(['data']);
const data = props.data;

const handle = ref(null);

let id = data.id;

onMounted(() => {
    SetupHandle(id, handle);
    SetSize(id, {x: 750, y: 850});
    ResetPosition(id, {x: window.innerWidth - 600, y: 60});
});

</script>


<template>
    <div class="window-wrapper" :id="'window-wrapper-' + id">
        <WindowHandle :window="id" ref="handle" handleHeight="105px" custom="true" color="#731A2B"></WindowHandle>
        <div class="header-info">
            <div class="header-left-info">
                <span class="header-char-name">Thrak Thor</span>
                <span class="header-class-info">Lv. 1 Rogue</span>
            </div>
            <div class="header-right-info">
                <div class="header-xp-bar-container">
                    <span class="xp-text">33 / 300 XP</span>
                    <div class="xp-progress-bar">
                        <div class="xp-progress-bar-content"></div>
                    </div>
                </div>
                <div class="header-xp-level">13</div>
            </div>
        </div>
    </div>
</template>


<style scoped lang="scss">
.header-info {
    height: 105px;
    pointer-events: none;
    width: 100%;
    margin-top: -105px; /* Adjust to fixed height header */
    display: flex;
}

.header-left-info {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    margin-right: auto;
    align-items: left;

    .header-char-name {
        font-family:NodestoCapsCondensed;
        font-size: 48px;    
    }

    .header-class-info {
        text-align: left;
        margin-top: -10px;
        font-weight: bold;
    }
}

.header-right-info {
    margin-left: auto;
    display: flex;
    align-items: center;

    .header-xp-bar-container {
        display: flex;
        flex-direction: column;
        align-items: left;

        margin-bottom: 20px;
        margin-right: 10px;

        .xp-progress-bar {
            height: 10px;
            width: 200px;
            background-color: #1B1A18;
            border-width: 2px;
            border-color: #AA9E89;
            border-style: solid;

            .xp-progress-bar-content {
                width:20px;
                height: 100%;
                background-color: #AA9E89;
            }
        }

        .xp-text {
            text-align: left;
            font-weight: bold;
        }
    }

    .header-xp-level {
        font-size: 32px;
        font-weight: bold;
        width: 70px;
        height: 70px;
        background-color: #1B1A18;
        line-height: 68px;
        border-radius: 35px;
        border-color: #AA9E89;
        border-width: 4px;
        border-style: solid;
        margin-right: 20px;

        font-family:'Courier New', Courier, monospace;
    }
}



.window-wrapper {
    display: flex;
    align-items: center;

    user-select: none;
}

</style>
