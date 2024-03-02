import React,{useContext} from 'react'
import {SelectedUserContext} from '../../contexts/selectedUserContext'
import {AuthContext} from '../../contexts/AuthContext'

const Conversation = ({conversation}) => {
    const {selectedUser,setSelectedUser,conversations,setConversations}= useContext(SelectedUserContext)
    const {currentUser, setCurrentUser} = useContext(AuthContext)
  return (
    <div key={conversation.senderId} className={`flex ${conversation.senderId === selectedUser._id ? 'justify-start':'justify-end'}`}>
        {conversation.senderId === selectedUser._id ?
            <div className='flex justify-start items-center gap-2 m-4 p-4 bg-violet-700 text-white rounded-xl '>
                <img src={selectedUser.profilePic} alt=""notfound className='object-cover h-10 w-10'/>
                <p>{conversation.message}</p>
            </div>:
            <div className='flex justify-end items-center  gap-2 m-4 p-4 bg-gray-700 text-white rounded-xl'>
                <img src={currentUser.profilePic} alt=""notfound className='object-cover h-10 w-10'/>
                <p>{conversation.message}</p>
            </div>
        }
    </div>
  )
}

export default Conversation