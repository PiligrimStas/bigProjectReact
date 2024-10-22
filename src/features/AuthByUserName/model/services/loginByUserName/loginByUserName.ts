import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig, ThunkExtraArg } from 'app/providers/StoreProvider/config/StateSchema';
import { User } from 'entities/User';
import { userActions } from 'entities/User/model/slice/userSlice';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

interface LoginByUserName {
    username: string;
    password: string;
}

export const loginByUserName = createAsyncThunk<User, LoginByUserName, ThunkConfig<string>>(
    'loginForm/loginByUserName',
    async (authData, thunkApi) => {
        const { extra, dispatch, rejectWithValue } = thunkApi;
        try {
            const response = await extra.api.post<User>('/login', authData);
            if (!response.data) {
                throw new Error();
            }
            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
            dispatch(userActions.setAuthData(response.data));
            return response.data;
        } catch (error) {
            return rejectWithValue('error');
        }
    },
);
