'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card } from '../ui/card';


const images = ['/dubai.jpg', '/investme.jpg']; // Add more images to the array

const Bento2 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % images.length);
    }, 10000);
    return () => clearInterval(intervalId);
  }, [currentIndex, images]);

  return (
    <Card className="h-full shadow-xl">
      <div className="flex w-full h-full bg-red-200">
        <Image
          src={images[currentIndex]}
          alt="picture"
          width={200}
          height={200}
          className="w-full h-full"
          priority
        />
      </div>
    </Card>
  );
};

export default Bento2;