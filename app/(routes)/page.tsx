import React from "react";
import Hero from "./Hero";
import PopularRoutes from "./PopularRoutes";
import WhyUs from "./WhyUs";
import Testimonials from "./Testimonials";
import PopularDestinations from "./PopularDestinations";
import DownloadApp from "./DownloadApp";

// API endpoint to take in the following: Departure, Destination and date
// It then queries the database/ filters rows with the departure and destination and date
// The results are then given to the search results page.

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
