// src/app/api/GoogleCaptchaWrapper.jsx

"use client";

import { GoogleReCaptchaProvider as ReCaptchaProvider } from "react-google-recaptcha-v3";
import React from "react";

export default function GoogleReCaptchaWrapper({ children }) {
    const recaptchaKey = process?.env?.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    return (
        <ReCaptchaProvider reCaptchaKey={recaptchaKey ?? "NOT DEFINED"}>
            {children}
        </ReCaptchaProvider>
    );
}
