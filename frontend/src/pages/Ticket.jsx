import { useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { getTicket, reset, closeTicket } from "../features/tickets/ticketSlice";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";


function Ticket() {
    //useSelector is a hook that gives us access to the state in the redux store
    const { ticket, isLoading, isSuccess, isError, message } = useSelector((state) => state.tickets)
    const { name, email } = useSelector((state) => state.auth.user)

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


    if (isLoading) {
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
            {ticket.status !== 'Closed' && (
                <button className="btn btn-block btn-danger" onClick={onTicketClose}>Close Ticket</button>
            )}
        </div>
    )
}
export default Ticket