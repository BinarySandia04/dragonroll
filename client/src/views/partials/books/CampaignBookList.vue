<script setup>
import { onMounted, onUpdated, ref } from 'vue';
import { SetupHandle, SetSize, SetPosition, ResetPosition } from '@/services/Windows';

import BookItem from './BookItem.vue';

/*
const props = defineProps(['campaign']);
const players = GetPlayerList();
*/

const props = defineProps(['books']);
const books = props.books;

onMounted(() => {
});


</script>


<template>
    <div class="book-list">
        <BookItem v-for="book in books" :key="book._id" :book="book"></BookItem>
    </div>
</template>


<style scoped lang="scss">
.book-list {
    background-color: var(--color-background);
}
</style>