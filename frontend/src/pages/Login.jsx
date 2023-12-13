import { useState } from "react";
import { FaSignInAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../features/auth/authSlice'

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    //destructure formData
    const { email, password, } = formData

    // initialize useDispatch hook
    const dispatch = useDispatch()

    //initialize useSelector hook
    const { user, isLoading, isSuccess, errorMessage } = useSelector(state => state.auth)


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

        const userData = {
            email,
            password
        }
        dispatch(login(userData))

    }

    return (
        <>
            <section className="heading">
                <h1><FaSignInAlt /> Login</h1>
                <p>Please Log In To Get Support</p>
            </section>
            <section className="form">
                <form onSubmit={onSubmit}>

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
                        <button className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}
export default Login