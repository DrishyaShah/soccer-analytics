"use client";
import React, { useEffect, useState } from 'react';
import { signupSchema } from '@/schemas/signupSchema';

const SignupForm = () => {
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
      // Perform your form submission logic here
    }

    const res = await fetch('/api/users/signup' , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({formData}),
    })
    if (res.ok)
    {
      const data = await res.json();
      setMessage('Signup successful! Welcome, ' + data.user.username);
      setFormData('');
    }
    else {
      const errorData = await res.json();
      setErrors([{ for: 'signup', message: 'Signup failed: ' + errorData.error }]); // Handle error case properly
    }

    setIsLoading(false);
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
            <div className="mb-6">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full border border-gray-800 bg-[#111312] text-gray-300 py-2 px-4 rounded outline-none transition duration-500 ease-in-out hover:border-yellow-500"
                onChange={handleChange}
                value={formData.password}
              />
              {errors.find((error) => error.for === "password")?.message && (
                <p className="text-red-500">{errors.find((error) => error.for === "password")?.message}</p>
              )}
            </div>
            <div className="mb-6 rounded-lg">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                className="w-full border border-gray-800 bg-[#111312] text-gray-300 py-2 px-4 rounded outline-none transition duration-500 ease-in-out hover:border-yellow-500"
                onChange={handleChange}
                value={formData.confirmPassword}
              />
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
