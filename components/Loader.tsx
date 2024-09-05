import React from 'react'

type Props = {}

const Loader = (props: Props) => {
  return (
    <div className='flex-center w-full'>
        <img src = 'vercel.svg' alt='loader' width={24} height={24}/>
    </div>
  )
}

export default Loader