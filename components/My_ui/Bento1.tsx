import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Link from 'next/link'
import { Button } from '../ui/button'

  

const Bento1 = () => {
  return (
    <Card className='h-full border-none shadow-none  '>
   
    <CardContent className='items-center w-3/4 mx-auto mt-6 '>
      <p className='font-extrabold text-2xl text-pretty md:text-3xl'>Invest in Your Future with Premier Real Estate Opportunities</p>
      <p className='font-light text-[20px] md:text-[30px] '>Unlock High Returns with Secure and Smart Property Investments</p>
      <Link href='/sign-up'>
                
                <Button className='mt-5 mb-2 w-full p-8 font-bold text-[20px] md:w-[200px]'>Get Started</Button>
                </Link>
    </CardContent>
   
  </Card>
  
  )
}

export default Bento1