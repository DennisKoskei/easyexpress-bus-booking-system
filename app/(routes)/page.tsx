import React from "react";
import Hero from "./Hero";
import PopularRoutes from "./PopularRoutes";
import WhyUs from "./WhyUs";
import Testimonials from "./Testimonials";
import PopularDestinations from "./PopularDestinations";
import DownloadApp from "./DownloadApp";

const Homepage = () => {
  return (
    <div className="flex flex-col mx-auto">
      <Hero />
      <PopularRoutes />
      <WhyUs />
      <Testimonials />
      <PopularDestinations />
      <DownloadApp />
    </div>
  );
};

export default Homepage;
