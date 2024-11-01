<script setup>
import { ref } from 'vue';
const props = defineProps(['rows']);

const rowDict = {}
for(let i = 0; i < props.rows.length; i++) rowDict[props.rows[i].id] = i;
let selectedTab = ref(props.rows[0].id);

function SelectTab(row){
    selectedTab.value = row;
}
</script>


<template>
    <div class="tab-container">
        <div class="row">
            <div class="toggler" :class="{ selected: row.id == selectedTab }" v-for="row in rows" v-on:click.prevent="SelectTab(row.id)">
                {{ $t(row.value) }}
            </div>
        </div>
        <div class="tab-container-outer">
            <div v-for="row in rows" class="tab-content">
                <TransitionGroup name="tab">
                    <div class="tab-content-inner" v-show="row.id == selectedTab" :key="row.id">
                        <slot :name="row.id" />
                    </div>
                </TransitionGroup>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.toggler.selected {
    color: var(--color-text);
    background-color: var(--color-background-softer);
}
</style>

<style scoped lang="scss">
.tab-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
}

.tab-container-outer {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    pointer-events: none;
}

.tab-enter-active,
.tab-leave-active {
  transition: all 0.15s ease;
}
.tab-enter-from,
.tab-leave-to {
  opacity: 0;
  transform: translateY(15px);
}

.tab-content {
    width: 100%;
    height: 100%;
    position: absolute;
    overflow-y: auto;
}

.tab-content-inner {
    width: 100%;
    height: 100%;
    pointer-events: auto;
}

.toggler {
    flex-grow: 1;
    flex-basis: 0;
    font-weight: bold;
    padding: 3px 12px 3px 12px;
    font-size: 16px;

    color: #9c9c9c;
    border-left: 1px solid var(--color-border);
    border-bottom: 1px solid var(--color-border);
    border-top: 1px solid var(--color-border);
    transition: color 0.2s, background-color 0.2s;
    
    &:first-child {
        border-left: none;
    }

    &.active {
        color: var(--color-text);
    }
}
</style>