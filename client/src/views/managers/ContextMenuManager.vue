<script setup>
import { onMounted, watch, ref } from 'vue';
import { SetupContextMenu } from '../../services/ContextMenu';


onMounted(() => {
    SetupContextMenu();
});

</script>

<template>
<div id="context-menu" class="context-menu">
    <!--
    <div class="context-menu-element">
        <span>Hola</span> <img src="/icons/iconoir/regular/nav-arrow-right.svg">
    </div>
    <div class="context-menu-element">
        <span>Holaa</span>
    </div>
    <div class="context-menu-element">
        <span>Holaa</span>
    </div>
    <div class="context-menu-element">
        <span>Holaaaaaaa</span>
    </div>
    -->
</div>
</template>

<style lang="scss">
.context-menu {
    position: absolute;
    z-index: 214748363;

    flex-direction: column;

    
    .context-menu-element {

        &:last-child {
            border-width: 1px 1px 1px 1px;
        }
        border: solid 1px var(--color-border);
        border-width: 1px 1px 0px 1px;
        padding: 3px 5px 3px 5px;
        cursor: default;
        user-select: none;
        background-color: var(--tooltip-background);
        transition: background-color 100ms;
        display: flex;
        align-items: center;
        position: relative;

        span {
            flex-grow: 1;
            padding-right: 20px;
            white-space: nowrap;
        }

        img {
            filter: invert(1);
            width: 18px;
            height: 18px;
        }

        &:hover {
            background-color: var(--color-background-softest);
        }
    }
}
</style>