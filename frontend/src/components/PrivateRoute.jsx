import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus';
import Spinner from './Spinner';

const PrivateRoute = () => {
    // Get the loggedIn and checkingStatus variables from the useAuthStatus custom hook
    const { loggedIn, checkingStatus } = useAuthStatus();

    // If the checkingStatus is true, show the spinner(loading icon)
    if (checkingStatus) {
        return <Spinner />;
    }
    // If the user is logged in, show the Outlet component(whatever is inside the private route in app.js)
    // If the user is not logged in, redirect to the login page
    return loggedIn ? <Outlet /> : <Navigate to='/login' />;
}

export default PrivateRoute
