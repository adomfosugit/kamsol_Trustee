import React from 'react'
import Bento1 from './Bento1'
import Bento2 from './Bento2'
import Bento3 from './Bento3'
import Link from 'next/link'

const HeroSection = () => {
  return (
    <div className=' flex h-full p-4  flex-col md:flex-row 2xl:flex-row  '>
        <div className='w-full'>
            <div className='mt-6 md:mt-3 content-center'>
                <Bento1/>
            </div>
           
        </div>
        <div  className=' w-full'>
            <Bento3 />
        </div>
    </div>
  )
}

export default HeroSection