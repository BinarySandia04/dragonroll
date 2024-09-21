<script setup>
import { onMounted, ref, watch } from 'vue';
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

const props = defineProps(['done']);

import IconButton from '../partials/game/IconButton.vue';

const editing = ref(false);
const editor = ref(null);
const preview = ref(null);
const text = ref("");

function EditContent(){
    editing.value = true;
}

function PreviewContent(){
    editing.value = false;

    preview.value.innerHTML = marked.parse(editor.value.value);
}

onMounted(() => {
    watch(text, () => {
        editor.value.value = text.value;
        preview.value.innerHTML = marked.parse(editor.value.value);
    });

    editor.value.addEventListener("change", () => {
        props.done(editor.value.value);
    });

    editor.value.value = props.text ?? '';
    preview.value.innerHTML = marked.parse(editor.value.value);
})

defineExpose({
    text,
})
</script>

<template>
<div class="markdown-editor">
    <div class="editor-content">
        <div v-show="!editing" class="preview">
            <div class="document preview" ref="preview">
            </div>

            <div class="fixed-bottom-buttons">
                <IconButton icon="/icons/iconoir/regular/edit-pencil.svg" :action="EditContent"></IconButton>
            </div>
        </div>
        <div v-show="editing" class="editor">
            <textarea class="editing" ref="editor"></textarea>
            
            <div class="fixed-bottom-buttons">
                <IconButton icon="/icons/iconoir/solid/eye.svg" :action="PreviewContent"></IconButton>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped>
.editing, .editor, .editor-content {
    width: 100%;
    height: 100%;
}

.editing {
    background-color: var(--color-background);
}

.markdown-editor {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: var(--color-background);
}
.fixed-bottom-buttons {
    position: absolute;
    bottom: 10px;
    right: 10px;
    z-index: 2;
    display: flex;
}
.preview {
    padding: 8px 0 8px 8px;
    overflow-y: auto;
    height: 100%;
}
</style>