'use client'
import { usePathname } from 'next/navigation'
import React from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import Image from 'next/image'
import Logo from './Logo'
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import Footer1 from './Footer1'
import { Menu } from 'lucide-react'
export type userdetail1 = {
    user1:{
        name:string;

    }
}

const MobileNav = ({user1}:userdetail1) => {
    const pathname = usePathname()
  return (
    <section className='w-full max-w-[264px] '>
        <Sheet>
            <SheetTrigger>
                <Menu  width={30} height={30} className='cursor-pointer' />
            </SheetTrigger>
            <SheetContent side='left' className='border-none bg-white'>
                <Logo />
                <div className='flex h-[calc(100vh-150px)] flex-col justify-between overflow-y-auto'>

                <SheetClose asChild>
                    <nav className='flex h-full flex-col gap-6 pt-16 '>
                        {sidebarLinks.map((item)=> {
                            const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)
                            return(
                                <SheetClose asChild key={item.route}>
                                  <Link href={item.route} key={item.label} 
                                  className={cn('w-full flex gap-3 intems-center p-4 rounded-lg max-w-60', {'bg-primary':isActive})}>
                                    <Image  src={item.imgURL} alt= {item.label} width={20} height={20}
                                    className={cn({'brightness-[3] invert-0':isActive})}/>
                                    <p className={cn(' text-[16px] leading-[24px] font-semibold',{'text-white':isActive})}>{item.label}</p>
                                  </Link>
                                </SheetClose>
                            )
                        })}
                        
                    </nav>
                </SheetClose>
                <Footer1 username = {user1}  type= "mobile"/>
                </div>
            </SheetContent>
        </Sheet>
    </section>
  )
}

export default MobileNav