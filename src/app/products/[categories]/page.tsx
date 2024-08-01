import Card from '@/components/Card/Card';
import { getProductsByCategory } from '@/helpers/products.helper';
import Link from 'next/link';
import React from 'react'

const Dynamic = async ({params}: {params: {categories: string}}) => {
  const {categories} = params;
  const products = await getProductsByCategory(Number(categories));
  return (
    <div className='flex flex-wrap items-center gap-4 p-4 
    justify-center'>
        {products && 
        products?.map((product) => {
            return (
              <Link href={`/product/${product.id}`} key={product.id}>
                <Card key={product.id} {...product} />
              </Link>
            )
        })}
    </div>
  )
}

export default Dynamic