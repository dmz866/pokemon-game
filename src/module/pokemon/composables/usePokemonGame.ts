import { GameStatus } from "@/module/common/enums";
import { onMounted, ref } from "vue";
import { pokemonApi } from "../api/pokemonApi";
import type { PokemonListResponse } from "@/module/common/interfaces";

export const usePokemonGame = () => {
    const gameStatus = ref<GameStatus>(GameStatus.Playing);
    const getPokemons = () => {
        const response = pokemonApi.get<PokemonListResponse>('/?limit=151')
    };

    onMounted(() => {
        getPokemons();
    });

    return {
        gameStatus,
        getPokemons
    };
};