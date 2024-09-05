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
import { createUserAccount, signInAccount } from '@/Appwrite/api';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
type Props = {}

const formSchema = z.object({
  Name:z.string({required_error:'Please Enter Your Name'}),
  Email: z.string({required_error:'Email required'}).email('Please Enter a Valid Email'),
  Password: z.string({required_error:'Password is required'})
})

const page = (props: Props) => {
  const [isLoading, setIsLoading] =  useState<boolean>(false)
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Name: "",
      Email: "", 
      Password: "",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    
    const user = await createUserAccount(values)
    if(!user) { toast({title: 'Sign Up failed. Please try again'})
      return 
    }
    
    router.push('/sign-in')
  }
  return (
    <div className='h-[800px] w-full shadow-2xl'>

    <div className='bg-white h-[800px] w-full flex flex-col items-center gap-y-[40px]  '>
      <div className='h-[70px] '>
        <Image alt='logo' src= '/icon.jpg' height={70} width={200} priority />
      </div>
      <div className='w-3/4'>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="Name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
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
        <Button type="submit" className='w-full'>{isLoading ?  <div className='flex-center'>  <Loader /> </div> : 'Sign Up'}</Button>
      </form>
    </Form>
      </div>
      <div className='flex space-x-1'><p>Already a user? </p>
      <Link href='sign-In' className='text-kolor underline font-bold'>Log In</Link>
      </div>
      <div className='w-3/4 mt-[180px] '><p>By Signing up you agree to our 
        <Link href= '/' className='text-kolor underline mr-1'> Terms of Service</Link> & <Link href='/' className='text-kolor underline'>Privacy Policy</Link>
        </p></div>
    </div>
    </div>
  )
}

export default page