<script setup>
import WindowHandle from '@/views/partials/WindowHandle.vue';

import { onMounted, ref } from 'vue';
import { SetupHandle, SetSize, ResetPosition } from '@/services/Windows';
import { CreateWindow } from '../../../../services/Windows';
import IconSelector from '../../../partials/IconSelector.vue';
import { AddContextMenu, HideContextMenu, ShowContextMenu } from '../../../../services/ContextMenu';
const props = defineProps(['data']);
const data = props.data;

const handle = ref(null);
const item_type = ref("");

const rarity = ref(null);
const weaponType = ref(null);

let id = data.id;

onMounted(() => {
    SetupHandle(id, handle);
    SetSize(id, {width: 500, height: 400});
    ResetPosition(id, "center");

    item_type.value = data.item_type;

    const rarities = [
        {name: "⠀",
            action: () => { rarity.value.innerHTML = ""; HideContextMenu(); }
        },
        {name: "<span class='common'>Common</span>",
            action: () => { rarity.value.innerHTML = "<span class='important common'>Common</span>"; HideContextMenu(); }
        },
        {name: "<span class='uncommon'>Uncommon</span>",
        action: () => { rarity.value.innerHTML = "<span class='important uncommon'>Uncommon</span>"; HideContextMenu(); }
        },
        {name: "<span class='rare'>Rare</span>",
        action: () => { rarity.value.innerHTML = "<span class='important rare'>Rare</span>"; HideContextMenu(); }
        },
        {name: "<span class='very-rare'>Very rare</span>",
        action: () => { rarity.value.innerHTML = "<span class='important very-rare'>Very rare</span>"; HideContextMenu(); }
        },
        {name: "<span class='legendary'>Legendary</span>",
        action: () => { rarity.value.innerHTML = "<span class='important legendary'>Legendary</span>"; HideContextMenu(); }
        },
        {name: "<span class='artifact'>Artifact</span>",
        action: () => { rarity.value.innerHTML = "<span class='important artifact'>Artifact</span>"; HideContextMenu(); }
        }
    ]

    const weapon_types = [
        {name: "⠀",
            action: () => { weaponType.value.innerHTML = ""; HideContextMenu(); }
        },
        {name: "Melee",
            action: () => { weaponType.value.innerHTML = "<span class='important'>Melee</span>"; HideContextMenu(); }
        },
        {name: "Ranged",
            action: () => { weaponType.value.innerHTML = "<span class='important'>Ranged</span>"; HideContextMenu(); }
        },
        {name: "Martial Melee",
            action: () => { weaponType.value.innerHTML = "<span class='important'>Martial Melee</span>"; HideContextMenu(); }
        },
        {name: "Martial Ranged",
            action: () => { weaponType.value.innerHTML = "<span class='important'>Martial Ranged</span>"; HideContextMenu(); }
        },
        {name: "Natural",
            action: () => { weaponType.value.innerHTML = "<span class='important'>Natural</span>"; HideContextMenu(); }
        },
        {name: "Improvised",
            action: () => { weaponType.value.innerHTML = "<span class='important'>Improvised</span>"; HideContextMenu(); }
        },
        {name: "Siege Weapon",
            action: () => { weaponType.value.innerHTML = "<span class='important'>Siege Weapon</span>"; HideContextMenu(); }
        }
    ]

    rarity.value.addEventListener("click", () => {
        ShowContextMenu(rarities)
    });
    AddContextMenu(rarity.value, rarities)

    weaponType.value.addEventListener("click", () => {
        ShowContextMenu(weapon_types)
    });
    AddContextMenu(weaponType.value, weapon_types)

    weaponType.value.addEventListener("click", () => {

    });
});

</script>


<template>
    <div class="window-wrapper" :id="'window-wrapper-' + id">
        <WindowHandle :window="id" ref="handle"></WindowHandle>
        
        <div class="main-container">
            <div class="item-header">
                <IconSelector :window="id"></IconSelector>
                <div class="header-info">
                    <h1 contenteditable="true" spellcheck="false">New Item</h1>
                    <div class="row">
                        <div class="grow subsection" ref="weaponType"></div>
                        <div class="grow subsection" ref="rarity"></div>
                        <!--
                        <option value="none"><span></span></option>
                            <option value="common"><span class="common">Common</span></option>
                            <option value="uncommon"><span class="uncommon">Uncommon</span></option>
                            <option value="rare"><span class="rare">Rare</span></option>
                            <option value="very rare"><span class="very-rare">Very Rare</span></option>
                            <option value="legendary"><span class="legendary">Legendary</span></option>
                            <option value="artifact"><span class="artifact">Artifact</span></option>-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped lang="scss">
@mixin shadow {
  -moz-box-shadow: 0px 0px 10px -1px rgba(0,0,0,0.25);
  box-shadow: 0px 0px 10px -1px rgba(0,0,0,0.25);
}

@mixin panel {
    @include shadow();
    background-color: #1B1B1B;
    border: 1px solid var(--color-border);
}


.item-header {
    display: flex;
    width: 100%;
    height: 88px;
    padding: 10px;
    background-color: #1d1d1d;

    .book-info {
        margin-left: 20px;
    }

    .header-info {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        
        h1 {
            margin-left: 12px;
            font-family: NodestoCapsCondensed;
            font-weight: lighter;
            font-size: 32px;
            line-height: 32px;
            text-align: left;
        }
    }
}

.row {
    width: 100%;
}

.grow {
    flex-grow: 1;
}

.window-wrapper {
    display: flex;
    align-items: center;

    user-select: none;
}

.subsection {
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:first-child {
        border-right: 1px solid var(--color-border);
    }
}

</style>
