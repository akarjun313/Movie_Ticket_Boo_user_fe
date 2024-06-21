import React from 'react'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Navbar from '../components/Navbar'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
})
    .required()

export default function SigninPage() {

    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
    } = useForm({ resolver: yupResolver(schema) })

    const onSubmit = async (data) => {
        try {
            const res = await axios.post('http://localhost:3210/api/v1/user/signin', data, { withCredentials: true })
            console.log(data)
            if (res.data.success == true) {
                toast.success(res.data.message)
                if (data.role == "user") {
                    navigate('/')
                } else {
                    navigate('/')
                }
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            toast.error("Error in Login")
            console.log(error)
        }

    }


    return (
        <div className='h-screen'>
            <div className="h-[90%] flex justify-center items-center bg-[url('https://static0.srcdn.com/wordpress/wp-content/uploads/2023/11/greatest-movies-of-all-time.jpg')] bg-center bg-no-repeat bg-cover">
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col pt-20 pb-0 w-96 pl-20 pr-20 bg-black bg-opacity-75 h-96 rounded-md'>

                    <input {...register("email")} placeholder='Email' className='px-1.5 py-1 border rounded-md mt-3 mb-3' />
                    <input {...register("password")} placeholder='Password' className='px-1.5 py-1 border rounded-md mt-3 mb-3' />

                    <button type='submit' className="btn btn-sm btn-secondary mt-10 w-40 ml-10">Sign-In</button>
                    <p className='text-sm mt-10 text-white'>I don't have an account. <Link to="/signup">Sign-up</Link></p>
                </form>


            </div>
        </div>
    )
}
