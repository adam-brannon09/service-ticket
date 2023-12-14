//@Description: Custom hook to check if the user is logged in or not

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';


export const useAuthStatus = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [checkingStatus, setCheckingStatus] = useState(true);

    // Get the user through the redux store from the backend
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        // If the user exists, set loggedIn to true and checkingStatus to false
        if (user) {
            setLoggedIn(true);
            setCheckingStatus(false);
        }
        // If the user does not exist, set loggedIn to false and checkingStatus to false
        else {
            setLoggedIn(false);
            setCheckingStatus(false);
        }
    }, [user]);

    return { loggedIn, checkingStatus };
}