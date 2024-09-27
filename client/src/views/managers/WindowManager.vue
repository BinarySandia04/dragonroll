<script setup>
import { TransitionGroup } from 'vue'
import { Windows, ReloadRef, WindowMap } from '@/services/Windows';

// Gestionem ventanas
const reload = ReloadRef();
const windows = Windows();

</script>

<template>
  <div class="window-container" :key="reload">
    <TransitionGroup name="window">
      <component v-for="win in windows" :is="WindowMap()[win.type]" :key="win.id" :data="win"></component>
    </TransitionGroup>
  </div>
</template>


<style>
.window-enter-active,
.window-leave-active {
  transition: all 0.15s ease;
}
.window-enter-from,
.window-leave-to {
  opacity: 0;
  transform: translateY(15px);
}

.window-wrapper {
    background-color: var(--window-background);

    /* backdrop-filter: blur(10px); */
    position: fixed;


    display: flex;
    flex-direction: column;
}

</style>
