import { ReducersMapObject, configureStore } from '@reduxjs/toolkit';
import { counterSlice } from 'entities/Counter/model/slice/counterSlice';
import { userReducer } from 'entities/User';
import { StateSchema } from './StateSchema';

const rootReducers: ReducersMapObject<StateSchema> = {
    counter: counterSlice.reducer,
    user: userReducer,
};

export function createReduxStore(initialState: StateSchema) {
    return configureStore<StateSchema>({
        reducer: rootReducers,
        devTools: __IS_DEV__,
        preloadedState: initialState,
    });
}
