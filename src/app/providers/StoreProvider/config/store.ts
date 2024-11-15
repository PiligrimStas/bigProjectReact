import {
    CombinedState, Reducer, ReducersMapObject, configureStore,
} from '@reduxjs/toolkit';
import { counterReducer } from 'entities/Counter';
// раннее в webpack.config для story book в строке config.resolve.modules.unshift(paths.src) использовался метод push и с ним сторибук
// выкидывал ошибку так как абсолютные импорты не работали для некоторых файлов в том числе для импорта ниже и сторибук начинал искать
// эти файлы по пути node__modules/entity что бы исправить эту ошибку нужно было либо прописать относительные например import { userReducer } from '../../../../entities/User'
// либо исправить push на unshift (что и сделано)
import { userReducer } from 'entities/User';
import { NavigateOptions, To } from 'react-router-dom';
import { $api } from 'shared/api/api';
import { StateSchema, ThunkExtraArg } from './StateSchema';
import { createReducerManager } from './reducerManager';

export function createReduxStore(
    initialState: StateSchema,
    // добавляем asyncReducers это нужно для работы storybook
    asyncReducers?: ReducersMapObject<StateSchema>,
    navigate?: (to: To, options?: NavigateOptions) => void,
) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        counter: counterReducer,
        user: userReducer,

        // закоментироуум loginReducer так как теперь это асинхронные редюсрер
        // loginForm: loginReducer,
    };

    const reducerManager = createReducerManager(rootReducers);

    const extraArg: ThunkExtraArg = {
        api: $api,
        navigate,
    };

    const store = configureStore({
        reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({ thunk: { extraArgument: extraArg } }),
    });
    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
