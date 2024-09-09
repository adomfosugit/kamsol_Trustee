'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import {z} from 'zod'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import {Form,FormControl,FormDescription,FormField,FormItem,FormLabel,FormMessage,} from "@/components/ui/form"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link';
import Loader from '@/components/Loader';
import { signInAccount } from '@/lib/Appwrite/api';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
type Props = {}

const formSchema = z.object({
  Email: z.string({required_error:'Email required'}).email('Please Enter a Valid Email'),
  Password: z.string({required_error:'Password is required'})
})

const page = (props: Props) => {
  
  const router = useRouter()
  const [isLoading, setIsLoading] =  useState<boolean>(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Email: "",
      Password: "",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
  
    const session = await signInAccount(values.Email,values.Password)
    if(!session){
    return toast({title: 'Sign in Failed. Please try again'})
    }
    router.push('/Dashboard')
    
  }
  return (
    <div className=' w-full shadow-2xl'>

    <div className='bg-white w-full flex flex-col items-center gap-y-[20px]  '>
      <div className='h-1/4 '>
        <Image alt='logo' src= '/icon.jpg' height={70} width={200} priority/>
      </div>
      <div className='w-3/4'>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="Email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" {...field} type='password'/>
              </FormControl>
              <FormMessage />
           
            </FormItem>
          )}
        />
        <Button type="submit" className='w-full'>{isLoading ? 
        <div className='flex-center'>  <Loader /> </div>
          : 'Log In'} </Button>
      </form>
    </Form>
      </div>
      <div className='flex'><p className='mr-1'>Forgot Password</p> 
      <Link href= '/Recover' className='text-primary underline'>Reset</Link>
      </div>
    
      
    </div>
    </div>
  )
}

export default page