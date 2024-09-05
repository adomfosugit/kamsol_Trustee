import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../(root)/globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kamsol Trustee -auth",
  description: "Kamsol Trustee",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        

        <Toaster />

        <div className="container flex items-center h-screen ">

            <div className="hidden 2xl:flex w-1/2 bg-[url('/LoginPageImage.jpg')] h-[800px]"/>
            <div className="w-full flex items-center mx-auto md:w-1/2  h-[800px]">{children}</div>
         
            
        </div>
       
        </body>
    </html>
  );
}
