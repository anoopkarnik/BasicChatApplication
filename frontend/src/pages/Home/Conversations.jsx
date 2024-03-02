import React,{useContext,useEffect,useRef,useState} from 'react'
import { FaSearch } from "react-icons/fa";
import { IoIosSend} from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { SelectedUserContext } from '../../contexts/selectedUserContext';
import { AuthContext } from '../../contexts/AuthContext';
import {useSendMessage} from '../../hooks/useSendMessage';
import Conversation from './Conversation';
import useListenMessages from '../../hooks/useListenMessages';

const Conversations = () => {

    const {selectedUser,setSelectedUser,conversations,setConversations}= useContext(SelectedUserContext)
    const {currentUser, setCurrentUser} = useContext(AuthContext)
    const [message,setMessage] = useState('')
    useListenMessages();
    const lastMessageRef = useRef()

    const {sendMessage} = useSendMessage();

    const onSendMessage = async() => {
        if(message === '') return
        await sendMessage({message})
        setMessage('')
    }

    useEffect(()=>{
        setTimeout(()=>{
            lastMessageRef.current?.scrollIntoView({behaiour:'smooth'})
        },100)
    },[conversations])

  return (
    
    <div className='flex flex-col justify-between items-center w-full h-full md:min-w-[450px]'>
        <div className='w-full p-4 bg-gray-400 flex'>
            <p>To:</p>
            <p className='font-black mx-2'>{selectedUser.name}</p>
        </div>
        <div className='flex flex-col  w-full h-full overflow-auto'>
            {conversations.map((conversation,index)=>(
                <div ref={lastMessageRef}>
                    <Conversation conversation={conversation}/>
                </div>
            ))}
        </div>
        <div className='bg-gray-700 w-[90%] m-4 p-4  flex justify-between items-center overflow-hidden border-black border-2 rounded-xl'>
            <input onChange={e=>setMessage(e.target.value)} className='text-white bg-gray-700 w-full' placeholder='Send a message' 
            value={message}/>
            <IoIosSend onClick={onSendMessage} className='text-3xl text-white'/>
        </div>
    </div>
  )
}

export default Conversations;