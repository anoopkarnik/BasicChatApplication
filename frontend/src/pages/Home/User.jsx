import React,{useContext} from 'react'
import {SelectedUserContext} from '../../contexts/selectedUserContext'
import {SocketContext} from '../../contexts/SocketContext'

const User = ({user}) => {
    const {conversations,setConversations,selectedUser, setSelectedUser}= useContext(SelectedUserContext)
    const {onlineUsers,setOnlineUsers} = useContext(SocketContext)
    const isOnline = onlineUsers.includes(user._id)


  return (
    <div onClick={e=> setSelectedUser(user)} key={user._id} 
    className={`flex justify-between items-center w-full p-2 text-white border-b-[1px]border-white 
    hover:bg-violet-500 hover:cursor-pointer ${selectedUser._id === user._id ? 'bg-violet-300' : ''}
    `}>
        <div className={`flex items-center justify-start gap-2 ${isOnline ? "indicator" : ""}`}>
            {isOnline? 
            <div className={` ${isOnline ? "indicator" : ""}`}>
                <img src={user.profilePic} alt=""notfound className='object-cover h-10 w-10'/>
             <span class="indicator-item badge badge-success "></span> 
             </div>:
             <img src={user.profilePic} alt=""notfound className='object-cover h-10 w-10'/>}
            
            <p >{user.name}</p>
        </div>
    </div>
  )
}

export default User