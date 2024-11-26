import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { ReducersMapObject } from '@reduxjs/toolkit';
// import { useNavigate } from 'react-router-dom';
import { createReduxStore } from '../config/store';
import { StateSchema } from '../config/StateSchema';

interface StoreProviderProps {
    children: ReactNode;
    initialState?: DeepPartial<StateSchema>;
    // добавляем необязательный пропс asyncReducer он нужен для работы storybook
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
}

export const StoreProvider = (props: StoreProviderProps) => {
    const { children, initialState, asyncReducers } = props;

    // следующая строка была большой ошибкой этого проекта
    // const navigate = useNavigate();

    const store = createReduxStore(
        initialState as StateSchema,
        asyncReducers as ReducersMapObject<StateSchema>,
        // navigate,
    );

    console.log('render');

    return <Provider store={store}>{children}</Provider>;
};
