'use client'
import { getOrders } from '@/helpers/orders.helper'
import { IOrder, IUserSession } from '@/interfaces/Types'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Orders = () => {
  const [userSession, setUserSession] = useState<IUserSession>()
  const [orders, setOrders] = useState<IOrder[]>([])
  const router = useRouter();
    useEffect(() => {
        if(typeof window !== "undefined" && window.localStorage) {
          const userData = localStorage.getItem("userSession")
          setUserSession(JSON.parse(userData!))
        }
    }, []) 

    const fetchData = async () => {
      const ordersResponse = await getOrders(userSession?.token!);
      setOrders(ordersResponse)
    }

    useEffect(() => {
      if(userSession?.user.name) {
          userSession?.user.name === undefined ? router.push("/login") :  fetchData()
      }
    }, [userSession?.user])
 
 
  return (
    <div>
      {
          orders && orders.length > 0 ? (
            orders?.map((order) => {
                return (
                  <div key={order.id}>
                    <div>
                      <p>{new Date(order.date)?.toDateString()}</p>
                      <p>Status: {order.status.toLocaleUpperCase()}</p>
                    </div>
                  </div>
                )
              })
          ) : (
            <div>
              <p>You dont have any order in your cart yet</p>
              <Link href="/">
                <p> Buy Now!</p>
              </Link>
            </div>
          )
        }
    </div>
  )
}

export default Orders