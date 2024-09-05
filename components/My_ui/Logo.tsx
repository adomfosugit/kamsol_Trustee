import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link href='/' className='flex items-center gap-4'>
    <Image src= '/icon.jpg' width={180} height={180} alt='logo'/>
  </Link>
  )
}

export default Logo