<script setup>
import { onMounted, inject, watch, ref } from 'vue';

const isEditable = inject('editable')
const form = ref(null);

onMounted(() => {
      watch(isEditable, () => {
            console.log(isEditable.value);
            console.log(form.value);
            if(isEditable.value === false){
                  var allElements = form.value.getElementsByTagName("input");
                  for (var i = 0, l = allElements.length; i < l; ++i) {
                        allElements[i].disabled=true;
                  }
            }
      })
});
</script>

<template>
<div class="main-container" ref="form">
      <slot></slot>                  
</div>
</template>