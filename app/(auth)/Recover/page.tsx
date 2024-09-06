'use client'
import Image from 'next/image'
import React from 'react'
import {z} from 'zod'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import {Form,FormControl,FormDescription,FormField,FormItem,FormLabel,FormMessage,} from "@/components/ui/form"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link';
import { createAccountRecovery, signInAccount } from '@/lib/Appwrite/api';
import { toast } from '@/components/ui/use-toast';
type Props = {}

const formSchema = z.object({
  Email: z.string({required_error:'Email required'}).email('Please Enter a Valid Email'),

})

const page = (props: Props) => {
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Email: "",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
  
    const recovery = await createAccountRecovery(values.Email)
    if(recovery){
    return toast({title: 'Reset Link has been sent to your Email'})
    }
    if(!recovery){
    return toast({title: 'Reset Unavailable Please Try Again Later'})
    }
  }
  return (
    <div className=' w-full shadow-2xl'>

    <div className='bg-white  w-full flex flex-col items-center gap-y-[40px]  '>
      <div className='h-1/4 w-[200px]'>
        <Image alt='logo' src= '/icon.jpg' height={70} width={150} />
      </div>
      <div className='w-3/4'>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
       
        <Button type="submit" className='w-full'>Submit </Button>
      </form>
    </Form>
      </div>
     
    </div>
    </div>
  )
}

export default page