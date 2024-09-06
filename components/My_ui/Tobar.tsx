import React from 'react'
import Link from 'next/link'
import { Button } from '../ui/button'
import Logo from './Logo'
import Navigator from './Navigator'

const Topbar = () => {
  return (
    <nav className=' px-8 flex bg-white justify-between items-center shadow-xl sticky top-0 z-10'>
        <div>
            <Logo />
        </div>
        <div>
         <Navigator /> 
          </div>
     
    </nav>
  )
}

export default Topbar