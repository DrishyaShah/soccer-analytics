"use client"

import axios from "axios"

import Link from "next/link";
import React, {useEffect, useState} from "react";
import { toast } from "react-toastify";

export default function VerifyEmailPage()
{
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const [loading, setLoading] = useState(false);

    const postData = { token };

const headers = {
    'Content-Type': 'application/json'
};
   
    const verifyUserEmail = async () => 
        {
            try 
            {
                console.log("Token to verify:", token);
        const response =     await axios.post('/api/users/verifyEmail' , postData, headers)
        console.log("Verification response:", response.data);
             console.log(token)
             setVerified(true)
             toast.success("Verified Successfully")
            }

            catch (error)
            {
                setError(true);
                console.log("Verification error:", error.response ? error.response.data : error.message);
                toast.error("Verification failed")
            }
        }

        useEffect(() => 
        {
            // const urlToken = window.location.search.split("=")[1];
            // setToken(urlToken || "");
            const urlToken = new URLSearchParams(window.location.search).get("token");
            setToken(urlToken || "");
          }, []);
        

        useEffect(() => 
        {
            if(token.length > 0)
                {
                    verifyUserEmail();
                }
        }, [token]);
        
        

        return (
            <div className="flex flex-col items-center justify-center min h-screen py-2 mb-4">
                <h1 className="text-4xl text-white">Verify Email</h1>
                {/* <h2 className="p-2 bg-yellow-500 text-black mt-2">{token ? `${token}` : "no token"}</h2> */}
            {
                verified && (
                    <div className="mt-4"> 
                        <h2 className="text-2xl text-yellow-300">Email Verified</h2>
                        <p className="text-white mt-2">
                        <Link className="text-blue-500 underline " href="/login">
                        Click here to login
                         </Link>
                         </p>
                    </div>
                )
            }
             {
                error && (
                    <div>
                        <h2 className="text-2xl bg-red-500 text-black">Error</h2>
                        
                    </div> 
                )
            } 
            
            </div>
        
        
    )
}