import React from 'react'

const Button = ({onClick,text}) => {
  return (
    <div className='flex flex-col items-center mb-6'>
        <button onClick={onClick} className='w-[80%] p-2 bg-gray-700 text-white rounded-2xl' >
            {text}
        </button>
    </div>
  )
}

export default Button