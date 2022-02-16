import { Pokemon } from 'pokenode-ts';

export interface IPokeTeamMember {
    name: string;
    order: number;
    types: string[];
}

export class PokeTeamMember implements IPokeTeamMember {
    public name: string;
    public order: number;
    public types: string[];
    constructor(pokemon: Pokemon, order: number) {
        this.name = pokemon.name;
        this.order = order;
        this.types = pokemon.types.map(t => t.type.name);
    }
}
