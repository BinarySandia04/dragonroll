<script setup>
import WindowHandle from '@/views/partials/WindowHandle.vue';

import { onMounted, ref } from 'vue';
import { SetupHandle, SetSize, ResetPosition } from '@/services/Windows';
const props = defineProps(['data']);
const data = props.data;

const handle = ref(null);
const bookmarks = ref(null);
const selectedBookmark = ref(0);

let id = data.id;

onMounted(() => {
    SetupHandle(id, handle);
    SetSize(id, {x: 700, y: 850});
    ResetPosition(id, {x: window.innerWidth - 600, y: 60});

    ConfigureBookmarks();
});

function ConfigureBookmarks(){
    let children = bookmarks.value.children;
    for(let i = 0; i < children.length; i++){
        children[i].addEventListener('click', () => {
            selectedBookmark.value = i;
            for(let p = 0; p < children.length; p++){
                children[p].classList.remove('active');
            }
            children[i].classList.add('active');
        })
    }
}
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

        <div class="bookmarks" ref="bookmarks">
            <div class="bookmark active">
                <img class="icon-no-filter" draggable="false" src="icons/game-icons/ffffff/lorc/cog.svg">
            </div>
            <div class="bookmark">
                <img class="icon-no-filter" draggable="false" src="icons/game-icons/ffffff/sbed/electric.svg">
            </div>
            <div class="bookmark">
                <img class="icon-no-filter" draggable="false" src="icons/game-icons/ffffff/delapouite/light-backpack.svg">
            </div>
            <div class="bookmark">
                <img class="icon-no-filter" draggable="false" src="icons/game-icons/ffffff/delapouite/skills.svg">
            </div>
            <div class="bookmark">
                <img class="icon-no-filter" draggable="false" src="icons/game-icons/ffffff/willdabeast/white-book.svg">
            </div>
        </div>

        <!-- Sheet content -->
        <div class="sheet-content" v-show="selectedBookmark == 0">
            <div class="header-attr">
                <div class="header-hex">
                    <span class="attr-name">STR</span>
                    <span class="attr-bonus">+1</span>
                    <span class="attr-score">13</span>
                </div>
                <div class="header-hex">
                    <span class="attr-name">DEX</span>
                    <span class="attr-bonus">+3</span>
                    <span class="attr-score">16</span>
                </div>
                <div class="header-hex">
                    <span class="attr-name">CON</span>
                    <span class="attr-bonus">+2</span>
                    <span class="attr-score">14</span>
                </div>
                <div class="header-hex">
                    <span class="attr-name">INT</span>
                    <span class="attr-bonus">+1</span>
                    <span class="attr-score">12</span>
                </div>
                <div class="header-hex">
                    <span class="attr-name">WIS</span>
                    <span class="attr-bonus">-1</span>
                    <span class="attr-score">8</span>
                </div>
                <div class="header-hex">
                    <span class="attr-name">CHA</span>
                    <span class="attr-bonus">+1</span>
                    <span class="attr-score">13</span>
                </div>
            </div>
            <div class="two-column-layout">
                <div class="flex-container">
                    
                </div>
                <div class="flex-container"></div>
            </div>
        </div>
        <div class="sheet-content" v-show="selectedBookmark == 1">
            Actions
        </div>
        <div class="sheet-content" v-show="selectedBookmark == 2">
            Inventory
        </div>
        <div class="sheet-content" v-show="selectedBookmark == 3">
            Traits
        </div>
        <div class="sheet-content" v-show="selectedBookmark == 4">
            Bio
        </div>
    </div>
</template>


<style scoped lang="scss">
.two-column-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    flex-direction: row;
    margin-top: 50px;
    margin-left: 20px;
    margin-right: 20px;

    .flex-container {
        margin: auto;
        width: 300px;
        display: flex;
        
    }
}

.sheet-content {
    width: 100%;
    height: calc(100% - 90px);
    overflow-y: auto;
}

.bookmarks {
    position: absolute;
    top: 120px;
    left: 700px;

    .bookmark {
        width: 50px;
        background-color: #181818;
        padding: 10px;
        margin-top: 10px;
        padding-bottom: 0px;
        padding-top: 9px;
        border: solid 1px #9e9e9e22;
        border-left-width: 0px;
        transition: width 0.3s, border-color 0.2s;

        &:hover {
            width: 70px;
        }

        &.active {
            width: 80px;
            border-color: var(--color-golden-border)
        }
    }
}


.header-attr {
    position: absolute;
    top: 70px;
    right: 100px;
    display: flex;
}

.header-hex {
    width: 70px;
    height: 70px;
    margin-right: 5px;
    background: #DED4D6;
    -webkit-clip-path: polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%);
    clip-path: polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%);

    display: flex;
    flex-direction: column;

    .attr-name {
        margin-top: 7px;
        color: #1B1A18;
        font-size: 10px;
    }

    .attr-bonus {
        color: #1B1A18;
        font-weight: bold;
        margin-top: -5px;
        font-size: 22px;
    }

    .attr-score {
        font-size: 12px;
        margin-top: -5px;
        color: #1B1A18;
    }
}

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
    border: solid 1px var(--color-golden-border);

    user-select: none;
}

</style>
