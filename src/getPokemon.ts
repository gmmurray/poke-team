import { pokeClient } from './config/pokeClient';

export const getPokemon = async (name: string) => {
    let result;
    try {
        result = await pokeClient.getPokemonByName(name);
    } catch (error) {
        result = null;
    }
    return result;
};
