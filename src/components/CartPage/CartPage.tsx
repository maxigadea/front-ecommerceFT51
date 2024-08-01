'use client'
import { useAuth } from '@/context/AuthContext';
import { createOrder } from '@/helpers/orders.helper';
import IProduct from '@/interfaces/IProduct';
import { IUserSession } from '@/interfaces/Types';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';

const CartPage = () => {
    const [cart, setCart] = useState<IProduct[]>([])
    const [totalCart, setTotalCart] = useState<number>(0)
    const router = useRouter();
    const {userData} = useAuth();

    useEffect(() => {
      if(typeof window !== "undefined" && window.localStorage) {
        const storedCart = JSON.parse(localStorage.getItem("cart") || "[]")
        if(storedCart) {
          let totalCart = 0;
          storedCart.map((item: IProduct) => {
            totalCart = totalCart + item.price
          })
          setTotalCart(totalCart)
          setCart(storedCart)
        } 
      }
    }, []) 

    useEffect(() => {
        if(userData?.user.name) {
          userData?.user.name === undefined && router.push("/login")
        }
    }, [userData?.user])

    const handleClick = async () => {
      const idProducts = new Set(cart?.map((product) => product.id))
      await createOrder(Array.from(idProducts), userData?.token!);
      Swal.fire({
        title: "Buy successfully",
        width: 400,
        padding: "3em",
      });
      setCart([])
      setTotalCart(0)
      localStorage.setItem("cart", "[]")
    }

  return (
    <div className='flex flex-row items-center justify-around w-full p-4'>
      <div>
        {
          cart && cart.length > 0 ? (
              cart?.map((cart) => {
                return (
                  <div key={cart.id}>
                    <div>
                      <p>{cart.name}</p>
                      <p>Price: {cart.price}</p>
                    </div>
                  </div>
                )
              })
          ) : (
            <div>
              <p>You dont have any products in your cart yet</p>
            </div>
          )
        }
      </div>
      <div>
          <p>Total: ${totalCart}</p>
          <button onClick={handleClick}>Checkout</button>
      </div>
    </div>
  )
}

export default CartPage