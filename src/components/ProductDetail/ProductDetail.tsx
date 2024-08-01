'use client'
import IProduct from "@/interfaces/IProduct"
import { IUserSession } from "@/interfaces/Types"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import Swal from "sweetalert2"


const ProductDetail:React.FC<IProduct> = ({name, image, description, price, stock, id}) => {
    const router = useRouter();
    const [userSession, setUserSession] = useState<IUserSession>()
    useEffect( () => {
        if(typeof window !== "undefined" && window.localStorage) {
        const userData = localStorage.getItem("userSession")
        setUserSession(JSON.parse(userData!))
        }
    }, []) 

    const handleClick = () => {
        if(userSession && userSession.token) {
            const cart = JSON.parse(localStorage.getItem("cart") || "[]")
            const productExist = cart.some((product: IProduct) => {
                if(product.id === id) return true
                return false
            })
            if(productExist){
                Swal.fire({
                    title: "This product exist in your cart",
                    width: 400,
                    padding: "3em",
                });
                router.push("/cart")
            } else {
                cart.push({
                    name,
                    description,
                    image,
                    price,
                    stock,
                    id
                })
                localStorage.setItem('cart', JSON.stringify(cart))
                Swal.fire({
                    title: "Product added to your cart",
                    width: 400,
                    padding: "3em",
                });
                router.push("/cart")
            }
        } else {
            Swal.fire({
                title: "You must have logged for add products to your cart",
                width: 400,
                padding: "3em",
            });
        }
    }

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6">
        <h2>{name}</h2>
        <img src={image} alt='Imagen del producto' />
        <h2>{description}</h2>
        <p>Price: {price}</p>
        <p>Stock: {stock}</p>
        <button className="bg-gray-200 rounded-lg p-4" onClick={handleClick}>Add to cart</button>
    </div>
  )
}

export default ProductDetail