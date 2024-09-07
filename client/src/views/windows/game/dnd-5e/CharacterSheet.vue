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
        <WindowHandle :window="id" ref="handle" handleHeight="105px" custom="true" class="character-sheet-handle"></WindowHandle>
        <div class="header-info">
            <div class="header-left-info">
                <span class="header-char-name">Thrak Thor</span>
                <span class="header-class-info">Lv. 1 Rogue</span>
            </div>
            <div class="header-right-info">
                <div class="header-xp-bar-container">
                    <span class="xp-text">33 <span class="gray">/</span> 300 XP</span>
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
                <div class="flex-container border">
                    <!--<img class="player-sheet-splash" src="img/monke.jpg">-->
                    <img class="player-sheet-splash" src="img/dracblau.png">
                    <div class="player-info-div">

                        <div class="ac-container">
                            <span class="attr-bonus">15</span>
                        </div>

                        <div class="death-rolls">
                            <div class="success-rolls">
                                <input class="checkbox-radio-green" type="checkbox" name="deathsave_success1">
                                <input class="checkbox-radio-green" type="checkbox" name="deathsave_success2">
                                <input class="checkbox-radio-green" type="checkbox" name="deathsave_success3">
                            </div>
                            <div class="failed-rolls">
                                <input class="checkbox-radio-red" type="checkbox" name="deathsave_fail1">
                                <input class="checkbox-radio-red" type="checkbox" name="deathsave_fail2">
                                <input class="checkbox-radio-red" type="checkbox" name="deathsave_fail3">
                            </div>
                        </div>
                        <span class="player-info-div">Hit Points</span>
                        <div class="health-bar">
                            <div class="health-bar-value-content"></div>
                            <div class="health-bar-tmp-content"></div>
                            <div class="health-bar-content">80 <span class="gray">/</span> 80</div>
                        </div>
                        <span class="player-info-div">Hit Dice</span>
                        <div class="dice-bar">
                            <div class="dice-bar-value-content"></div>
                            <div class="dice-bar-content">80 <span class="gray">/</span> 80</div>
                        </div>
                        <div class="extra-stats-div">
                            <div class="extra-stat-container">
                                <span>Initiative</span>
                                <div class="extra-stat">+2</div>
                            </div>
                            <div class="extra-stat-container">
                                <span>Walk speed</span>
                                <div class="extra-stat">30ft</div>
                            </div>
                            <div class="extra-stat-container">
                                <span>Proficency</span>
                                <div class="extra-stat">+2</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex-container">
                    <div class="saving-throws">
                        <span class="span-header">Saving Throws</span>
                        <div class="saving-throws-container">
                            <div class="saving-throw">
                                <input type="checkbox" name="str-saving">
                                <span class="saving-throw-class">STR</span>
                                <span class="saving-throw-modifier">+1</span>
                            </div>
                            <div class="saving-throw">
                                <input type="checkbox" name="str-saving">
                                <span class="saving-throw-class">DEX</span>
                                <span class="saving-throw-modifier">+5</span>
                            </div>
                            <div class="saving-throw">
                                <input type="checkbox" name="str-saving">
                                <span class="saving-throw-class">CON</span>
                                <span class="saving-throw-modifier">+2</span>
                            </div>
                            <div class="saving-throw">
                                <input type="checkbox" name="str-saving">
                                <span class="saving-throw-class">INT</span>
                                <span class="saving-throw-modifier">+3</span>
                            </div>
                            <div class="saving-throw">
                                <input type="checkbox" name="str-saving">
                                <span class="saving-throw-class">WIS</span>
                                <span class="saving-throw-modifier">-1</span>
                            </div>
                            <div class="saving-throw">
                                <input type="checkbox" name="str-saving">
                                <span class="saving-throw-class">CHA</span>
                                <span class="saving-throw-modifier">+1</span>
                            </div>
                        </div>
                    </div>
                    <div class="skill-throws">
                        <span class="span-header">Skills</span>
                        <div class="skill-throws-container">
                            <div class="skill-throw">
                                <input type="checkbox" name="str-saving">
                                <span class="skill-throw-class">Acrobatics (Dex)</span>
                                <span class="skill-throw-modifier">+1</span>
                            </div>
                            <div class="skill-throw">
                                <input type="checkbox" name="str-saving">
                                <span class="skill-throw-class">Animal Handling (Wis)</span>
                                <span class="skill-throw-modifier">+5</span>
                            </div>
                            <div class="skill-throw">
                                <input type="checkbox" name="str-saving">
                                <span class="skill-throw-class">Arcana (Int)</span>
                                <span class="skill-throw-modifier">+2</span>
                            </div>
                            <div class="skill-throw">
                                <input type="checkbox" name="str-saving">
                                <span class="skill-throw-class">Athletics (Str)</span>
                                <span class="skill-throw-modifier">+3</span>
                            </div>
                            <div class="skill-throw">
                                <input type="checkbox" name="str-saving">
                                <span class="skill-throw-class">Deception (Cha)</span>
                                <span class="skill-throw-modifier">-1</span>
                            </div>
                            <div class="skill-throw">
                                <input type="checkbox" name="str-saving">
                                <span class="skill-throw-class">History (Int)</span>
                                <span class="skill-throw-modifier">+1</span>
                            </div>
                            <div class="skill-throw">
                                <input type="checkbox" name="str-saving">
                                <span class="skill-throw-class">Insight (Wis)</span>
                                <span class="skill-throw-modifier">+1</span>
                            </div>
                            <div class="skill-throw">
                                <input type="checkbox" name="str-saving">
                                <span class="skill-throw-class">Intimidation (Cha)</span>
                                <span class="skill-throw-modifier">+1</span>
                            </div>
                            <div class="skill-throw">
                                <input type="checkbox" name="str-saving">
                                <span class="skill-throw-class">Investigation (Int)</span>
                                <span class="skill-throw-modifier">+1</span>
                            </div>
                            <div class="skill-throw">
                                <input type="checkbox" name="str-saving">
                                <span class="skill-throw-class">Medicine (Wis)</span>
                                <span class="skill-throw-modifier">+1</span>
                            </div>
                            <div class="skill-throw">
                                <input type="checkbox" name="str-saving">
                                <span class="skill-throw-class">Nature (Int)</span>
                                <span class="skill-throw-modifier">+1</span>
                            </div>
                            <div class="skill-throw">
                                <input type="checkbox" name="str-saving">
                                <span class="skill-throw-class">Perception (Wis)</span>
                                <span class="skill-throw-modifier">+1</span>
                            </div>
                            <div class="skill-throw">
                                <input type="checkbox" name="str-saving">
                                <span class="skill-throw-class">Performance (Cha)</span>
                                <span class="skill-throw-modifier">+1</span>
                            </div>
                            <div class="skill-throw">
                                <input type="checkbox" name="str-saving">
                                <span class="skill-throw-class">Persuasion (Cha)</span>
                                <span class="skill-throw-modifier">+1</span>
                            </div>
                            <div class="skill-throw">
                                <input type="checkbox" name="str-saving">
                                <span class="skill-throw-class">Religion (Int)</span>
                                <span class="skill-throw-modifier">+1</span>
                            </div>
                            <div class="skill-throw">
                                <input type="checkbox" name="str-saving">
                                <span class="skill-throw-class">Sleight of Hand (Dex)</span>
                                <span class="skill-throw-modifier">+1</span>
                            </div>
                            <div class="skill-throw">
                                <input type="checkbox" name="str-saving">
                                <span class="skill-throw-class">Stealth (Dex)</span>
                                <span class="skill-throw-modifier">+1</span>
                            </div>
                            <div class="skill-throw">
                                <input type="checkbox" name="str-saving">
                                <span class="skill-throw-class">Survival (Wis)</span>
                                <span class="skill-throw-modifier">+1</span>
                            </div>
                        </div>
                    </div>
                </div>
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
.skill-throws-container {
    display: flex;
    flex-direction: column;

    .skill-throw {
        margin-top: -2px;
        line-height: 28px;
        padding: 0px 5px 0 5px;

        justify-content: center;
        display: flex;
        width: 100%;

        .skill-throw-class {
            margin-right: auto;
        }

        .skill-throw-modifier {
            margin-left: auto;
            font-weight: bold;
        }
    }
}

.skill-throws {
    margin-top: 15px;
}

.saving-throws, .skill-throws {
    display: flex;
    flex-direction: column;
    background-color: #1B1B1B;
    padding: 10px;
    border: 1px solid var(--color-border);

    .saving-throws-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr;

        .saving-throw {
            margin-top: -1px;
            line-height: 24px;
            padding: 0px 5px 0 5px;

            justify-content: center;
            display: flex;
            width: 100%;

            .saving-throw-class {
                margin-right: auto;
            }

            .saving-throw-modifier {
                margin-left: auto;
                font-weight: bold;
            }
        }
    }
}

input[type="checkbox"] { 
    box-sizing: border-box;
    width: 12px;
    height: 12px;
    margin: 6px;
    padding: 0;
    border: 2px solid #DED4D6aa;
    appearance: none;
    background-color: transparent;
    border-radius: 20px;
    outline: none;
    transition: outline 0.1s;

    &:checked {
        background-color: white;
    }
}

.span-header {
    text-align: left;
    font-family: ScalySansSmallCapsRemake;
    font-weight: bold;
    margin-left: 9px;
}

.extra-stats-div {
    display: flex;
    margin-bottom: 15px;
    margin-left: 15px;
    margin-right: 15px;

    .extra-stat-container {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        align-items: center;

        &:nth-child(2){
            margin-top: 20px;
        }

        .extra-stat {
            -webkit-clip-path: polygon(25% 0, 75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%);
            clip-path: polygon(25% 0, 75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%);
            background: #DED4D6;
            height: 35px;
            width: 90px;
            color: black;
            line-height: 35px;
            font-size: 18px;
            font-weight: bold;
        }
    }
}

span.player-info-div {
    text-align: left;
    font-family: ScalySansSmallCapsRemake;
    font-weight: bold;
    margin-left: 9px;
}

.dice-bar {
    background-color: #181818;
    height: 30px;
    margin: 7px;
    border: 1px solid var(--color-golden-border);
    position: relative;
    margin-top: 0px;

    .dice-bar-value-content {
        position: absolute;
        height: 28px;
        width: 100%;
        background: linear-gradient(90deg, #411E24, #721B2A)
    }

    .dice-bar-content {
        position: absolute;
        height: 28px;

        line-height: 30px;
        font-size: 18px;
        margin-left: 12px;
        font-weight: bold;
    }
}

.health-bar {
    background-color: #181818;
    height: 40px;
    margin: 7px;
    border: 1px solid var(--color-golden-border);
    position: relative;
    margin-top: 0px;

    .health-bar-value-content {
        position: absolute;
        height: 38px;
        width: 100%;
        background: linear-gradient(90deg, #1C4F2A, #39A05A)
    }

    .health-bar-tmp-content {
        position: absolute;
        height: 38px;
        background: linear-gradient(90deg, #306977, #49d3d3)
    }

    .health-bar-content {
        position: absolute;
        height: 38px;

        line-height: 40px;
        font-size: 24px;
        margin-left: 12px;
        font-weight: bold;
    }
}

div.player-info-div {
    margin-top: 5px;
    display: flex;
    flex-direction: column;
    position: relative;
}

.death-rolls {
    display: flex;
    width: 300px;

    input[type="checkbox"] { 
        box-sizing: border-box;
        width: 20px;
        height: 20px;
        margin: 6px;
        padding: 0;
        border: 2px solid #DED4D6aa;
        appearance: none;
        background-color: transparent;
        border-radius: 20px;
        outline: none;
        transition: outline 0.1s;
    }

    .success-rolls {
        margin-right: auto;
        margin-left: 20px;
    }

    .failed-rolls {
        margin-right: 20px;
        margin-left: auto;
    }

    .success-rolls input[type="checkbox"]:checked {
        background-color: var(--c-button-green-hover);
    }

    .failed-rolls input[type="checkbox"]:checked {
        background-color: var(--c-button-red-hover);

    }

    .checkbox-radio-red {
        background-color: red;
    }
}

.ac-container {
    width: 70px;
    height: 70px;
    background-image: url('icons/other/noun-shield.svg');
    background-size: cover;
    background-repeat: no-repeat;

    color: black;
    position: absolute;
    left: calc(50% - 35px);
    top: -30px;
    filter: drop-shadow(0px 5px 2px rgba(0, 0, 0, 0.8));

    .attr-bonus {
        color: #1B1A18;
        font-weight: bold;
        position: relative;
        top: 15px;
        font-size: 24px;
    }
}

.player-sheet-splash {
    width: 100%;
    object-fit: cover;
    max-height: 400px;
    border: 1px solid var(--color-golden-border);
    padding: 5px;
    box-sizing: border-box; 
}

.two-column-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    flex-direction: row;
    margin-top: 50px;
    margin-left: 20px;
    margin-right: 20px;

    .flex-container {
        &.border {
            border: 1px solid var(--color-border);
            background-color: #1b1b1b;
        }
        margin: auto;
        width: 300px;
        display: flex;
        flex-direction: column;
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
    margin-top: -103px; /* Adjust to fixed height header */
    display: flex;
    background: linear-gradient(90deg, #731A2B, #49131d);
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
    }
}



.window-wrapper {
    display: flex;
    align-items: center;
    border: solid 1px var(--color-golden-border);

    user-select: none;
}

span.gray {
    color: gray;
}

</style>
