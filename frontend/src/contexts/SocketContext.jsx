import { createContext, useContext, useEffect,useState } from "react";
import { AuthContext } from "./AuthContext";
import io from "socket.io-client";

const url = import.meta.env.VITE_API_URL

export const SocketContext = createContext();

export const SocketProvider = ({children}) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const {currentUser} = useContext(AuthContext);

    useEffect(() => {
        if(currentUser){
            const socket = io('http://localhost:3000',{
                query:{
                    userId: currentUser._id,
                }
            });
            setSocket(socket);
            socket.on("getOnlineUsers", (users) => {
                console.log(users);
                setOnlineUsers(users);
            });
            return () => socket.close();
        }else{
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    },[currentUser])
    return (
        <SocketContext.Provider value={{socket,onlineUsers}}>
            {children}
        </SocketContext.Provider>
    )
}