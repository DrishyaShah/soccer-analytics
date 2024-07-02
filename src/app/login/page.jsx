"use client";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import "../globals.css"
import axios from "axios";
import {toast} from "react-toastify";
const LoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => 
  {
    const userStore = localStorage.getItem("email");
    const passStore = localStorage.getItem("password")
    const rmeStore = localStorage.getItem("rememberMe");
    if (userStore && passStore && rmeStore) {
      setFormData({ email: userStore, password: passStore })
      setRememberMe(rmeStore === "true" ? true : false)
    }
  }, []);

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/users/login", formData);
      console.log("Login Success", res.data);
      toast.success("Login Successful" , {className: "toast-success"});
      if (rememberMe)
        {
          localStorage.setItem("email" , formData.email);
          localStorage.setItem("password" , formData.password);
          localStorage.setItem("rememberMe", true);
        }
        else {
          localStorage.removeItem("username");
          localStorage.removeItem("password");
          localStorage.removeItem("rememberMe");
      }
      router.push("/dashboard");
    } catch (error) {
      console.log("Login failed", error.message);
      toast.error("Login failed", {className: "toast-error"});
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (formData.email.length > 0 && formData.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [formData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="min-h-screen bg-black flex">
      <div className="w-full flex items-center justify-center p-4">
        <div className="bg-[#111312] p-7 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold text-white mb-6">Account Login</h3>
          <form onSubmit={onLogin}>
            <div className="mb-6">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full border border-gray-800 bg-[#111312] text-gray-300 py-2 px-4 rounded outline-none transition duration-500 ease-in-out hover:border-yellow-500"
              />
            </div>
            <div className="flex mb-6 relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-800 bg-[#111312] text-gray-300 py-2 px-4 rounded outline-none transition duration-500 ease-in-out hover:border-yellow-500"
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
            <div className="mb-6 flex items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="border border-gray-800 bg-[#111312] text-gray-300 rounded outline-none transition duration-500 ease-in-out hover:border-yellow-500 mr-2"
                id="remember-me-checkbox"
              />
              <label htmlFor="remember-me-checkbox" className="text-gray-400">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className="rounded bg-[#24292b] text-white font-bold py-2 px-6  inline-block transition duration-500 ease-in-out hover:bg-yellow-500 hover:text-black "
            >
              {isLoading ? "Logging in" : "Log in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
