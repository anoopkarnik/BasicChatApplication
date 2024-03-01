import React,{useState} from 'react'
import Heading from '../components/Heading'
import Input from '../components/Input'
import Button from '../components/Button'
import { signin } from '../controllers/auth'
import { useNavigate } from 'react-router-dom'
import {CurrentUserContext} from '../contexts/currentUserContext'
import { useContext } from 'react'

const Signin = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const {currentUser, setCurrentUser} = useContext(CurrentUserContext)


    const onSignin = async () =>{
        const response = await signin({username,password})
        setCurrentUser(response)
        localStorage.setItem('token', response.token)
        navigate('/')
    }

  return (
    <div className='flex items-center justify-center w-full h-screen'>
    <div className='flex flex-col justify-center w-[40%] h-[60%] bg-gray-400 gap-10 border-2 border-black'>
        <Heading text='Login ChatApp'/>
        <Input onChange={e => setUsername(e.target.value)} placeholder='Enter email' label='Username' type="text"/>
        <Input onChange={e => setPassword(e.target.value)} placeholder='Enter password' label='Password' type="password"/>
        <div className='flex flex-col justify-start gap-2 mt-10'>
            <div className='text-md flex justify-start mx-[12%] text-white hover:text-blue-500 cursor-pointer font ' 
            onClick={()=>{navigate('/signup')}}>
                Don't have an account
            </div>
            <Button text='Login' onClick={onSignin}/>
        </div>
        
    </div>
</div>
  )
}

export default Signin