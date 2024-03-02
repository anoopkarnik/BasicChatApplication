
import { useContext, useEffect } from 'react';
import { SocketContext } from '../contexts/SocketContext';
import { SelectedUserContext } from '../contexts/selectedUserContext';
import notificationSound from '/notification.mp3';

const useListenMessages = () => {
    const { socket } = useContext(SocketContext);
    const {conversations,setConversations,selectedUser, setSelectedUser}= useContext(SelectedUserContext)

    useEffect(() =>{
        socket?.on('newMessage',(newMessage)=>{
            const sound = new Audio(notificationSound);
            sound.play();
            setConversations([...conversations,newMessage]);
        });
        return () => socket?.off('newMessage');
    }, [socket,conversations,setConversations]);

}

export default useListenMessages;