"use client"

import React, {useEffect} from 'react';

const LoginPage = () => {

  useEffect(() => {
    
    document.body.style.overflow = 'hidden';

   
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-black flex">
     
      <div className="w-full flex items-center justify-center p-4">
        <div className="bg-[#111312] p-7 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold text-white mb-6">Account Login</h3>
          <form action="#">
            <div className="mb-6">
              <input type="text" placeholder="Login" className="w-full border border-gray-800 bg-[#111312] text-gray-300 py-2 px-4 rounded outline-none transition duration-500 ease-in-out hover:border-yellow-500" />
            </div>
            <div className="mb-6">
              <input type="password" placeholder="Password" className="w-full border border-gray-800 bg-[#111312] text-gray-300 py-2 px-4 rounded outline-none transition duration-500 ease-in-out hover:border-yellow-500"  />
            </div>
            <div className="mb-6 flex items-center">
  <input
    type="checkbox"
    className="border border-gray-800 bg-[#111312] text-gray-300 rounded outline-none transition duration-500 ease-in-out hover:border-yellow-500 mr-2"
    id="remember-me-checkbox"
  />
  <label htmlFor="remember-me-checkbox" className="text-gray-400">
    Remember me
  </label>
</div>
            
            <button className="rounded bg-[#24292b] text-white font-bold py-2 px-6  inline-block transition duration-500 ease-in-out hover:bg-yellow-500 hover:text-black ">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
