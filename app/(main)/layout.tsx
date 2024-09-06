import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '../(root)/globals.css';
import { getLoggedInUser } from "@/lib/Appwrite/api";
import { redirect } from "next/navigation";
import Sidebar from "@/components/My_ui/Sidebar";
import Logo from "@/components/My_ui/Logo";
import MobileNav from "@/components/My_ui/MobileNav";
import Image from "next/image";
const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Kamsol Trustee -Main",
  description: "Kamsol Trustee -Main",
  
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const user =  await getLoggedInUser()
  //console.log(user?.name)
  if(!user){
   redirect('/sign-in')
  }
  return (
    <html lang="en">
      
      <body className={inter.className}>  
    <main className="flex h-screen w-full ">
        <Sidebar user = {user} />
        <div className="flex size-full flex-col">
            <div className="flex h-20 items-center justify-between p-5 shadow-xl sm:p-5 md:hidden">
                <Image src='/icon.jpg' width={150} height={100} alt="logo" />
            <div>
                <MobileNav user1={user}/>
            </div>
            </div>
            {children}
        </div>
    

    </main>
    
      {/* <Footer /> */} 
        </body>
    </html>
  );
}
