import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ticketService from './ticketService';

const initialState = {
    //tickets array for when theres multiple tickets
    tickets: [],
    //ticket object for when theres only one ticket
    ticket: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
};

// Create new ticket
export const createTicket = createAsyncThunk(
    'tickets/create',
    //thunkAPI can get the state from other slices. in this case, we get the jwt from the auth slice in line 21.
    async (ticketData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await ticketService.createTicket(ticketData, token);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            //return the error message as a rejected promise to be used in the rejected case of createTicket
            return thunkAPI.rejectWithValue(message);
        }
    });


export const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers: {
        // reset state after register
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTicket.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createTicket.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(createTicket.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });

    }

});
//export the action reducers
export const { reset } = ticketSlice.actions;
//export the reducer
export default ticketSlice.reducer;