import React from 'react'

import { LogOutUser } from '@/lib/Appwrite/api'
import { useRouter } from 'next/navigation'
import Image from 'next/image'



declare interface Footerprops {
    type?: 'mobile' | 'desktop'
    username:{
        name:string;
    }
   
}
const Footer1 = ({username, type = 'desktop'}: Footerprops  ) => {
    
    const router = useRouter()
    const handlelogout = async () => {
        const loggedOut = await LogOutUser()
        {/*@ts-ignore*/}
        if(loggedOut) router.push('/sign-in')
    }
  return (
    <footer className='flex cursor-pointer items-center justify-between gap-2 py-6'>
        <div className={type === 'mobile' ? 'flex size-10 items-center justify-center rounded-full bg-gray-300' : 'flex size-10 items-center justify-center rounded-full bg-gray-300 max-xl:hidden'}>
            <p className='text-xl font-bold text-gray-700'>
                {username?.name[0]}
            </p>
        </div>
        <div className={type === 'mobile' ? 'flex flex-1 flex-col justify-center' : 'flex flex-1 flex-col justify-center max-xl:hidden'}>
            <h1 className=' text-[14px] leading-[20px] truncate text-gray-700 font-semibold'>
                {username?.name}
            </h1>
            

        </div>
        <div className='relative size-5 max-xl:w-full max-xl:flex max-xl:justify-center max-xl:items-center' onClick={handlelogout}>
            <Image src ='logout.svg' fill alt='logout' />

        </div>
    </footer>
  )
}

export default Footer1