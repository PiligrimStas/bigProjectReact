import { Reducer } from '@reduxjs/toolkit';
import {
    ReduxStoreWithManager,
    StateSchemaKey,
} from 'app/providers/StoreProvider/config/StateSchema';
import { FC, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';

export type ReducerList = {
    [name in StateSchemaKey]?: Reducer;
};

// type ReducerLinstEntry = [StateSchemaKey, Reducer];

interface DynamicModuleLoaderProps {
    reducers: ReducerList;
    removeAfterUnmount?: boolean;
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
    const { children, reducers, removeAfterUnmount = true } = props;
    const store = useStore() as ReduxStoreWithManager;
    const dispatch = useDispatch();

    useEffect(() => {
        const mountedReducers = store.reducerManager.getMountedReducers();

        Object.entries(reducers).forEach(([name, reducer]) => {
            const mounted = mountedReducers[name as StateSchemaKey];

            if (!mounted) {
                // добавляем редюсер при монтировании только если его нет
                store.reducerManager.add(name as StateSchemaKey, reducer);
                // следующая строка нужно только для отслеживания в редакс девтулс
                dispatch({ type: `@INIT ${name} reducer` });
            }
        });

        // удаляем редюсер при размонтировании
        return () => {
            if (removeAfterUnmount) {
                Object.entries(reducers).forEach(([name, reducer]) => {
                    // добавляем редюсер при монтировании
                    store.reducerManager.remove(name as StateSchemaKey);
                    // следующая строка нужно только для отслеживания в редакс девтулс
                    dispatch({ type: `@DESTROY ${name} reducer` });
                    // удаляем редюсер при размонтировании
                });
            }
        };
        // eslint-disable-next-line
    }, []);

    return (
        <>
            {' '}
            {children}
            {' '}
        </>
    );
};
