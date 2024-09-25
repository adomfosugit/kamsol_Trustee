import Geopoint from '@/components/Geopoint'
import ProductCard from '@/components/My_ui/ProductCard'
import { ProductTimegraph } from '@/components/My_ui/ProductTimegraph'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { getBlogPropertyData } from '@/lib/Appwrite/api'
import { CheckCheckIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {}

const page = async ({params}: { params: { slug: string } }) => {
    
    const blogData = await getBlogPropertyData(params.slug)
    console.log(blogData)
    {/* @ts-ignore */}
    const {Images,Price,Market_value,Minimum_investments} =blogData
  return (
    <section className='flex w-full flex-col max-xl:overflow-y-scroll gap-8 '>
        <div className='container max-w-4xl flex-col mt-4 h-10'>
            <h1 className='text-center font-bold text-2xl md:text-4x'>{blogData?.Name}</h1>
        </div>
        <div className='container max-w-2xl flex flex-row mt-4 h-48  '>
            <div className='w-1/2'>
            <Carousel className='m-0'  >
      <CarouselContent>
        {/*@ts-ignore*/}
        {Images && Images.map((item) => (
          <CarouselItem key={item} className='w-full h-[192px]  '>
            <Image src={item} layout='fixed' width={200} height={200} alt='project pic' className='w-3/4 h-[192px]' /> 
          </CarouselItem>
        )
          
        )}
      </CarouselContent >
     
    </Carousel>
            </div>
            <div className='w-1/2 flex-col space-y-4'>
            <div className='flex space-x-2 text-center text-[12px] md:text-sm'>
            <p>Minimum Value</p>
            <p>${Minimum_investments}</p>
            </div>
            <div className='flex space-x-2 text-center text-[12px] md:text-sm'>
            <p>Closing Cost</p>
            <p>${Market_value}</p>
            </div>
            <div className='flex space-x-2 text-center text-[12px] md:text-sm'>
            <p>Total Asset Value</p>
            <p>${Minimum_investments+Market_value}</p>

            </div>
            
            <Link href= {`/Register/${params.slug}`}>
            <Button className='w-3/4 mt-3'>Invest </Button>
            </Link>
            
            </div>
        </div>
        <div className='container max-w-4xl flex-col mt-4 h-60 md:h-48 border-2 '>
            <p className='font-bold text-center'>Progress Update</p>
            <p className='text-justify text-[12px] md:text-sm'>{blogData?.Progress_update}</p>
        </div>
        <div className='container max-w-4xl flex-col mt-4 h-60 md:h-48 border-2 mb-1 md:mb-8 '>
            <p className='font-bold text-center'>Description</p>
            <p className='text-justify text-[12px] md:text-sm'>{blogData?.Description}</p>
            {/*utility*/}
            
            <p className='font-bold mt-2 text-center'>Available Utilities</p>
            <div className='flex flex-col text-center justify-between'>

            <p className='text-center text-[12px] md:text-sm'>{blogData?.Electricity ? <h1>Electricty</h1> : <h1>Electricity Unavailable</h1>}</p>
            <p className='text-center text-[12px] md:text-sm'>{blogData?.Water ? <h1>Water</h1> : <h1>Water Supply unavailable</h1>}</p>
            <p className='text-center text-[12px] md:text-sm'>{blogData?.Internet ? <h1>Internet</h1> : <h1>Internet Connection unavailable</h1>}</p>
            </div>
    
        </div>
        <div className='flex flex-col md:flex-row max-w-4xl container  '>
        <Card className='container  mt-4  p-2 w-3/4'>
            <CardContent className='w-full mx-auto'>

           <Geopoint lat = {blogData?.Geo_point_lat} lng= {blogData?.Geo_point_lng}/> 
            </CardContent>
        </Card>
        <div className='container max-w-4xl  mt-4  '>
        
           <ProductTimegraph /> 
        </div>
        </div>
       
      

    </section>
  )
}

export default page