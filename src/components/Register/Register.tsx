"use client"

import { register } from '@/helpers/auth.helper';
import { validateRegisterForm } from '@/helpers/validate';
import { IRegisterError, IRegisterProps } from '@/interfaces/Types';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

const Register: React.FC = () => {
    const router = useRouter();
    const initialState = {
        email: "",
        password: "",
        name: "",
        address: "",
        phone: ""
    }
    const [dataUser, setDataUser] = useState<IRegisterProps>(initialState);
    const [errors, setErrors] = useState<IRegisterError>(initialState);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setDataUser({
            ...dataUser,
            [name]: value
        })
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await register(dataUser)
            Swal.fire({
                title: "You have successfully registered",
                width: 400,
                padding: "3em",
            });
            router.push("/login")
        } catch (error: any) {
            throw new Error(error)
        }
    }

    useEffect(() => {
        const errors = validateRegisterForm(dataUser);
        setErrors(errors)
    }, [dataUser])


  return (
    <div>
        <div>
            <h2>Register to X Store</h2>
        </div>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='email-address'>Email:</label>
                <input 
                    id="email-address" 
                    name="email"     
                    type="email"
                    value={dataUser.email}
                    onChange={handleChange}         
                    placeholder='example@gmail.com' 
                />
                {errors.email && <span>{errors.email}</span>}
            </div>

            <div>
                <label htmlFor='password'>Password:</label>
                <input 
                    id="password" 
                    name="password"     
                    type="password"
                    value={dataUser.password}
                    onChange={handleChange}         
                    placeholder='*********' 
                />
                {errors.password && <span>{errors.password}</span>}
            </div>

            <div>
                <label htmlFor='name'>Name:</label>
                <input 
                    id="name" 
                    name="name"     
                    type="text"
                    value={dataUser.name}
                    onChange={handleChange}         
                    placeholder='John Doe' 
                />
                {errors.name && <span>{errors.name}</span>}
            </div>

            <div>
                <label htmlFor='address'>Address:</label>
                <input 
                    id="address" 
                    name="address"     
                    type="text"
                    value={dataUser.address}
                    onChange={handleChange}         
                    placeholder='*********' 
                />
                {errors.address && <span>{errors.address}</span>}
            </div>

            <div>
                <label htmlFor='phone'>Phone:</label>
                <input 
                    id="phone" 
                    name="phone"     
                    type="phone"
                    value={dataUser.phone}
                    onChange={handleChange}         
                    placeholder='*********' 
                />
                {errors.phone && <span>{errors.phone}</span>}
            </div>

            <div>
                <button disabled={errors.email ? true : false} type='submit'>Sign In</button>
            </div>

        </form>
    </div>
  )
}

export default Register