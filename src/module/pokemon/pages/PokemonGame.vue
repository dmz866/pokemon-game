<script lang="ts" setup>
import { usePokemonGame } from '../composables/usePokemonGame';

const asd = usePokemonGame();
</script>
<template>
    <section v-if="false" class="w-screen h-screen flex flex-col justify-center items-center">
        <h1>Espere por favor</h1>
        <h3 class="animate-pulse">Cargando...</h3>
    </section>
    <section  class="w-screen h-screen flex flex-col justify-center items-center">

    </section>
</template>