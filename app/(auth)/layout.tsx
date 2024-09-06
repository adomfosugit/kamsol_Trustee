import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../(root)/globals.css";
import { Toaster } from "@/components/ui/toaster";
import { getLoggedInUser } from "@/lib/Appwrite/api";
import { redirect } from "next/navigation";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kamsol Trustee - Auth",
  description: "Kamsol Trustee",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) { 
  const user =  await getLoggedInUser()
  if(user){
   redirect('/Dashboard')
  }
  return (
    <html lang="en">
      <body className={inter.className}>
        

        <Toaster />

        <div className="container flex items-center h-screen max-w-4xl ">

            <div className="hidden md:flex 2xl:flex w-1/2 bg-[url('/LoginPageImage.jpg')] h-3/4 bg-no-repeat"/>
            <div className="w-full flex mx-auto md:w-1/2  h-3/4">{children}</div>
         
            
        </div>
            <div>
              <div className="text-center mt--5">
                <p className="text-sm">By Signing up you agree to our
                  <Link href= '/' className="text-kolor underline mr-1 text-sm">Terms of Service </Link>
                  &
                  <Link href='/' className="text-kolor underline">Privacy Policy</Link>
                </p>
              </div>
            </div>
       
        </body>
    </html>
  );
}
