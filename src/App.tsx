import { ChangeEvent, Fragment, useCallback, useEffect, useState } from 'react';
import { IPokeTeamMember, PokeTeamMember } from './types/PokeTeamMember';
import {
    getTeamLocalStorage,
    setTeamLocalStorage,
} from './utils/teamLocalStorage';

// @ts-ignore
import { Container } from 'react-grid';
import PokeTeam from './components/pokeTeam/PokeTeam';
// @ts-ignore
import { Pokemon, PokemonType, PokemonAbility, PokemonStat } from 'pokenode-ts';
import classNames from 'classnames';
import { getPokemon } from './getPokemon';
import { getTypeClassFromPokemon } from './utils/getTypeClass';
import { getTypeString } from './utils/getTypeString';
import { useDebouncedSearch } from './utils/useDebouncedSearch';
import PokeButton from './components/shared/PokeButton';

function App() {
    const [currentPokemonSearchInputValue, setCurrentPokemonSearchInputValue] =
        useState('');
    const [currentPokemonSearch, setCurrentPokemonSearch] = useState<
        string | null
    >(null);
    const [currentPokemonSearchLoading, setCurrentPokemonSearchLoading] =
        useState(false);
    const [currentPokemon, setCurrentPokemon] = useState<Pokemon | null>(null);

    const [showTeam, setShowTeam] = useState(true);
    const [team, setTeam] = useState<IPokeTeamMember[] | null>(null);

    const handleCurrentPokemonSearch = useCallback(
        value => setCurrentPokemonSearch(value === '' ? null : value),
        [],
    );

    const handleResetPokemonSearch = useCallback(() => {
        setCurrentPokemonSearchInputValue('');
        setCurrentPokemonSearch(null);
    }, []);

    const debouncedCurrentPokemonSearch = useDebouncedSearch(
        handleCurrentPokemonSearch,
    );

    const handleCurrentPokemonSearchInputValueChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const {
                target: { value },
            } = e;
            setCurrentPokemonSearchInputValue(value);
            debouncedCurrentPokemonSearch(value);
        },
        [debouncedCurrentPokemonSearch],
    );

    useEffect(() => {
        if (!currentPokemonSearch) {
            return setCurrentPokemon(null);
        }
        const get = async () => {
            setCurrentPokemonSearchLoading(true);
            const result = await getPokemon(currentPokemonSearch);
            setCurrentPokemon(result);
            setCurrentPokemonSearchLoading(false);
        };

        get();
    }, [currentPokemonSearch]);

    useEffect(() => {
        setTeam(getTeamLocalStorage());
    }, []);

    useEffect(() => {
        setTeamLocalStorage(team);
    }, [team]);

    const handleTeamUpdate = useCallback(
        (updatedTeam: PokeTeamMember[]) =>
            setTeam(updatedTeam.map((p, i) => ({ ...p, order: i }))),
        [],
    );

    const handleAddPokemon = useCallback(
        (pokemon: Pokemon) => () => {
            const updatedTeam = [
                ...(team ?? []),
                new PokeTeamMember(pokemon, (team ?? []).length),
            ];
            handleTeamUpdate(updatedTeam);
            handleResetPokemonSearch();
        },
        [handleResetPokemonSearch, handleTeamUpdate, team],
    );

    const handleRemovePokemon = useCallback(
        (order: number) => () => {
            if (!team || team.length === 0) {
                return;
            }
            const filtered = team.filter(p => p.order !== order);
            handleTeamUpdate(filtered);
        },
        [handleTeamUpdate, team],
    );

    const teamIsFull = !!team && team.length === 6;

    return (
        <Container>
            <h1>build the perfect pokemon team</h1>
            <hr />
            <PokeButton onClick={() => setShowTeam(state => !state)}>
                {showTeam ? 'hide team' : 'show team'}
            </PokeButton>
            <PokeTeam
                show={showTeam}
                team={team}
                isFull={teamIsFull}
                onRemove={handleRemovePokemon}
            />
            <h3>add a pokemon</h3>
            <input
                value={currentPokemonSearchInputValue}
                onChange={handleCurrentPokemonSearchInputValueChange}
                style={{ margin: '1rem 0' }}
            />
            <button onClick={handleResetPokemonSearch}>clear</button>
            {currentPokemonSearchLoading && <h4>loading...</h4>}
            {!currentPokemonSearchLoading &&
                !currentPokemonSearch &&
                !currentPokemon && <h4>search for a pokemon</h4>}
            {!currentPokemonSearchLoading &&
                !!currentPokemonSearch &&
                !currentPokemon && <h4>pokemon could not be found</h4>}
            {!currentPokemonSearchLoading && !!currentPokemon && (
                <div>
                    <div
                        className={classNames(
                            'poke-card',
                            'typed-border --card',
                            getTypeClassFromPokemon(currentPokemon.types),
                        )}
                    >
                        <h2>{currentPokemon.name}</h2>
                        {(team ?? []).some(
                            p => p.name === currentPokemon.name,
                        ) && <p>you already have this pokemon in your team</p>}
                        {currentPokemon.sprites.front_default && (
                            <img
                                src={currentPokemon.sprites.front_default}
                                alt={`${currentPokemon.name} sprite`}
                            />
                        )}
                        {currentPokemon.types &&
                            currentPokemon.types.length > 0 && (
                                <h5>
                                    {getTypeString(
                                        currentPokemon.types.map(
                                            (t: PokemonType) => t.type.name,
                                        ),
                                    )}{' '}
                                    type
                                </h5>
                            )}
                        {currentPokemon.abilities.length > 0 && (
                            <Fragment>
                                <h4>abilities</h4>
                                <ul>
                                    {currentPokemon.abilities.map(
                                        (a: PokemonAbility) => (
                                            <li key={a.ability.name}>
                                                {a.ability.name}
                                                {a.is_hidden ? ' (hidden)' : ''}
                                            </li>
                                        ),
                                    )}
                                </ul>
                            </Fragment>
                        )}
                        {currentPokemon.stats.length > 0 && (
                            <Fragment>
                                <h4>stats</h4>
                                <ul>
                                    {currentPokemon.stats.map(
                                        (s: PokemonStat) => (
                                            <li key={s.stat.name}>
                                                {s.stat.name}
                                                <ul>
                                                    <li>base: {s.base_stat}</li>
                                                    <li>effort: {s.effort}</li>
                                                </ul>
                                            </li>
                                        ),
                                    )}
                                </ul>
                            </Fragment>
                        )}
                    </div>
                    <button
                        onClick={handleAddPokemon(currentPokemon)}
                        disabled={teamIsFull}
                    >
                        add to team
                    </button>
                </div>
            )}
        </Container>
    );
}

export default App;
