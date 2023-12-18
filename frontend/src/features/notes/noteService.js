import axios from "axios";

const API_URL = "/api/tickets/";

// get ticket notes
const getNotes = async (ticketId, token) => {
    //set the headers for the request
    //the token has to be passed in the headers for the backend to verify the user is logged in and authorized to create a ticket
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + ticketId + '/notes', config);
    return response.data;
};
// create ticket note
const createNote = async (noteText, ticketId, token) => {
    //set the headers for the request
    //the token has to be passed in the headers for the backend to verify the user is logged in and authorized to create a ticket
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL + ticketId + '/notes', { text: noteText }, config);
    return response.data;
};

const noteService = {
    getNotes,
    createNote
}
export default noteService;