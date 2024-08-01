import IProduct from '@/interfaces/IProduct'
import React from 'react'

const Card:React.FC<ICardProps> = ({name, price, image, stock}) => {
  return (
    <div
      className="flex flex-row items-center rounded-lg bg-gray-200 text-surface shadow-secondary-1 
      dark:bg-surface-dark dark:text-white w-[340px] h-[260px] md:flex-row gap-4">
      <img
        className="h-full max-h-[260px] sm:h-[260px] w-full max-w-[180px] rounded-t-lg
         object-cover md:w-48 md:!rounded-none md:!rounded-s-lg"
        src={image}
        alt="" />
      <div className="flex flex-col justify-start p-1 sm:p-4">
        <h5 className="mb-2 text-xl font-medium">{name}</h5>
        <p className="mb-4 text-base">
        Price: ${price}
        </p>
        <p className="text-xs text-surface/75 dark:text-neutral-300">
        Stock: {stock}
        </p>
      </div>
    </div>
  )
}

export default Card