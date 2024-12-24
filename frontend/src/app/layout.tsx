import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/common/Navigation";
import Footer from "@/components/common/Footer";
import ClientProvider from "@/components/common/ClientProvider";
import {Poppins} from "next/font/google"

const poppins  = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});



export const metadata: Metadata = {
  title: "Properties",
  description: "Properties",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={poppins.className}
      >

          <Navigation />
             <ClientProvider>
                {children}  
              </ClientProvider> 
          <Footer/>
      </body>
    </html>
  );
}
