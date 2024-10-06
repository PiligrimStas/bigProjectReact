import { configureStore } from '@reduxjs/toolkit';
import { counterSlice } from 'entities/Counter/model/slice/counterSlice';
import { StateSchema } from './StateSchema';

export function createReduxStore(initialState: StateSchema) {
    return configureStore<StateSchema>({
        reducer: { counter: counterSlice.reducer },
        devTools: __IS_DEV__,
        preloadedState: initialState,
    });
}
