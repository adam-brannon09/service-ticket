import { useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { getTicket, reset, closeTicket } from "../features/tickets/ticketSlice";
import { getNotes, reset as notesReset } from "../features/notes/noteSlice";
import { useParams, useNavigate } from "react-router-dom";
import NoteItem from "../components/NoteItem";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";


function Ticket() {
    //useSelector is a hook that gives us access to the state in the redux store
    const { ticket, isLoading, isSuccess, isError, message } = useSelector((state) => state.tickets)
    const { name, email } = useSelector((state) => state.auth.user)
    //isLoading: notesIsLoading is destructuring the isLoading property from the notes slice of state and renaming it to notesIsLoading since we already have a isLoading variable from the ticket slice of state
    const { notes, isLoading: notesIsLoading } = useSelector((state) => state.notes)

    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    //useParams is a hook that gives us access to the params in the url
    //in this case, we are getting the ticketId from the url
    const { ticketId } = useParams()

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        dispatch(getTicket(ticketId))
        dispatch(getNotes(ticketId))
    }, [isError, message, ticketId])


    //close ticket
    const onTicketClose = async () => {
        try {
            await dispatch(closeTicket(ticketId))
            toast.success('Ticket Closed')
            navigate('/tickets')
        } catch (error) {
            toast.error(error.message)
        }
    }

    //check if loading ticket information or notes information
    if (isLoading || notesIsLoading) {
        return <Spinner />
    }

    if (isError) {
        return <h3>Something Went Wrong!</h3>
    }

    return (
        <div className='ticket-page'>
            <header className='ticket-header'>
                <BackButton url='/tickets' />
                <h2>
                    Ticket ID: {ticket._id}
                    <span className={`status status-${ticket.status}`}>
                        {ticket.status}
                    </span>
                </h2>
                <h3>
                    Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
                </h3>
                <hr />
                <div className='ticket-desc'>
                    <h3>Product</h3>
                    <p>{ticket.product}</p>
                    <h3>Description of Issue</h3>
                    <p>{ticket.description}</p>
                    <h3>Customer</h3>
                    <p>Name: {name}</p>
                    <p>Email: {email}</p>
                </div>
            </header>
            {notes.map((note) => (
                <NoteItem key={note._id} note={note} />
            ))}
            {ticket.status !== 'Closed' && (
                <button className="btn btn-block btn-danger" onClick={onTicketClose}>Close Ticket</button>
            )}
        </div>
    )
}
export default Ticket