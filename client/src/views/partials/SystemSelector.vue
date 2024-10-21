<script setup>
import { onMounted, onUpdated, provide, ref, watch } from 'vue';
import { SetupHandle, SetSize, SetPosition, ResetPosition } from '@/services/Windows';
import { ClearWindow, CreateChildWindow } from '../../services/Windows';
import { GetModule, GetModules } from '../../services/Modules';

const selectedSystem = ref("");
const selectedImage = ref(null);
const systemTitle = ref("")

const props = defineProps(['windowId']);
let windowId = props.windowId;

function DisplaySystemSelector(){
    CreateChildWindow(windowId, 'system_selector', {'done': (data) => {
        let module = GetModule(data.selected);
        console.log(module);
        selectedSystem.value = data.selected;
        selectedImage.value.src = `plugins/${module.id}/icon.png`;
        systemTitle.value = module.previewData.title;
        ClearWindow('system-selector');
    }});
}

defineExpose({ selectedSystem });
</script>


<template>
    <div class="system-selector" v-on:click="DisplaySystemSelector">
        <span v-show="selectedSystem == ''" class="none">{{ $t('systems.not-selected') }}</span>
        <div v-show="selectedSystem != ''" class="yes">
            <img ref="selectedImage" class="system-icon">
            {{ systemTitle }}
        </div>
    </div>
</template>


<style scoped lang="scss">

.system-selector {
    user-select: none;
    margin-top: 5px;
    margin-bottom: 5px;
    
    padding: 14px;
    font-size: 15px;
    border-radius: 6px;
    outline: none;
    border: none;

    transition: 300ms background-color;
    background-color: var(--color-background-softer);
    color: var(--color-text);
    cursor: pointer;
}
.none {
    color: var(--text-disabled)
}
.yes {
    display: flex;
    align-items: center;
    font-weight: bold;
}
.system-icon {
    width: 32px;
    margin-right: auto;
}
</style>