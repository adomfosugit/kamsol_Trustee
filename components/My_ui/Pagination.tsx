import React from 'react'
import { Button } from '../ui/button'


type Props = {}

const Pagination = (props: Props) => {
  return (
    <div className='flex flex-roww-full items-center mx-auto'>
        <div className='flex  gap-4 items-center '>

        <Button variant={'link'}>Prev</Button>
        <p>1</p>
        <Button variant={'link'}>Next</Button>
        </div>


    </div>
  )
}

export default Pagination