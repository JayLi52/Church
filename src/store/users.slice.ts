import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProfile } from '@/types';

interface UsersState {
    list: UserProfile[];
    loading: boolean;
    error: string | null;
}

const initialState: UsersState = {
    list: [],
    loading: false,
    error: null,
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<UserProfile[]>) => {
            state.list = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

export const { setUsers, setLoading, setError } = usersSlice.actions;
export default usersSlice.reducer; 