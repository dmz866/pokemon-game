<template>
    <section
      v-if="isLoading || randomPokemon.id === null"
      class="flex flex-col justify-center items-center w-screen h-screen"
    >
      <h1 class="text-3xl">Espere por favor</h1>
      <h3 class="animate-pulse">Cargando Pokémons</h3>
    </section>
  
    <section v-else class="flex flex-col justify-center items-center w-screen h-screen">
      <h1 class="m-5">¿Quién es este Pokémon?</h1>
  
      <div class="h-20">
        <button
          v-if="gameStatus !== GameStatus.Playing"          
          class="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 transition-all"
        >
          ¿Jugar de nuevo?
        </button>
      </div>

      <PokemonPicture
        :pokemon-id="randomPokemon.id"
        :show-pokemon="gameStatus !== GameStatus.Playing"
      />
      <PokemonOptions
        :options="options"
        :block-selection="gameStatus !== GameStatus.Playing"
        :correct-answer="randomPokemon.id"
        @selected-option="checkAnswer"
      />
    </section>
  </template>
  
  <script setup lang="ts">
  import { GameStatus } from '@common/enums/';
import PokemonOptions from '../components/PokemonOptions.vue';
import PokemonPicture from '../components/PokemonPicture.vue';
import { usePokemonGame } from '../composables/usePokemonGame';

  const {
    randomPokemon,
    isLoading,
    gameStatus,
    pokemonOptions: options,
    checkAnswer,
  } = usePokemonGame();
  </script>