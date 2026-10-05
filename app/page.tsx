import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import About from "@/components/About";
import Doctors from "@/components/Doctors";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import CtaBanner from "@/components/CtaBanner";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Stats />
      <Services />
      <About />
      <Doctors />
      <Gallery />
      <Testimonials />
      <CtaBanner />
      <Faq />
      <Contact />
      <Footer />
      <FloatingButtons />
    </main>
  );
}
