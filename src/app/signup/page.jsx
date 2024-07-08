"use client";
import React, { useEffect, useState } from 'react';
import { signupSchema } from '@/schemas/signupSchema';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import {toast} from "react-toastify"
import axios from 'axios';


const SignupForm = () => {
  const router = useRouter();
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const response = signupSchema.safeParse(formData);
    if (!response.success) {

      let errArr = [];
      const { errors: err } = response.error;
      for (let i = 0; i < err.length; i++) {
        errArr.push({ for: err[i].path[0], message: err[i].message });
      }
      setErrors(errArr);
    } else {
      setErrors([]);
     
    }

    
    try {
    const res = await axios.post("/api/users/signup" , formData);
    toast.success("Successfully registered");
    console.log("Signup success" , res.data)

    router.push("/login")
    }
    catch 
    {
      console.log(formData)

      console.log("Signup failed")
      toast.error("REgistration failed");
    }
    finally {
    setIsLoading(false);
    }
  };
  
  
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };


  return (
    <div className="min-h-screen bg-black flex">
      <div className="w-full flex items-center justify-center p-4">
        <div className="bg-[#111312] p-7 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold text-white mb-2">
            Create new account
          </h3>
          <p className="mb-4 text-sm text-gray-400">
            Fill out the form below to create a new account
          </p>
          <form onSubmit={onSubmit}>
            <div className="mb-6">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                className="w-full border border-gray-800 bg-[#111312] text-gray-300 py-2 px-4 rounded outline-none transition duration-500 ease-in-out hover:border-yellow-500"
                onChange={handleChange}
                value={formData.firstName}
              />
              {errors.find((error) => error.for === "firstName")?.message && (
                <p className="text-red-500">{errors.find((error) => error.for === "firstName")?.message}</p>
              )}
            </div>
            <div className="mb-6">
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                className="w-full border border-gray-800 bg-[#111312] text-gray-300 py-2 px-4 rounded outline-none transition duration-500 ease-in-out hover:border-yellow-500"
                onChange={handleChange}
                value={formData.lastName}
              />
              {errors.find((error) => error.for === "lastName")?.message && (
                <p className="text-red-500">{errors.find((error) => error.for === "lastName")?.message}</p>
              )}
            </div>
            <div className="mb-6">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full border border-gray-800 bg-[#111312] text-gray-300 py-2 px-4 rounded outline-none transition duration-500 ease-in-out hover:border-yellow-500"
                onChange={handleChange}
                value={formData.email}
              />
              {errors.find((error) => error.for === "email")?.message && (
                <p className="text-red-500">{errors.find((error) => error.for === "email")?.message}</p>
              )}
            </div>
            <div className="mb-6 relative">
              <div className='flex justify-content items-center'>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full border border-gray-800 bg-[#111312] text-gray-300 py-2 px-4 rounded outline-none transition duration-500 ease-in-out hover:border-yellow-500"
                onChange={handleChange}
                value={formData.password}
              />
               <button
               type="button"
                className="field-btn absolute right-4 top-1/2 transform -translate-y-1/2"
                aria-label="Toggle password visibility"
                onClick={togglePasswordVisibility}
              >
                <FontAwesomeIcon
                  className="text-gray-400"
                  icon={showPassword ? faEye : faEyeSlash}
                />
              </button>
              </div>
              {errors.find((error) => error.for === "password")?.message && (
                <p className="text-red-500">{errors.find((error) => error.for === "password")?.message}</p>
              )}
            </div>
            <div className="mb-6 rounded-lg relative">
              <div className='flex'>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm password"
                className="w-full border border-gray-800 bg-[#111312] text-gray-300 py-2 px-4 rounded outline-none transition duration-500 ease-in-out hover:border-yellow-500"
                onChange={handleChange}
                value={formData.confirmPassword}
              /> 
               <button
               type="button"
                className="field-btn absolute right-4 top-1/2 transform -translate-y-1/2"
                aria-label="Toggle password visibility"
                onClick={togglePasswordVisibility}
              >
                <FontAwesomeIcon
                  className="text-gray-400"
                  icon={showPassword ? faEye : faEyeSlash}
                />
              </button>
              </div>
              {errors.find((error) => error.for === "confirmPassword")?.message && (
                <p className="text-red-500">{errors.find((error) => error.for === "confirmPassword")?.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="rounded bg-[#24292b] text-white font-bold py-2 px-6 inline-block transition duration-500 ease-in-out hover:bg-yellow-500 hover:text-black"
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Create account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
