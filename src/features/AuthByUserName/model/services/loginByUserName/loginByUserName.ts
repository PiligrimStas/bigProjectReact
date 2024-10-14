import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from 'entities/User';
import { userActions } from 'entities/User/model/slice/userSlice';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

interface LoginByUserName {
    username: string;
    password: string;
}

export const loginByUserName = createAsyncThunk<User, LoginByUserName, { rejectValue: string }>(
    'loginForm/loginByUserName',
    async (authData, thunkApi) => {
        try {
            const response = await axios.post<User>('http://localhost:8000/login', authData);
            if (!response.data) {
                throw new Error();
            }
            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
            thunkApi.dispatch(userActions.setAuthData(response.data));
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue('error');
        }
    },
);
