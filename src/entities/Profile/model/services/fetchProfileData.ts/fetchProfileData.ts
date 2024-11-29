import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Profile } from '../../types/profile';

export const fetchProfileData = createAsyncThunk<Profile, string, ThunkConfig<string>>(
    'profile/fetchProfileData',
    async (profileId, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;
        try {
<<<<<<< HEAD:src/entities/Profile/model/services/fetchProfileData.ts/fetchProfileDate.ts
            // throw new Error('asdf ');
            const response = await extra.api.get<Profile>('/profile');
=======
            const response = await extra.api.get<Profile>(`/profile/${profileId}`);
>>>>>>> fromFouryOneLesson:src/entities/Profile/model/services/fetchProfileData.ts/fetchProfileData.ts

            if (!response.data) {
                throw new Error();
            }
            return response.data;
        } catch (error) {
            return rejectWithValue('error');
        }
    },
);
