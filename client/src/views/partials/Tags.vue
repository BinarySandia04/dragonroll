<script setup>
import { onMounted, ref, toRaw, watch } from 'vue';
import IconButton from './game/IconButton.vue';
import { HideContextMenu, ShowContextMenu } from '../../services/ContextMenu';
const props = defineProps(['items', 'done']);
const items = ref(props.items);
const done = props.done;
const selected = ref([]);
let selectedTags = ref([]);

const itemDict = {}

function lower(text) {
    return text.replace(/\s+/g, '-').toLowerCase();
}

for(let i = 0; i < props.items.length; i++) itemDict[lower(items.value[i])] = i;

function CallDone(){
    done(toRaw(selectedTags.value));
}

function SelectTab(tag){
    if(!selectedTags.value.includes(tag)) selectedTags.value.push(tag);
    CallDone();
}

function RemoveTag(tag){
    selectedTags.value = selectedTags.value.filter((item) => item !== tag);
    CallDone();
}

function OpenDropdown(){
    let context = [];
    items.value.forEach(name => {
        context.push({
            icon: selectedTags.value.includes(name) ? 'icons/iconoir/regular/check.svg' : false,
            name,
            action: () => {
                HideContextMenu();
                if(!selectedTags.value.includes(name)){
                    SelectTab(name);
                } else { RemoveTag(name) }
            }
        });
    });
    ShowContextMenu(context);
}

onMounted(() => {
    watch(selected, () => {
        selectedTags.value = selected.value;
    });
})

defineExpose({
    selected,
});
</script>

<template>
    <div class="tags-container">
        <div class="tag" v-for="tag in selectedTags" :key="tag">
            <span>{{ tag }}</span>
            <img class="close-tag" src="/icons/iconoir/regular/xmark.svg" v-on:click.prevent="RemoveTag(tag)">
        </div>
        <IconButton class="small-icon" icon="/icons/iconoir/regular/plus.svg" :action="OpenDropdown"></IconButton>
    </div>
</template>

<style scoped lang="scss">
.tags-container {
    display: flex;
    flex-wrap: wrap;
    padding-left: 4px;
    padding-right: 4px;
}

.small-icon {
    height: 24px;
    width: 24px;
    float: left;
    transform: translateY(2px);
}
.tag {
    width: auto;
    float: left;
    line-height: 20px;
    padding: 2px;
    border-radius: 4px;
    margin: 4px 2px 0 2px;
    display: flex;
    align-items: center;
    background-color: #303030;

    .close-tag {
        width: 20px;
        height: 20px;
        filter: invert(0.9);
    }
}
</style>