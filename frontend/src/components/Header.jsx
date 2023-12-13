import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'



function Header() {
    //initialize useNavigate hook
    const navigate = useNavigate()
    // initialize useDispatch hook
    const dispatch = useDispatch()

    //initialize useSelector hook
    const { user } = useSelector((state) => state.auth)

    //onLogout function
    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }


    return (
        <header className='header'>
            <div className="logo">
                <Link to='/'>Support Desk</Link>
            </div>
            <ul>
                {/* if the user is logged in show the logout button */}
                {user ? (
                    <li>
                        <button className="btn" onClick={onLogout}><FaSignOutAlt /> Logout</button>
                    </li>)
                    :

                    (<>
                        <li>
                            <Link to='/login'><FaSignInAlt /> Login</Link>
                        </li>
                        <li>
                            <Link to='/register'><FaUser /> Register</Link>
                        </li>
                    </>
                    )}



            </ul>
        </header>
    )
}
export default Header