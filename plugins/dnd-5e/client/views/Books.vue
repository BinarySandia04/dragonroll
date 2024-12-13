<script setup>
import WindowHandle from '@/views/partials/WindowHandle.vue';

import { onMounted, ref, shallowRef } from 'vue';
import { ResetPosition, SetMinSize, SetResizable, SetSize, SetupHandle } from '@/services/Windows';
import ConceptList from '@/views/partials/ConceptList.vue';
import { Global } from '@/services/PluginGlobals';

const handle = ref(null);

const props = defineProps(['data']);
const data = props.data;

const Api = Global('dnd-5e').Api;
const PluginData = Global('dnd-5e').Data;
let dndModule = Global('dnd-5e').DndModule;

let id = data.id;

const books = shallowRef([]);

onMounted(() => {
    SetupHandle(id, handle);
    SetSize(id, {width: 400, height: 600});
    ResetPosition(id, "center");
    SetResizable(id, true);
    SetMinSize(id, {width: 400, height: 300});

    // Fetch book list
    FetchBookList();
});

function FetchBookList(){
    dndModule.getDatagen().then(response => {
        books.value = response.data.datagens;
    });
}

function OpenBook(element){
    dndModule.getDatagenData(element.id).then(response => {
        Api.createWindow(PluginData.windows.database, {
            title: element.name,
            id: 'book-items-window-' + element.id,
            elements: response.data.elements,
            transformer: (element) => element.data,
            topper: {
                icon: "/plugins/" + element.package + "/" + element.icon,
                title: element.name,
                description: element.desc
            },
            static: true, // Makes read only mode from elements!
            getConcepts: () => response.data.elements,
            close: () => Api.clearWindow('book-items-window-' + element.id),
            back: () => { 
                Api.createWindow(PluginData.windows.booksWindow, {
                    title: "Books",
                    id: PluginData.windows.booksWindow,
                    close: () => Api.clearWindow(PluginData.windows.booksWindow)
                });
                Api.clearWindow('book-items-window-' + element.id);
            }
        });
        Api.clearWindow(data.id);
    });
    
}

function BookIcon(element){
    console.log(element);
    return "/plugins/" + element.package + "/" + element.icon;
}
</script>


<template>
    <div class="window-wrapper" :id="'window-wrapper-' + id">
        <WindowHandle :window="id" ref="handle"></WindowHandle>
        <div class="main-container">
            <ConceptList 
                :elements="books"
                :open="OpenBook"
                :icon="BookIcon"
                type="content-book"
                :validDrop="['content-book']"
            ></ConceptList>
        </div>
    </div>
</template>


<style scoped>
.main-container {
    height: calc(100% - 24px);
}

.fixed-bottom-buttons {
    position: absolute;
    bottom: 10px;
    right: 10px;
    z-index: 2;
    display: flex;
}

.window-wrapper {
    display: flex;
    align-items: center;

    user-select: none;
}
</style>
