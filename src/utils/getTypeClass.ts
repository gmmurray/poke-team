import { PokemonType } from 'pokenode-ts';

export const getTypeClassFromPokemon = (types: PokemonType[]) => {
    return getTypeClass(types.map(t => t.type.name));
};

export const getTypeClass = (types: string[]) => {
    const sortedTypes = types.sort((a, b) => (a > b ? 1 : -1));
    if (sortedTypes.length === 1) {
        return `--${sortedTypes[0]}-${sortedTypes[0]}-type`;
    } else if (sortedTypes.length === 2) {
        return `--${sortedTypes[0]}-${sortedTypes[1]}-type`;
    } else {
        return '';
    }
};
