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


// get user tickets
export const getTickets = createAsyncThunk(
    'tickets/getAll',
    //thunkAPI can get the state from other slices. in this case, we get the jwt from the auth slice in line 21.
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await ticketService.getTickets(token);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            //return the error message as a rejected promise to be used in the rejected case of createTicket
            return thunkAPI.rejectWithValue(message);
        }
    });

// get user ticket
export const getTicket = createAsyncThunk(
    'tickets/get',
    //thunkAPI can get the state from other slices. in this case, we get the jwt from the auth slice in line 21.
    async (ticketId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await ticketService.getTicket(ticketId, token);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            //return the error message as a rejected promise to be used in the rejected case of createTicket
            return thunkAPI.rejectWithValue(message);
        }
    });

// close ticket
export const closeTicket = createAsyncThunk(
    'tickets/close',
    //thunkAPI can get the state from other slices. in this case, we get the jwt from the auth slice in line 21.
    async (ticketId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await ticketService.closeTicket(ticketId, token);
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
            //create ticket
            //if the promise is pending, isLoading is set to true
            .addCase(createTicket.pending, (state) => {
                state.isLoading = true;
            })
            //if the promise is fulfilled, isLoading is set to false and isSuccess is set to true
            .addCase(createTicket.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            //if the promise is rejected, isLoading is set to false, isError is set to true, and message is set to the payload
            .addCase(createTicket.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            //get tickets
            //if the promise is pending, isLoading is set to true
            .addCase(getTickets.pending, (state) => {
                state.isLoading = true;
            })
            //if the promise is fulfilled, isLoading is set to false, isSuccess is set to true, and tickets is set to the payload
            .addCase(getTickets.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.tickets = action.payload;
            })
            //if the promise is rejected, isLoading is set to false, isError is set to true, and message is set to the payload
            .addCase(getTickets.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            //get ticket
            //if the promise is pending, isLoading is set to true
            .addCase(getTicket.pending, (state) => {
                state.isLoading = true;
            })
            //if the promise is fulfilled, isLoading is set to false, isSuccess is set to true, and tickets is set to the payload
            .addCase(getTicket.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.ticket = action.payload;
            })
            // if the promise is fullfilled and the ticket is closed, the ticket is removed from the tickets array
            .addCase(closeTicket.fulfilled, (state, action) => {
                state.isLoading = false;
                state.tickets.map((ticket) => ticket._id === action.payload._id ? (ticket.status = 'Closed') : ticket);

            });



    }

});
//export the action reducers
export const { reset } = ticketSlice.actions;
//export the reducer
export default ticketSlice.reducer;