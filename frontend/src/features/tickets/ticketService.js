import axios from 'axios';

// API URL
const API_URL = '/api/tickets/';


// Create new ticket
const createTicket = async (ticketData, token) => {
    //set the headers for the request
    //the token has to be passed in the headers for the backend to verify the user is logged in and authorized to create a ticket
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.post(API_URL, ticketData, config);
    return response.data;
};

// Get user tickets
const getTickets = async (token) => {
    //set the headers for the request
    //the token has to be passed in the headers for the backend to verify the user is logged in and authorized to create a ticket
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config);
    return response.data;
};

const getTicket = async (ticketId, token) => {
    //set the headers for the request
    //the token has to be passed in the headers for the backend to verify the user is logged in and authorized to create a ticket
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + ticketId, config);
    return response.data;
};


//export functions so they can be used in ticket slice
const ticketService = {
    createTicket,
    getTickets,
    getTicket

};
//export functions so they can be used in ticket slice
export default ticketService;