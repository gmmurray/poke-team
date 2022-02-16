import { IPokeTeamMember } from '../types/PokeTeamMember';
import { teamLocalStorageKey } from '../constants/localStorageKeys';

export const getTeamLocalStorage = (): IPokeTeamMember[] | null => {
    const raw = window.localStorage.getItem(teamLocalStorageKey);

    if (raw === null) {
        return null;
    }

    return JSON.parse(raw) as IPokeTeamMember[];
};
export const setTeamLocalStorage = (team: IPokeTeamMember[] | null) => {
    if (team === null) {
        window.localStorage.removeItem(teamLocalStorageKey);
    } else {
        window.localStorage.setItem(teamLocalStorageKey, JSON.stringify(team));
    }
};
