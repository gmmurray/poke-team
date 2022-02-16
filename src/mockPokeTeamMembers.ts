import { IPokeTeamMember } from './types/PokeTeamMember';

export const emptyTeam: IPokeTeamMember[] = [];

export const notFullTeam: IPokeTeamMember[] = [
    {
        name: 'pikachu',
        order: 0,
        types: ['lightning'],
    },
    {
        name: 'raichu',
        order: 1,
        types: ['lightning'],
    },
];

export const fullTeam: IPokeTeamMember[] = [
    {
        name: 'pikachu',
        order: 0,
        types: ['lightning'],
    },
    {
        name: 'raichu',
        order: 1,
        types: ['lightning'],
    },
    {
        name: 'magikarp',
        order: 2,
        types: ['water'],
    },
    {
        name: 'gyrados',
        order: 3,
        types: ['water'],
    },
    {
        name: 'charmander',
        order: 4,
        types: ['fire'],
    },
    {
        name: 'charizard',
        order: 5,
        types: ['fire'],
    },
];
