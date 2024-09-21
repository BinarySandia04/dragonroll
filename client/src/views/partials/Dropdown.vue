<script setup>
import { onMounted, ref } from 'vue';
import { AddContextMenu } from '../../services/ContextMenu';
const props = defineProps(['options', 'selected']);
const options = props.options;
const selected = props.selected;
const dropdown = ref(null);

onMounted(() => {
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

    AddContextMenu(dropdown.value);
});
</script>


<template>
    <div class="dropdown" ref="dropdown">
        <span>Hola</span>
    </div>
</template>

<style scoped lang="scss">
.dropdown {
    background-color: #181818;
    padding: 5px;
}
</style>