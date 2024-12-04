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
      <AboutUs/>
      <PromoSection/>
      <FeedbackReviewComponent/>
      <BlogComponent/>
      <div className="bg-gradient-to-br from-blue-900 via-blue-900 to-black">
      <VisaForm/>
      <Footer/>
      </div>
   </div>
  );
}
