import { useMemo }  from 'react';

interface AbstractService<T> {
    getInstance(): T;
}

export function useInstance<T>(Cl: AbstractService<T>): T {
	return useMemo(() => Cl.getInstance(), [ Cl ]);
}
