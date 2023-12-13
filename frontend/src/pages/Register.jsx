import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { register, reset } from '../features/auth/authSlice'
import Spinner from "../components/Spinner";


function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        //password2 for confirm password
        password2: ''
    })
    //destructure formData
    const { name, email, password, password2 } = formData

    // initialize useDispatch hook
    const dispatch = useDispatch()
    //initialize useNavigate hook
    const navigate = useNavigate()

    //initialize useSelector hook
    const { user, isLoading, isSuccess, isError, message } = useSelector(state => state.auth)

    //useEffect hook for error and success, and resets state using reset action creator from authSlice
    useEffect(() => {
        if (isError) {
            toast.error(message)

        }
        if (isSuccess || user) {
            navigate('/')
        }

        dispatch(reset())
    }, [isError, isSuccess, user, message, dispatch, navigate])


    //onChange function
    const onChange = e => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    //onSubmit function
    const onSubmit = (e) => {
        e.preventDefault()
        if (password !== password2) {
            toast.error('Passwords do not match')
        } else {
            const userData = {
                name,
                email,
                password
            }
            dispatch(register(userData))
        }
    }

    //if loading show spinner
    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <section className="heading">
                <h1><FaUser /> Register</h1>
                <p>Please Create an Account</p>
            </section>
            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={name}
                            name="name"
                            onChange={onChange}
                            placeholder="Enter Your Name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            name="email"
                            onChange={onChange}
                            placeholder="Enter Your Email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            name="password"
                            onChange={onChange}
                            placeholder="Enter a Password"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            id="password2"
                            value={password2}
                            name="password2"
                            onChange={onChange}
                            placeholder="Confirm Your Password"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}
export default Register