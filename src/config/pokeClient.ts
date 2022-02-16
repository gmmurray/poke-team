import { PokemonClient } from 'pokenode-ts';

export const pokeClient = new PokemonClient({
    logOptions: {
        enabled: true,
        prettyPrint:
            process.env.NODE_ENV === 'development'
                ? {
                      levelFirst: true,
                      colorize: true,
                  }
                : undefined,
    },
    cacheOptions: { maxAge: 5000, exclude: { query: false } },
});
