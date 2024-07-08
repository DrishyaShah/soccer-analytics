"use client";

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import axios from "axios";

const SetPassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState([]);
  const [token, setToken] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = [];
    if (!formData.password) {
      newErrors.push({ for: "password", message: "Password is required" });
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.push({
        for: "confirmPassword",
        message: "Passwords do not match",
      });
    }
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      const postData = { token, password: formData.password };

      const headers = {
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        "/api/users/setPassword",
        postData,
        headers
      );
      if (response.status === 200) {
        toast.success("Password reset successful");
      } else {
        toast.error("Password reset failed");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    }
  };

  useEffect(() => {
    // const urlToken = window.location.search.split("=")[1];
    // setToken(urlToken || "");
    const urlToken = new URLSearchParams(window.location.search).get("token");
    setToken(urlToken || "");
  }, []);

  return (
    <div className="min-h-screen bg-black flex">
      <div className="w-full flex items-center justify-center p-4">
        <div className="bg-[#111312] p-7 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold text-white mb-6">Reset Password</h3>
          <form onSubmit={onSubmit}>
            <div className="mb-6 relative">
              <div className="flex justify-content items-center">
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
                <p className="text-red-500">
                  {errors.find((error) => error.for === "password")?.message}
                </p>
              )}
            </div>
            <div className="mb-6 rounded-lg relative">
              <div className="flex">
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
              {errors.find((error) => error.for === "confirmPassword")
                ?.message && (
                <p className="text-red-500">
                  {
                    errors.find((error) => error.for === "confirmPassword")
                      ?.message
                  }
                </p>
              )}
            </div>
            <button
              type="submit"
              className="rounded bg-[#24292b] text-white font-bold py-2 px-6  inline-block transition duration-500 ease-in-out hover:bg-yellow-500 hover:text-black "
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SetPassword;
