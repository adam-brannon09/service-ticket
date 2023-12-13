import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define the initial state 
const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// Define the thunk that handles the incoming API response
// Register User
export const register = createAsyncThunk(
    'auth/register',
    async (user, thunkAPI) => {
        console.log(user);
    }
);
// Define the thunk that handles the incoming API response
// Login User
export const login = createAsyncThunk(
    'auth/login',
    async (user, thunkAPI) => {
        console.log(user);
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

    }
});

export default authSlice.reducer;