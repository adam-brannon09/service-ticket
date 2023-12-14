import { useState, useEffect } from 'react'
//useSelector is used to get the user from the redux store(global state)
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createTicket, reset } from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

function NewTicket() {
    // gets the user from the redux store
    const { user } = useSelector((state) => state.auth)
    const { isLoading, isSuccess, isError, message } = useSelector(state => state.ticket)
    const [name] = useState(user.name)
    const [email] = useState(user.email)
    const [product, setProduct] = useState('')
    const [description, setDescription] = useState('')

    //initialize useDispatch hook
    const dispatch = useDispatch()
    //initialize useNavigate hook
    const navigate = useNavigate()

    useEffect(() => {
        // if there is an error, show error message
        if (isError) {
            toast.error(message)
        }
        // if there is success, show success message and navigate to tickets page
        if (isSuccess) {
            toast.success("Ticket created successfully")
            navigate('/tickets')
        }
        // reset state
        dispatch(reset())
        //add dependencies to useEffect
    }, [isError, isSuccess, message, dispatch, navigate])


    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(createTicket({ product, description }))
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <BackButton url='/' />
            <section className="heading">
                <h1>Create New Ticket</h1>
                <p>Please fill out the form below</p>
            </section>

            <section className="form">
                <div className="form-group">
                    <label htmlFor="name">Customer Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        disabled
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Customer Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        disabled
                    />
                </div>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="product">Product</label>
                        <select
                            name='product'
                            id='product'
                            value={product}
                            onChange={(e) => setProduct(e.target.value)}
                        >
                            <option value="">Select Product</option>
                            <option value="iPhone">iPhone</option>
                            <option value="Macbook Pro">Macbook Pro</option>
                            <option value="iMac">iMac</option>
                            <option value="iPad">iPad</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description of Issue</label>
                        <textarea
                            name='description'
                            id='description'
                            className="form-control"
                            value={description}
                            placeholder='Please describe your issue here'
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block">
                            Submit Ticket
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
}
export default NewTicket