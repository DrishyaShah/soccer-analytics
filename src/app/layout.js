
// import { GoogleRecaptchaProvider } from 'react-google-recaptcha-v3';
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import GoogleReCaptchaWrapper from "./api/GoogleCaptchaWrapper";
const inter = Inter({ subsets: ["latin"] });
// import GoogleCaptcha from './GoogleCaptcha';

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
       
      <body className={inter.className}>
      {/* <NextAuthProvider> */}
    <ToastContainer />
<GoogleReCaptchaWrapper>
        {children}
        </GoogleReCaptchaWrapper>   
        </body>
    </html>
  );
}
