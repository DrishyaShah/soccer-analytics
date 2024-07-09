import Image from "next/image";
import { SessionProvider } from 'next-auth/react';
import "./globals.css"
export default function Home() {
  return (
    <main>
      <p>Hello</p>
      {/* <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider> */}
    </main>
  );
}
