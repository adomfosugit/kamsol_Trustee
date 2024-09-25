'use client'
import React, { useState } from 'react' 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {Form,FormControl,FormDescription,FormField,FormItem,FormLabel,FormMessage,} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from '@/components/ui/checkbox'
import {Popover,PopoverContent,PopoverTrigger} from "@/components/ui/popover"
import { cn } from '@/lib/utils'
import { Check, ChevronsUpDown } from 'lucide-react'
import {Command,CommandEmpty,CommandGroup,CommandInput,CommandItem,CommandList,} from "@/components/ui/command"
import { toast } from '@/components/ui/use-toast'
import { getLoggedInUser, sendTermsConditions } from '@/lib/Appwrite/api'
import { countriesName, CountryCode } from '@/constants'

type Props = {}

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const formSchema = z.object({
  FullName: z.string({required_error:'Name required'}).min(2, {
    message: "Name must be at least 2 characters.",
  }),
  DateofBirth:z.string({required_error:'Name required'}).date(),
  Nationality:z.string({required_error:'Field required'}),
  ResidentialAddress:z.string({required_error:'Field required'}),
  PhoneCode: z.coerce.number({required_error:'Field required'}).positive(),
  PhoneNumber:z.string().regex(phoneRegex, 'Invalid Number!'),
  Email:z.string({required_error:'Field required'}).email(),
  Occupation:z.string({required_error:'Field required'}),
  InvestmentAmount:z.coerce.number({required_error:'Field required'}).positive(),
  InvestmentPeriod:z.coerce.number({required_error:'Field required'}).positive(),
  InitialRegistration:  z.boolean(),
  InvestmentFund:z.string({required_error:'Field required'}),
})

const sources = [
  { label: "Inheritance", value: "inheritance" },
  { label: "Personal Savings", value: "personal_savings" },
  { label: "Sale of Property", value: "sale_of_property" },
 
] as const  
const page = (props: Props) => {
    const [inputValue, setInputValue] = useState("")
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        FullName: "",
        DateofBirth: '',
        Nationality:'',
        PhoneCode: 0,
        PhoneNumber:'',
        Email:'',
        Occupation:'',
        InvestmentAmount: 1,
        InvestmentPeriod: 1,
        InitialRegistration: true,
        InvestmentFund: ''
      },
    })
   
    // 2. Define a submit handler.
   async function onSubmit(values: z.infer<typeof formSchema>) {
      form.reset()
      const user = await getLoggedInUser()
      const sendTerms = await sendTermsConditions(`<div data-role="module-unsubscribe" class="module" role="module" data-type="unsubscribe" style="color:#444444; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Center;" data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5">
        
        <p style="font-size:12px; line-height:20px;">
          <a class="Unsubscribe--unsubscribeLink" href="{{{unsubscribe}}}" target="_blank" style="font-family:sans-serif;text-decoration:none;">
            Unsubscribe
          </a>
          -
          <a href="{{{unsubscribe_preferences}}}" target="_blank" class="Unsubscribe--unsubscribePreferences" style="font-family:sans-serif;text-decoration:none;">
            Unsubscribe Preferences
          </a>
        </p>
      </div>`, user.$id)
      if(sendTerms){
      toast({
        title: "Congratulations",
        description: (
          <div className="mt-2  rounded-md  p-4">
            <p>

            Investment Terms and Agreement have been sent to your email
            </p>
          </div>
        ),
      })}
      if(!sendTerms){
        toast({
          title: "Failed",
          description: (
            <div className="mt-2  rounded-md  p-4">
              <p>
  
             Something went wrong please try again Later
              </p>
            </div>
          ),
        })}
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      console.log(values)
    }
  return (
    <section className='container flex w-full md:w-3/4 flex-col h-screen gap-3 items-center justify-center '>
     <div className=' w-full md:w-3/4 shadow-2xl p-5 overflow-y-hidden '>
     <h1 className='text-center font-semibold'>Registration Form</h1>
     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 overflow-y-scroll max-h-80">
        

        <FormField
          control={form.control}
          name="FullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>FullName</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
          
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="DateofBirth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth</FormLabel>
              <FormControl>
                <Input placeholder="Date of Birth" {...field} type='date' />
              </FormControl>
            
              <FormMessage />
            </FormItem>
          )}
        />
     
          <FormField
          control={form.control}
          name="Nationality"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Nationality</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? countriesName.find(
                            (nationality) => nationality.country === field.value
                          )?.country || field.value
                        : "Select "}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className=" p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search..."
                      value={inputValue}
                      onValueChange={(value) => {
                        setInputValue(value)
                        form.setValue("InvestmentFund", value)
                      }}
                    />
                    <CommandList>
                      <CommandGroup>
                        {countriesName.map((nationality) => (
                          <CommandItem
                            value={nationality.country}
                            key={nationality.country}
                            onSelect={() => {
                              form.setValue("Nationality", nationality.country)
                              setInputValue(nationality.country)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                nationality.country === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {nationality.country}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
             
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ResidentialAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Residential Address</FormLabel>
              <FormControl>
                <Input placeholder="Residential Address" {...field}  />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="PhoneCode"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Country Code</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? CountryCode.find(
                            (code) => code.calling_code === field.value
                          )?.calling_code || field.value
                        : "Select "}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className=" p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search byCountry..."
                      value={inputValue}
                      onValueChange={(value) => {
                        setInputValue(value)
                        {/* @ts-ignore */}
                        form.setValue("PhoneCode", value)
                      }}
                    />
                    <CommandList>
                      <CommandGroup>
                        {CountryCode.map((nationality) => (
                          <CommandItem
                            value={nationality.country}
                            key={nationality.country}
                            onSelect={() => {
                              form.setValue("PhoneCode", nationality.calling_code)
                              setInputValue(JSON.stringify(nationality.calling_code))
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                nationality.calling_code === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {nationality.calling_code} {''}{nationality.country}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
             
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="PhoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="Phone" {...field}  />
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
                <Input placeholder="Email" {...field}  />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Occupation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Occupation</FormLabel>
              <FormControl>
                <Input placeholder="Occupation" {...field}  />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="InvestmentAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Investment Amount($)</FormLabel>
              <FormControl>
                <Input placeholder="Amount" {...field}  />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="InvestmentPeriod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Investment Period(years)</FormLabel>
              <FormControl>
                <Input placeholder="Amount" {...field}  />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
    
        
          <FormField
          control={form.control}
          name="InvestmentFund"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Source of Investment</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? sources.find(
                            (nationality) => nationality.value === field.value
                          )?.label || field.value
                        : "Select or Type if other"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className=" p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search..."
                      value={inputValue}
                      onValueChange={(value) => {
                        setInputValue(value)
                        form.setValue("InvestmentFund", value)
                      }}
                    />
                    <CommandList>
                      <CommandGroup>
                        {sources.map((nationality) => (
                          <CommandItem
                            value={nationality.label}
                            key={nationality.value}
                            onSelect={() => {
                              form.setValue("InvestmentFund", nationality.value)
                              setInputValue(nationality.label)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                nationality.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {nationality.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
             
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="InitialRegistration"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className='text-[12px] md:text-sm'>
                I confirm that I will pay a non refundable registration fee of $150.
                </FormLabel>
              
              </div>
            </FormItem>
          )}
        />
        
      
      
    
        

        
        <Button type="submit" className='w-full'>Submit</Button>
      </form>
    </Form>
     </div>
    </section>
  )
}

export default page