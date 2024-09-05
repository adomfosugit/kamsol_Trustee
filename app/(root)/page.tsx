
import About from "@/components/My_ui/About";
import HeroSection from "@/components/My_ui/HeroSection";
import Portfolios from "@/components/My_ui/Portfolios";
import { infocards } from "@/constants";


export default function Home() {
  return (
    <section>
    <div className="mt-12 max-w-8xl mx-auto ">
    <HeroSection />
   </div>
   <div>

    <About />
   
<div>
{infocards.map((list)=> (
      <div  key={list.id} className="h-[700px]" >
         <Portfolios 
         cardTitle= {list.cardTitle}
         subtitle = {list.subtitle}
         imgURL = {list.imgURL}
         route = {list.route}
         writeup= {list.writeup}
         
         />
      </div>
    ))}
   
    

</div>
 
   </div>
    </section>
  
  );
}
