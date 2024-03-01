import React,{useState,useEffect} from 'react'

import Users from './Users';
import Conversation from './Conversation';
import { SelectedUserProvider } from '../../contexts/selectedUserContext';


const Home = () => {
    
 
    
  return (
    <SelectedUserProvider >
        <div className='flex items-center justify-center w-full h-screen'>
            <div className='flex w-3/4 h-3/4 bg-white'>
            <Users />
            <Conversation/>
            </div>
        </div>
    </SelectedUserProvider >
  )
}

export default Home