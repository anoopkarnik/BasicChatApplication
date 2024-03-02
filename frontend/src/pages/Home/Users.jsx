import React, { useState,useEffect, useContext } from 'react'
import { FaSearch } from "react-icons/fa";
import { IoIosSend} from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { SelectedUserContext } from '../../contexts/selectedUserContext';
import { AuthContext } from '../../contexts/AuthContext';
import useLogout from '../../hooks/useLogout';
import { useGetUsers } from '../../hooks/useGetUsers';
import { UsersContext } from '../../contexts/UsersContext';
import {useGetConversation } from '../../hooks/useGetConversation';
import { SocketContext } from '../../contexts/SocketContext';
import User from './User';
const Users = () => {

    const navigate = useNavigate()
    const [filter,setFilter] = useState('')

    const {conversations,setConversations,selectedUser, setSelectedUser}= useContext(SelectedUserContext)
    const {currentUser, setCurrentUser} = useContext(AuthContext)
    const {users,setUsers} = useContext(UsersContext)


    const {loading,getUsers} = useGetUsers();
    const { getConversation} = useGetConversation();

    const {logout} = useLogout();

    const onLogout = async () => {
        await logout();
    }

    useEffect(()=>{
        if (!selectedUser.name) return;
        let userId = selectedUser._id
        getConversation({userId})

    },[selectedUser])

    useEffect(()=>{
        if (!currentUser) return;
        getUsers({filter})
    },[]) 
    
  return (
    <div className='flex flex-col justify-between w-1/3 p-2 border-r-[1px] mx-2'>
        <div className='w-full flex flex-col justify-start items-center'>
            <div className='flex justify-between items-center w-full gap-4'>
                <input onChange={(e)=> setFilter(e.target.value)} className='w-full rounded-full bg-gray-700 p-2 px-4 text-white mx-4' placeholder='Search...'></input>
            </div>
            <div className='flex flex-col py-4 my-4 w-[90%] border-t-[1px] border-white overflow-auto'>
                {users.filter(user => user.name.startsWith(filter))
                .filter(user => user._id !== currentUser._id)
                .map((user,index)=>(
                    <User user={user}/>
                ))}
            </div>
        </div>
        <div className=''>
            <BiLogOut onClick={onLogout} className='text-3xl text-white hover:bg-violet-500 hover:cursor-pointer'/>
        </div>
    </div>
  )
}

export default Users