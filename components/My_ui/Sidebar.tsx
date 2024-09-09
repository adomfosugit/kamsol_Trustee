'use client'
import Link from 'next/link';
import React from 'react'
import Logo from './Logo';
import { sidebarLinks } from '@/constants';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Footer1 from './Footer1';
export type userdetail = {
    user:{
        name:string;

    }
}


const Sidebar = ( {user} : userdetail ) => {
    
    const pathname = usePathname()
  return (
    <section className='fixed left-0 top-0 flex h-screen w-fit flex-col justify-between border-r  border-kolor pt-8 max-md:hidden sm:p-4 xl:p-6 2xl:w-[355px]'>
        <nav className='flex flex-col gap-4'>
            <Link href='/' className='mb-3 cursor-pointer flex items-center gap-2'>
            <Logo />
            </Link>
        {sidebarLinks.map((item) => {
            const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)
            return(
                <Link href={item.route} key={item.label} className= {cn( 'flex gap-3 items-center py-1 md:p-3 2xl:p-4 rounded-lg justify-center xl:justify-start', {'bg-primary ':isActive}) }>
                    <div className='relative size-6'>
                        <Image 
                        src={item.imgURL}
                        alt={item.label}
                        fill
                        className= {cn({'brightness-[3] ': isActive})}/>


                    </div>
                    <p className= {cn( 'text-[16px] leadin-24px font-semibold text-black-100 max-xl:hidden',{'!text-white': isActive})}>{item.label}</p>
                </Link>
            )
        })}
        </nav>
        <Footer1 username = {user}/> 
    </section>
  )
}

export default Sidebar