<script setup>
import { ref } from 'vue';

import useEmitter from '@/services/Emitter';

const emitter = useEmitter();

const text = ref("");
const toast = ref(null);

emitter.on('toast', data => {
    text.value = data.text;

    toast.value.classList.add(data.color);
    toast.value.classList.add("show");
    setTimeout(() => {
        toast.value.classList.add("sliding");
        setTimeout(() => {
            toast.value.style = {};
            toast.value.classList.remove("show");
            toast.value.classList.remove("sliding");
            toast.value.classList.remove(data.color);
        }, 400);
    }, data.duration);
});

</script>


<template>
    <div class="toast" ref="toast">
        <div class="toast-container">{{ text }}</div>
    </div>
</template>


<style scoped lang="scss">
.toast-container {
    height: 100%;
    background-color: var(--color-background-soft);
    padding: 10px;
    margin-left: 5px;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    transform: translate(2px,0px)
}

.toast {
    position: absolute;
    display: none;

    top: 10px;
    left: 50%;
    transform: translate(-50%, 0);

    min-width: 400px;
    min-height: 40px;
    border-radius: 6px;
    text-align: center;


    animation: slide-in 0.4s ease-in-out;
    @keyframes slide-in {
        0% {
            transform: translate(-50%,-50px);
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    &.sliding {
        @keyframes slide-out {
            0% {
                opacity: 1;
            }
            100% {
                transform: translate(-50%,-50px);
                opacity: 0;
            }
        }
        animation: slide-out .4s ease-in-out forwards;
    }
    
    &.show {
        display: block;
    }

    /* Colors!!!! */

    &.red {
        background-color: rgb(243, 68, 68);
    }

    &.green {
        background-color: rgb(92, 199, 92);
    }

    &.aqua {
        background-color: rgb(113, 250, 250);
    }
}
</style>