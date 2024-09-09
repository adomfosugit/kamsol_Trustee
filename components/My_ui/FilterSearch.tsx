import React from 'react'
import Status from './Status'

type Props = {}

const FilterSearch = (props: Props) => {
  return (
    <div className='flex flex-col items-center gap-y-3'>
        <div className='border-b-2 border-kolor w-full'>
        <h1 className='text-center p-2 font-bold font-sans text-xl md:text-3xl'>Explore Our Portfolio</h1>
        </div>
        <div className='flex flex-row w-full justify-between items-center  '>
            <div><p>Assets</p></div>
            <div>
                <Status />
            </div>
        </div>
    </div>
  )
}

export default FilterSearch