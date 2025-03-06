import React from "react";
import Hero from "./(Homepage-components)/Hero";
import PopularRoutes from "./(Homepage-components)/PopularRoutes";
import WhyUs from "./(Homepage-components)/WhyUs";
import Testimonials from "./(Homepage-components)/Testimonials";
import PopularDestinations from "./(Homepage-components)/PopularDestinations";
import DownloadApp from "./(Homepage-components)/DownloadApp";

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
