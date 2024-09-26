<script setup>
import WindowHandle from '@/views/partials/WindowHandle.vue';

import { onMounted, ref } from 'vue';
import { SetupHandle, SetSize, ResetPosition } from '@/services/Windows';
import { ClearWindow, CreateWindow } from '@/services/Windows';
const props = defineProps(['data']);
const data = props.data;

const handle = ref(null);
let id = data.id;

const radioContainer = ref(null);

onMounted(() => {
    SetupHandle(id, handle);
    SetSize(id, {width: 250, height: 320});
    ResetPosition(id, "center");
});

function ConfirmSelection(){
    let selected = radioContainer.value.querySelector('input[name="selector"]:checked');
    if(!selected) return;
    let value = selected.value;

    CreateWindow('item_sheet', {
        id: 'item_sheet',
        title: 'Edit Item',
        item_type: value,
        item_create: true,
        close: () => ClearWindow('item_sheet')
    });

    ClearWindow(id);
}

</script>


<template>
    <div class="window-wrapper" :id="'window-wrapper-' + id">
        <WindowHandle :window="id" ref="handle"></WindowHandle>
        
        <div class="main-container">
            <div class="radio-container" ref="radioContainer">
                <div class="radio-item">
                    <img class="icon" src="/icons/game-icons/000000/lorc/crossed-swords.svg">
                    <span>Weapon</span>
                    <input type="radio" name="selector" value="Weapon"> 
                </div>
                <div class="radio-item">
                    <img class="icon" src="/icons/game-icons/000000/delapouite/shoulder-armor.svg">
                    <span>Equipment</span>
                    <input type="radio" name="selector" value="Equipment">
                </div>
                
                <div class="radio-item">
                    <img class="icon" src="/icons/game-icons/000000/lorc/potion-ball.svg">
                    <span>Consumable</span>
                    <input type="radio" name="selector" value="Consumable">
                </div>
                
                <div class="radio-item">
                    <img class="icon" src="/icons/game-icons/000000/delapouite/backpack.svg">
                    <span>Container</span>
                    <input type="radio" name="selector" value="Container">
                </div>
                
                <div class="radio-item">
                    <img class="icon" src="/icons/game-icons/000000/lorc/claw-hammer.svg">
                    <span>Tool</span>
                    <input type="radio" name="selector" value="Tool">
                </div>
            </div>

            <button class="btn-primary sound-click submit" v-on:click.prevent="ConfirmSelection">
                <img class="text-icon invert" src="/icons/iconoir/regular/check.svg">
                Create new item
            </button>
        </div>
    </div>
</template>


<style scoped lang="scss">
@mixin shadow {
  -moz-box-shadow: 0px 0px 10px -1px rgba(0,0,0,0.25);
  box-shadow: 0px 0px 10px -1px rgba(0,0,0,0.25);
}

@mixin panel {
    @include shadow();
    background-color: #1B1B1B;
    border: 1px solid var(--color-border);
}

.info {
    text-align: left;
    font-size: 16px;
    width: 100%;
    padding: 10px 10px 10px 17px;
}

.window-wrapper {
    display: flex;
    align-items: center;

    user-select: none;
}

.radio-container {
    display: flex;
    flex-direction: column;
}

.radio-item {
    padding: 10px;
    display: flex;
    align-items: center;

    span {
        flex-grow: 1;
        text-align: left;
        font-size: 14px;
    }

    input[type="radio"]{
        width: 20px;
        height: 20px;
        margin-right: 12px;
    }

    .icon {
        width: 24px;
        height: 24px;
        margin-right: 10px;
    }

    border-bottom: 1px solid var(--color-border);
    transition: color 1s;
    
    &:first-child {
        border-top: 1px solid var(--color-border);
    }

    &.active {
        color: var(--color-text);
    }
}

.submit {
    margin: 10px;
}

</style>
