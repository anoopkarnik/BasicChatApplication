import React, { useState,useEffect, useContext } from 'react'
import { FaSearch } from "react-icons/fa";
import { IoIosSend} from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { logout } from '../../controllers/auth';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../../controllers/user';
import {getConversations} from '../../controllers/message';
import { SelectedUserContext } from '../../contexts/selectedUserContext';
import { CurrentUserContext } from '../../contexts/currentUserContext';

const Users = () => {

    const navigate = useNavigate()
    const [filter,setFilter] = useState('')

    const {conversations,setConversations,selectedUser, setSelectedUser}= useContext(SelectedUserContext)
    const {currentUser, setCurrentUser} = useContext(CurrentUserContext)

    const onLogout = () => {
        logout();
        localStorage.setItem('token', '');
        navigate('/signin');
    }

    const [users,setUsers] = useState([])


    useEffect(()=>{
        let userId = selectedUser._id
        getConversations({userId}).then((response)=>{
            setConversations(response)
        })
    },[selectedUser])

    useEffect(()=>{
        const response = getUsers({filter}).then((response)=>{
            setUsers(response.user)
        })
    },[])
    
  return (
    <div className='flex flex-col justify-between w-1/3 bg-gray-100 p-2'>
        <div className='w-full flex flex-col justify-start items-center'>
            <div className='flex justify-between items-center w-full gap-4'>
                <input onChange={(e)=> setFilter(e.target.value)} className='w-full rounded-full bg-gray-700 p-2 px-4 text-white mx-4' placeholder='Search...'></input>
            </div>
            <div className='flex flex-col py-4 my-4 w-[90%] border-t-2 border-white overflow-auto'>
                {users.filter(user => user.name.startsWith(filter))
                .filter(user => user._id !== currentUser._id)
                .map((user,index)=>(
                    <div onClick={e=> setSelectedUser(user)} key={index} 
                    className={`flex justify-between items-center w-full p-2 text-black border-b-[1px]border-white
                    hover:bg-violet-500 hover:cursor-pointer ${selectedUser._id === user._id ? 'bg-violet-300' : ''}`}>
                        <div className='flex items-center justify-start gap-2'>
                            <img src={user.profilePic} alt=""notfound className='object-cover h-10 w-10'/>
                            <p >{user.name}</p>
                        </div>
                        <IoIosSend className='text-3xl'/>
                    </div>
                ))}
            </div>
        </div>
        <div className=''>
            <BiLogOut onClick={onLogout} className='text-3xl text-black hover:bg-violet-500 hover:cursor-pointer'/>
        </div>
    </div>
  )
}

export default Users