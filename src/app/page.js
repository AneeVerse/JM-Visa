import AboutUs from "@/components/home/AboutUs";
import BlogComponent from "@/components/home/BlogComponent";
import FeedbackReviewComponent from "@/components/home/FeedbackReviewComponent";
import HeroSection from "@/components/home/Hero";
import HorizontalScrollSection from "@/components/home/HorizontalScrollSection";
import PromoSection from "@/components/home/PromoSection";
import VisaCategories from "@/components/home/VisaCategories";
import VisaForm from "@/components/home/VisaForm";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
   <div>
      <HeroSection/>
      <VisaCategories/>
      <HorizontalScrollSection/>
      <div className="relative ">
      <AboutUs/>
      <PromoSection/>
      <div className="absolute bottom-20 bg-gradient-to-br from-white via-white to-blue-700 blur-lg bg-opacity-50  w-full min-h-full h-[500px] -z-10"> </div>

      <div className="absolute top-20 left-0 bg-gradient-to-br from-blue-600 via-white to-white blur-lg bg-opacity-50  w-full  h-[500px] -z-10"> </div>
      </div>
      <FeedbackReviewComponent/>
      <BlogComponent/>
      <div className="bg-gradient-to-br from-blue-900 via-blue-900 to-black">
      <VisaForm/>
      <Footer/>
      </div>
   </div>
  );
}
