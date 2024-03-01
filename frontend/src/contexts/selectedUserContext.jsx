import {createContext,useState} from 'react';

export const SelectedUserContext = createContext({});

export const SelectedUserProvider = ({children}) => {
    const [selectedUser, setSelectedUser] = useState({});
    const [conversations, setConversations] = useState([]);
    return (
        <SelectedUserContext.Provider value={{selectedUser,setSelectedUser,conversations,setConversations}}>
            {children}
        </SelectedUserContext.Provider>
    )
}
