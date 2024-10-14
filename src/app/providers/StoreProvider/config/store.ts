import { ReducersMapObject, configureStore } from '@reduxjs/toolkit';
import { counterReducer } from 'entities/Counter';
import { loginReducer } from 'features/AuthByUserName';
// раннее в webpack.config для story book в строке config.resolve.modules.unshift(paths.src) использовался метод push и с ним сторибук
// выкидывал ошибку так как абсолютные импорты не работали для некоторых файлов в том числе для импорта ниже и сторибук начинал искать
// эти файлы по пути node__modules/entity что бы исправить эту ошибку нужно было либо прописать относительные например import { userReducer } from '../../../../entities/User'
// либо исправить push на unshift (что и сделано)
import { userReducer } from 'entities/User';
import { StateSchema } from './StateSchema';

const rootReducers: ReducersMapObject<StateSchema> = {
    counter: counterReducer,
    user: userReducer,
    loginForm: loginReducer,
};

export function createReduxStore(initialState: StateSchema) {
    return configureStore<StateSchema>({
        reducer: rootReducers,
        devTools: __IS_DEV__,
        preloadedState: initialState,
    });
}
