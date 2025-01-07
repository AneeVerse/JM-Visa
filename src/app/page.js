import AboutUs from "@/components/home/AboutUs";
import BlogComponent from "@/components/home/BlogComponent";
import FeedbackReviewComponent from "@/components/home/FeedbackReviewComponent";
import HeroSection from "@/components/home/Hero";
import HorizontalScrollSection from "@/components/home/HorizontalScrollSection";
import PopupForm from "@/components/home/PopupForm";
import PromoSection from "@/components/home/PromoSection";
import VideoTestimonial from "@/components/home/VideoTestimonial";
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

      <div className="bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500">
      <AboutUs/>
      <PromoSection/>
      </div>
      <div className="absolute bottom-20 bg-gradient-to-br from-white via-white to-blue-200 blur-2xl bg-opacity-60  w-full min-h-full h-[500px] -z-10"> </div>

      <div className="absolute top-20 left-0 bg-gradient-to-br from-blue-200 via-white to-white blur-2xl bg-opacity-60   w-full  h-[500px] -z-10"> </div>
      </div>
      <FeedbackReviewComponent/>
      {/* <VideoTestimonial/> */}
      <BlogComponent/>
      <div className="bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500">
      <VisaForm/>

      <Footer/>
      <PopupForm/>
      </div>
   </div>
  );
}
