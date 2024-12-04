import AboutUs from "@/components/home/AboutUs";
import BlogComponent from "@/components/home/BlogComponent";
import FeedbackReviewComponent from "@/components/home/FeedbackReviewComponent";
import HeroSection from "@/components/home/Hero";
import HorizontalScrollSection from "@/components/home/HorizontalScrollSection";
import PromoSection from "@/components/home/PromoSection";
import VisaCategories from "@/components/home/VisaCategories";
import VisaForm from "@/components/home/VisaForm";

export default function Home() {
  return (
   <div>
      <h1>Home Page</h1>
      <HeroSection/>
      <VisaCategories/>
      <HorizontalScrollSection/>
      <PromoSection/>
      <FeedbackReviewComponent/>
      <BlogComponent/>
      <AboutUs/>
      <VisaForm/>
   </div>
  );
}
