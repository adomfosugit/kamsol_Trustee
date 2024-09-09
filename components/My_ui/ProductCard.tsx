import React from 'react'

type Props = {}
import { Card, CardContent, } from "@/components/ui/card"
import { Carousel,CarouselContent,CarouselItem,CarouselNext,CarouselPrevious} from "@/components/ui/carousel"
import { imageLinks, sidebarLinks } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'

export type detailPropData = {
 Name: string;
 Price: number;
 Description:string;
 Progress_update:string;
 Location:string;
 Market_value:number;
 Closing_cost: number;
 Minimum_investments: number;
 Available_slots: number;
 Land_use: string;
 Electricity: Boolean;
 Water: Boolean;
 Internet: Boolean;
 Geo_point_lat: number;
 Geo_point_lng: number;
 Images : string[]
 $id:string; 
}

export type detailProps = {
  detail  : detailPropData
}  
const ProductCard = ({detail} : detailProps) => {
  console.log(detail)
  const {Images } =detail
  return (
    <Link href={`/Portfolio/${detail.$id}`}>
    
   
    <Card className=' w-3/4 md:w-full relative m-4 mx-auto ring-2 ring-primary h-52 rounded-none'>
  <CardContent className='p-0 h-3/4 rounded-xl '>
  <Carousel className='m-0'  >
      <CarouselContent>
        {Images && Images.map((item) => (
          <CarouselItem key={item} className='w-full h-[156px] bg-slate-500 '>
            <Image src={item} layout='fixed' width={200} height={200} alt='project pic' className='w-full h-full' /> 
          </CarouselItem>
        )
          
        )}
      </CarouselContent >
     
    </Carousel>
  </CardContent>
    <div className=' items-center flex flex-col mt-2'>
      <p className='text-sm leading-3'>{detail.Name}</p>
      <p className='text-sm'>${detail.Price}</p>

    </div>
</Card>
</Link>
  )
}

export default ProductCard