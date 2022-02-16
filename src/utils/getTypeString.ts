export const getTypeString = (types: string[]): string => {
    if (types.length === 1) {
        return types[0];
    } else if (types.length === 2) {
        return `${types[0]} and ${types[1]}`;
    } else {
        return `${[...types.slice(0, types.length - 1)].join(', ')} and ${
            types[types.length - 1]
        }`;
    }
};
