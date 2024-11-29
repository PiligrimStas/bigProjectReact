import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UISchema } from '../types/ScrollSaveSchema';

const initialState: UISchema = {
    scroll: {},
};

export const UISlice = createSlice({
    name: 'scroll',
    initialState,
    reducers: {
        setScrollPosition: (state, action: PayloadAction<{ path: string; position: number }>) => {
            state.scroll[action.payload.path] = action.payload.position;
        },
    },
});

export const { actions: uiActions, reducer: uiReducer } = UISlice;
