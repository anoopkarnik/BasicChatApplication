import React from 'react'

const Input = ({placeholder,label, onChange,type}) => {
  return (
    <div className='flex flex-col items-center w-full'>
        <div className='w-full text-white flex px-[12%]'> {label}</div>
        <input type={type} onChange={onChange} className='w-[80%] p-2 bg-gray-700 text-white rounded-2xl' placeholder={placeholder}/>
    </div>
  )
}

export default Input