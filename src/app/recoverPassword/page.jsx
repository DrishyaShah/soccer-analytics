"use client"


import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'



const RecoverPassword = () => {

    const [email, setEmail] = useState('')
    useEffect(() => {
        document.body.style.overflow = "hidden";
    
        return () => {
          document.body.style.overflow = "auto";
        };
      }, []);

      const handleChange = (e) => {
        setEmail(e.target.value);
        };

const onSubmit = async (e) => 
{
    e.preventDefault()
    try 
    {
        const res = await axios.post("/api/users/recoverPassword" , {email})
        toast.success("Email successfully sent")
    }
    catch (error)
    {
        console.log(email)

        
        toast.error("Email not sent.");
    }
}

        
  return (
    <div className="min-h-screen bg-black flex">
      <div className="w-full flex items-center justify-center p-4">
        <div className="bg-[#111312] p-7 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold text-white mb-6">Reset Password</h3>
          <p className = "text-sm text-gray-300 mb-6">Enter your email address below and we will send you link to reset password</p>
          <form onSubmit={onSubmit}>
          <div className="mb-6">
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full border border-gray-800 bg-[#111312] text-gray-300 py-2 px-4 rounded outline-none transition duration-500 ease-in-out hover:border-yellow-500"
              />
            </div>
            <button
              type="submit"
              className="rounded bg-[#24292b] text-white font-bold py-2 px-6  inline-block transition duration-500 ease-in-out hover:bg-yellow-500 hover:text-black "
            >
              Send
            </button>
          </form>
          </div>
          </div>
          </div>
  )
}

export default RecoverPassword
