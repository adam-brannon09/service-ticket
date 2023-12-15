import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import noteService from './noteService';

const initialState = {
    //notes array for when theres multiple notes
    notes: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
};

// get user ticket
export const getNotes = createAsyncThunk(
    'notes/getAll',
    //thunkAPI can get the state from other slices. in this case, we get the jwt from the auth slice in line 21.
    async (ticketId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await noteService.getNotes(ticketId, token);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            //return the error message as a rejected promise to be used in the rejected case of createTicket
            return thunkAPI.rejectWithValue(message);
        }
    });

export const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            //get all notes
            //if the promise is pending, isLoading is set to true
            .addCase(getNotes.pending, (state) => {
                state.isLoading = true;
            })
            //if the promise is fulfilled, isLoading is set to false, isSuccess is set to true, and tickets is set to the payload
            .addCase(getNotes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.notes = action.payload;
            })
            .addCase(getNotes.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
});

export const { reset } = noteSlice.actions;
export default noteSlice.reducer;