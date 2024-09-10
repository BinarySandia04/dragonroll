<script setup>
import { onMounted, watch, ref } from 'vue';
import { GetContentRef, SetupTooltip } from '../../services/Tooltip';

let contentRef = ref("");

onMounted(() => {
    SetupTooltip();
    let content = GetContentRef();

    watch(GetContentRef(), () => {
        contentRef.value = GetContentRef().value;
    })
});

</script>

<template>
<div id="mouse-tooltip" class="mouse-tooltip">
    <div class="document">
        <span v-html="contentRef"></span>
    </div>
</div>
</template>

<style scoped lang="scss">
.mouse-tooltip {
    display: none;
    position: absolute;
    z-index: 214748364;

    background-color: var(--tooltip-background);
    padding: 3px 6px 3px 6px;

  -webkit-box-shadow: 0px 0px 5px -2px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 5px -2px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 5px -2px rgba(0,0,0,0.75);

    border: solid 1px var(--color-border);
}
</style>