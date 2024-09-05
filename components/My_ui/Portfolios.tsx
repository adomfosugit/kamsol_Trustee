import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
type info = {
  cardTitle:string;
  imgURL: string;
  subtitle: string;
  writeup: string;
  route:string;
}


const Portfolios = ({cardTitle, imgURL,subtitle,writeup,route}: info) => {
  
  return (
    <section className='max-w-7xl mx-auto  mb-5'>
        <div className='w-full  '>
            {/* Real Estate */}
        <article className='flex flex-col md:flex-row-reverse items-center  relative '>
            <div className='w-full md:w-2/3' >
                <Image src= {imgURL} alt='picture' width={900} height={200}/>
            </div>
            <div className="w-3/4 mx-auto bg-white absolute top-[200px] md:left-0 p-8 border-1 border-gray-400 shadow-2xl md:w-[500px] md:top-[100px]">
            <p className="text-sm mb-2">{cardTitle}</p>
            <h3 className="text-2xl font-bold">{subtitle}</h3>
            <p className="text-sm md:text:lg  sm:text-lg leading-relaxed">{writeup}</p>

            <Link href= {`route`} className='text-primary text-light text-lg'>
              View details
            </Link>
           
          </div>

        </article>

        </div>

    </section>
  )
}

export default Portfolios