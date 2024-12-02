import HeroSection from "@/components/home/Hero";
import HorizontalScrollSection from "@/components/home/HorizontalScrollSection";
import PromoSection from "@/components/home/PromoSection";
import VisaForm from "@/components/home/VisaForm";

export default function Home() {
  return (
   <div>
      <h1>Home Page</h1>
      <HeroSection/>
      <PromoSection/>
      <HorizontalScrollSection/>
      <VisaForm/>
   </div>
  );
}
