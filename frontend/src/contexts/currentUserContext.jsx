import {createContext, useState, useEffect} from 'react';

export const CurrentUserContext = createContext({});

export const CurrentUserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState({});

    return (
        <CurrentUserContext.Provider value={{currentUser, setCurrentUser}}>
            {children}
        </CurrentUserContext.Provider>
    )
}