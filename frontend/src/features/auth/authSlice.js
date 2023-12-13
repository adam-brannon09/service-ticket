import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define the initial state 
const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

    }
});

export default authSlice.reducer;