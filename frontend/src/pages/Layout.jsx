import React from 'react'

const Layout = ({children}) => {
  return (
    <div className='relative w-full h-screen bg-gray-200  '>
        {children}
    </div>
  )
}
export default Layout