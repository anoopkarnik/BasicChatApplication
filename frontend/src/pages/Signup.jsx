import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { signup } from '../controllers/auth'
import Button from '../components/Button'
import Heading from '../components/Heading'
import Input from '../components/Input'
import Radio from '../components/Radio'
import {CurrentUserContext} from '../contexts/currentUserContext'
import { useContext } from 'react'

const Signup = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState('')
    const genderOptions = ['male','female','other']
    const [gender, setGender] = useState('')
    const navigate = useNavigate()


    const {currentUser, setCurrentUser} = useContext(CurrentUserContext)
    

    const onGenderChange = (event) =>{
        setGender(event.target.value)
    }


    const onSignup = async () =>{
        const response = await signup({name, username, password, confirmPassword, gender})
        setCurrentUser(response)
        localStorage.setItem('token', response.token)
        navigate('/')
    }

  return (
    <div className='flex items-center justify-center w-full h-screen'>
    <div className='flex flex-col justify-center w-[40%] h-[80%] bg-gray-400 gap-10 border-2 border-black'>
        <Heading text='Signup ChatApp'/>
        <Input onChange={e => setName(e.target.value)} placeholder='Enter name' label='name' type="text"/>
        <Input onChange={e => setUsername(e.target.value)} placeholder='Enter email' label='Username' type="text"/>
        <Input onChange={e => setPassword(e.target.value)} placeholder='Enter password' label='Password' type="password"/>
        <Input onChange={e => setConfirmPassword(e.target.value)} placeholder='Enter password again'  label='Comfirm Password' type="password"/>
        <Radio onChange={onGenderChange} options={genderOptions}/>
        <div className='flex flex-col justify-start gap-2 mt-10'>
            <div className='text-md flex justify-start mx-[12%] text-white hover:text-blue-500 cursor-pointer font ' 
            onClick={()=>{navigate('/signin')}}>
                Already have an account
            </div>
            <Button text='Signup' onClick={onSignup}/>
        </div>
        
    </div>
</div>
  )
}

export default Signup