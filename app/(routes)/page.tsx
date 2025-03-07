import React from "react";
import Hero from "@app/(Homepage-components)/Hero";
import PopularRoutes from "@app/(Homepage-components)/PopularRoutes";
import WhyUs from "@app/(Homepage-components)/WhyUs";
import Testimonials from "@app/(Homepage-components)/Testimonials";
import PopularDestinations from "@app/(Homepage-components)/PopularDestinations";
import DownloadApp from "@app/(Homepage-components)/DownloadApp";

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
