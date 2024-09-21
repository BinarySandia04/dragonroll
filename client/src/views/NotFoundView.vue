<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
    <h1 class="_blog-title">Error 404!</h1>
    <p>La pàgina a la qual has entrat o has introduït, per alguna raó no existeix. Ara mateix tens dues opcions:</p>
    <ul>
      <li>Tornar al inici de la meva gran i preciosa pàgina web</li>
      <li><s>Tancar aquesta finestra</s> quedarte aqui</li>
    </ul>
    <br>
    <p>Jo, personalment, tiraria per la primera opció ja que la segona és bastant avorrida</p>
    <RouterLink to="/">
      <div class="sidebar-link">
          <span class="link-text">Tornar a inici</span>
      </div>
    </RouterLink>
</template>


<style>
</style>
