// import axios from 'axios'
import React from 'react'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Navbar from '../components/Navbar'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';


const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.number().positive().integer().required(),
  password: yup.string().min(6).required(),
  role: yup.string().required()
})
  .required()

export default function SignupPage() {

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) })

  const onSubmit = async (data) => {
    try {
      const res = await axios.post('http://localhost:3210/api/v1/user/signup', data, { withCredentials: true })

      if(res.data.success == true){
        toast.success(res.data.message)
        if(data.role == "user"){
          navigate('/')
        }else{
          navigate('/')
        }
      }else{
        toast.error(res.data.message)
      }
    } catch (error) {
        toast.error("Error in Sign-up")
        console.log(error)
    }

  }


  return (
    <div className='h-screen'>
      <div className="flex justify-center items-center h-[90%] bg-[url('https://static0.srcdn.com/wordpress/wp-content/uploads/2023/11/greatest-movies-of-all-time.jpg')] bg-center bg-no-repeat bg-cover">
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-96 pl-20 pr-20 py-10 bg-black bg-opacity-75 rounded-md'>
          <input {...register("firstName")} placeholder='First Name' className='px-1.5 py-1 border rounded-md mt-3 mb-3' />
          <input {...register("lastName")} placeholder='Last Name' className='px-1.5 py-1 border rounded-md mt-3 mb-3' />
          <input {...register("email")} placeholder='Email' className='px-1.5 py-1 border rounded-md mt-3 mb-3' />
          <input {...register("phone")} placeholder='Phone' className='px-1.5 py-1 border rounded-md mt-3 mb-3' />
          <input {...register("password")} placeholder='Password' className='px-1.5 py-1 border rounded-md mt-3 mb-3' />


          <div>
            <input
              type="radio"
              id="user"
              name="option"
              value="user"
              {...register("role", { required: true })}
              className='cursor-pointer radio-sm'
            />
            <label htmlFor="user" className='ml-2 text-white'>For normal users</label>
          </div>
          <div>
            <input
              type="radio"
              id="owner"
              name="option"
              value="owner"
              {...register("role", { required: true })}
              className='cursor-pointer radio-sm mt-3'
            />
            <label htmlFor="owner" className='ml-2 text-white'>For business</label>
          </div>

          <button type='submit' className="btn btn-sm btn-secondary mt-10 w-40 ml-10">Sign-Up</button>
          <p className='text-sm mt-10 text-white'>already have an account ? <Link className='link' to='/login'>Sign-In</Link></p>
        </form>

      </div>
    </div>
  )
}
