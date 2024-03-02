import React from 'react'

const Input = ({placeholder,label, onChange,type}) => {
  return (
    <div className='flex flex-col items-center w-full mb-10 text-black'>
        <div className='w-full text-white flex px-[12%]'> {label}</div>
        <input type={type} onChange={onChange} className='w-[80%] p-2  text-black rounded-2xl input-bordered' placeholder={placeholder}/>
    </div>
  )
}

export default Input