import HeroSection from "../components/HeroSection";
import MenuList from "../components/Menu/MenuList";
import ReviewList from "../components/Reviews/ReviewList";
import EventList from "../components/Events/EventList";
import AboutUs from "../components/AboutUs";
import Specials from "../components/Specials";
import Gallery from "../components/Gallery";
import Reservation from "../components/Reservation";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <div className="space-y-16">
      <HeroSection />
      <AboutUs />
      <Specials />
      <ReviewList />
      <EventList />
      <Gallery autoPlay interval={4500} showArrows showDots />
      <Reservation />
      <Contact />
    </div>
  );
}
