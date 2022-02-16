import debounce from 'lodash.debounce';
import { useMemo } from 'react';

export const useDebouncedSearch = (
    handler: (params: any) => any,
    timeout: number = 500,
) => useMemo(() => debounce(handler, timeout), [handler, timeout]);
