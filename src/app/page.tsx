import Hero from "@/components/sections/Hero";
import Intro from "@/components/sections/Intro";
import Collections from "@/components/sections/Collections";
import ArtOfStone from "@/components/sections/ArtOfStone";
import Discover from "@/components/sections/Discover";
import Process from "@/components/sections/Process";
import Gallery from "@/components/sections/Gallery";
import WhyUs from "@/components/sections/WhyUs";
import Enquiry from "@/components/sections/Enquiry";
import Reveals from "@/components/Reveals";

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Collections />
      <ArtOfStone />
      <Discover />
      <Process />
      <Gallery />
      <WhyUs />
      <Enquiry />
      <Reveals />
    </>
  );
}
