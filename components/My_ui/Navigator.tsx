import React from 'react'
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
  } from "@/components/ui/menubar"
import { Menu } from 'lucide-react'
import Link from 'next/link'
  

type Props = {}

const Navigator = (props: Props) => {
  return (
    <Menubar>
  <MenubarMenu>
    <MenubarTrigger className=' flex mx-auto  h-[50px] w-[50px] items-center ring-2 ring-primary shadow-none border-none rounded-none'>
        <Menu  className='text-primary rounded-none'/>
    </MenubarTrigger>
    <MenubarContent className='w-[200px] 2xl:w-[400px] px-3 text-xl'>
    <Link href='/sign-in' >
      <MenubarItem>
      Sign In
     </MenubarItem>
     </Link>
    <Link href='/about' >
      <MenubarItem>
      About
     </MenubarItem>
     </Link>
    <Link href='/Terms' >
      <MenubarItem>
      Terms and Conditions
     </MenubarItem>
     </Link>
      <MenubarSeparator />
      <MenubarItem>Socials</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>

  )
}

export default Navigator