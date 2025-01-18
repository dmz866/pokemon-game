import { GameStatus } from "@/module/common/enums";
import type { Pokemon, PokemonListResponse } from "@/module/common/interfaces";
import confetti from 'canvas-confetti';
import { computed, onMounted, ref } from "vue";
import { pokemonApi } from "../api/pokemonApi";

export const usePokemonGame = () => {
    const gameStatus = ref<GameStatus>(GameStatus.Playing);
    const pokemons = ref<Pokemon[]>([]);
    const pokemonOptions = ref<Pokemon[]>([]);
    const randomPokemon = computed(() => pokemonOptions.value[Math.floor(Math.random() * pokemonOptions.value.length)]);
    const isLoading = computed(() => pokemons.value.length === 0);
    const getPokemons = async () => {
        const response = await pokemonApi.get<PokemonListResponse>('/?limit=151');
        const pokemonsArray = response.data.results.map((p) => {
            const urlParts = p.url.split('/');

            return {
                id: urlParts.at(-2) ?? 0,
                name: p.name
            } as Pokemon;
        });

        return pokemonsArray.sort(() => Math.random() - 0.5);
    };
    const getNextOptions = (total: number = 4) => {
        gameStatus.value = GameStatus.Playing;
        pokemonOptions.value = pokemons.value.slice(0, total);
        pokemons.value = pokemons.value.slice(total);
    };
    const checkAnswer = (id: number) => {
        const hasWon = randomPokemon.value.id === id;

        if (hasWon) {
            gameStatus.value = GameStatus.Won;
            confetti({
                particleCount: 300,
                spread: 150,
                origin: { y: 0.6 },
            });
            return;
        }

        gameStatus.value = GameStatus.Lost;
    };

    onMounted(async () => {
        pokemons.value = await getPokemons();
        getNextOptions();
    });

    return {
        gameStatus,
        isLoading,
        pokemonOptions,
        randomPokemon,

        getPokemons,
        getNextOptions,
        checkAnswer,
    };
};