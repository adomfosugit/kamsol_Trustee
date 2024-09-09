import FilterSearch from '@/components/My_ui/FilterSearch'
import Pagination from '@/components/My_ui/Pagination'
import ProductCard, { detailPropData } from '@/components/My_ui/ProductCard'
import { getPropertyData } from '@/lib/Appwrite/api'
import React from 'react'

type Props = {}

const page = async (props: Props) => {
  const data = await getPropertyData()
 // console.log(data)
  return (
    <section className='flex w-full flex-col max-xl:max-h-screen max-xl:overflow-y-scroll'>
        <div className='container max-w-4xl flex-col mt-4 h-24 '> 
          <FilterSearch />
        </div>
        <div className='container max-w-4xl flex-col mt-2 mx-auto justify-center'>
        <div className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 gap-y-[1px] '>
          {data ? data.map((item) => (
            <ProductCard key={item.$id}
            /*@ts-ignore*/
            detail = {item} />
            
          )) : <h1>No Projects Please Try Again</h1>}
       
       
        </div>
          <div className='flex items-center mx-auto'><Pagination /></div>
        </div>
    </section>
  )
}

export default page