<script setup>
import { onMounted, ref, watch } from 'vue';
import { AddContextMenu, HideContextMenu } from '../../services/ContextMenu';
const props = defineProps(['options', 'onselect', 'selected']);
const options = props.options;
const selectCallback = props.onselect;
const initialSelect = props.selected;
const dropdown = ref(null);

const selected = ref(initialSelect);

onMounted(() => {
    let context = [];
    if(props.selected == undefined) selected.value = "undefined";
    watch(() => props.selected, () => {
        selected.value = props.selected;
    });
    options.forEach(name => {
        context.push({
            icon: selected.value == name ? 'icons/iconoir/regular/check.svg' : false,
            name,
            action: () => {
                HideContextMenu();
                selected.value = name;
                if(selectCallback) selectCallback(name);
            }
        });
    });

    AddContextMenu(dropdown.value, context, {dropdown: true});
});
</script>


<template>
    <div class="dropdown" ref="dropdown">
        <span>{{ selected }}</span>
        <img class="icon" src="/icons/iconoir/regular/nav-arrow-down.svg" draggable="false" ref="closeButton">
    </div>
</template>

<style scoped lang="scss">
.dropdown {
    flex-grow: 1;
    display: flex;

    background-color: var(--color-background-softer);
    border: none;
    padding: 4px 8px 4px 8px;
    margin: 0 6px 0px 6px;
    border-radius: 6px;
    color: var(--color-text);
    transition: 300ms background-color;
    border: solid 1px var(--color-border);

    .icon {
        margin-left: auto;
        justify-content: right;
    }
}
</style>