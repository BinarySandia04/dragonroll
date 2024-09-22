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
                selectCallback(name);
            }
        });
    });

    AddContextMenu(dropdown.value, context, {dropdown: true});
});
</script>


<template>
    <div class="dropdown" ref="dropdown">
        <span>{{ selected }}</span>
    </div>
</template>

<style scoped lang="scss">
.dropdown {
    background-color: #181818;
    padding: 5px;
}
</style>