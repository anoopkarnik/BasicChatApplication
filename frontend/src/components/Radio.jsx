import React from 'react'

const Radio = ({onChange,options}) => {
  return (
        <div className='flex text-white items-center w-full px-[12%] gap-2'>
            {options.map((option,index) => (
                <label key={index}>
                    {option}
                    <input className="p-3" type="radio" onChange={onChange} value={option} name="group"/>
                </label>
            ))}
            
        </div>
  )
}

export default Radio