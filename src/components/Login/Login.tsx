"use client"
import { useAuth } from '@/context/AuthContext';
import { login } from '@/helpers/auth.helper';
import { validateLoginForm } from '@/helpers/validate';
import { ILoginError, ILoginProps } from '@/interfaces/Types';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';

const Login: React.FC = () => {
    const router = useRouter();
    const initialState = {
        email: "",
        password: ""
    }
    const [dataUser, setDataUser] = useState<ILoginProps>(initialState);
    const {setUserData} = useAuth();
    const [errors, setErrors] = useState<ILoginError>(initialState);

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
            const response = await login(dataUser)
            const {token, user} = response;
            
            setUserData({token, user})
            Swal.fire({
                title: "You have successfully logged",
                width: 400,
                padding: "3em",
            });
            router.push("/")
        } catch (error: any) {
            throw new Error(error)
        }
        
    }

    useEffect(() => {
        const errors = validateLoginForm(dataUser);
        setErrors(errors)
    }, [dataUser])


  return (
    <div>
        <div>
            <h2>Sign in to X Store</h2>
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
                <button disabled={errors.email ? true : false} type='submit'>Sign In</button>
            </div>

        </form>
    </div>
  )
}

export default Login