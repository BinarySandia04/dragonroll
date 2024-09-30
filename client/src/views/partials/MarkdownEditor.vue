<script setup>
import { onMounted, ref, watch } from 'vue';
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

const props = defineProps(['done', 'editable']);
import FixedBottomButtons from './FixedBottomButtons.vue';

const editing = ref(false);
const isEditable = ref(true);

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

function UpdateEditable(val){
    if(val) {
        isEditable.value = true;
    } else {
        isEditable.value = false;
        editing.value = false;
    }
}

onMounted(() => {
    watch(text, () => {
        editor.value.value = text.value;
        preview.value.innerHTML = marked.parse(editor.value.value);
    });

    UpdateEditable(props.editable);
    watch(() => props.editable, () => {
        UpdateEditable(props.editable);
    })

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
            <div class="document" ref="preview">
            </div>
            <FixedBottomButtons v-show="isEditable" :edit="EditContent"></FixedBottomButtons>
        </div>
        <div v-show="editing" class="editor">
            <textarea class="editing" ref="editor"></textarea>
            <FixedBottomButtons v-show="isEditable" :view="PreviewContent"></FixedBottomButtons>
        </div>
    </div>
</div>
</template>

<style scoped>
.editing, .editor, .editor-content {
    width: 100%;
    height: 100%;
}

.document, .preview {
    width: 100%;
    max-width: 100%;
    height: 100%;
    max-height: 100%;
    overflow-y: auto;
    overflow-x: auto;
}

.document {
    padding: 10px;
    max-width: fit-content;
    position: absolute;
}

.editor-content {
    display: flex;
    width: 100%;
}

.editing {
    resize: none;
    background-color: var(--color-background);
}

.markdown-editor {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: var(--color-background);
}
</style>