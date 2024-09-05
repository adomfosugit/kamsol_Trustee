import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Topbar from "@/components/My_ui/Tobar";
import Footer from "@/components/My_ui/Footer";
const inter = Inter({ subsets: ["latin"] });
import type { Viewport } from 'next'

export const metadata: Metadata = {
  title: "Kamsol Trustee",
  description: "Kamsol Trustee -HomePage",
  
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body className={inter.className}>  
        <Topbar />
        {children}
       <Footer /> 
        </body>
    </html>
  );
}
