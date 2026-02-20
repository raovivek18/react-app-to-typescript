import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';

export interface UserState {
    isAuthenticated: boolean;
    userInfo: User | null;
}

const initialState: UserState = {
    isAuthenticated: false,
    userInfo: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<User>) => {
            state.isAuthenticated = true;
            state.userInfo = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.userInfo = null;
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
