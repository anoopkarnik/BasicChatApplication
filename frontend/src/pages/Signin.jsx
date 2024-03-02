import React,{useState} from 'react'
import Heading from '../components/Heading'
import Input from '../components/Input'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'
import useSignin from '../hooks/useSignin'


const Signin = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const {loading,signin} = useSignin()

    const onSignin = async () =>{
        await signin(username,password)
    }

  return (
    <div className='flex flex-col items-center justify-center mx-auto min-w-96 h-full w-[30%]'>
    <div className='justify-center w-full bg-gray-400 bg-clip-padding backdrop-filter 
    backdrop-blur-lg bg-opacity-0 shadow-md '>
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