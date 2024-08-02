<script setup>
import ErrorMessage from '@/components/partials/ErrorMessage.vue'

import { ref } from 'vue';
import Api from '@/services/Api.js'
import { useRouter, RouterLink } from 'vue-router'

const email = ref("");
const name = ref("");
const username = ref("");
const password = ref("");
const confirmPassword = ref("");

const errorMessage = ref("");
const router = useRouter();

function register(){

    if(password.value != confirmPassword.value){
        errorMessage.value = "Les contrasenyes no coincideixen";
        return;
    }

    Api().post('/user/register', 
        {
            name: name.value,
            username: username.value,
            email: email.value,
            password: password.value,
        }).then((response) => {
        const data = response.data;

        if(data.error){
            errorMessage.value = data.msg;
        } else {
            errorMessage.value = "";
            conso
        }
    }).catch((error) => {
        console.log(error);
    });
}

</script>

<template>
    <h1 class="title">Registra't</h1>

    <ErrorMessage v-if="errorMessage">{{ errorMessage }}</ErrorMessage>

        <form v-on:submit.prevent="register">
            <div class="form-field">
                <label for="name">Nom i cognoms</label>
                <input id="name-field" type="text" placeholder="Aran Roig" name="name" v-model="name" autocomplete="off" >
            </div>
            <div class="form-field">
                <label for="email">Correu electrònic</label>
                <input id="email-field" type="email" placeholder="correu@electronic.net" name="email" v-model="email" autocomplete="off" >
            </div>
            
            <div class="form-field">
                <label for="username">Nom d'usuari</label>
                <input id="username-field" type="text" placeholder="Introdueix un nom d'usuari..." name="username" v-model="username" autocomplete="off" >
            </div>
            <div class="form-field">
                <label for="password">Contrasenya</label>
                <input id="password-field" type="password" placeholder="Introdueix una contrasenya..." name="password" v-model="password" autocomplete="off" >
            </div>
            <div class="form-field">
                <label for="confirm-password">Confirma la teva contrasenya</label>
                <input id="confirm-password-field" type="password" placeholder="Repeteix la contrasenya..." name="confirm-password" v-model="confirmPassword" autocomplete="off" >
            </div>
            <div class="form-field">
                <button class="btn-primary">Registrar</button>
            </div>
        </form>
        <p class="centered">Ja tens un compte? <RouterLink to="/login" class="underline">Inicia sessió</RouterLink></p>
</template>


<style scoped>

</style>
