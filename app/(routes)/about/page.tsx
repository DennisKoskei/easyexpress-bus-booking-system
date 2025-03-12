import React from "react";
import Feedback from "./(components)/Feedback";
import AboutUs from "./(components)/AboutUs";
import OurTeam from "./(components)/OurTeam";
import OurValues from "./(components)/OurValues";
import AboutHero from "./(components)/AboutHero";

const AboutUsPage = () => {
  return (
    <div className="flex flex-col">
      <AboutHero />
      <AboutUs />
      <OurTeam />
      <OurValues />
      <Feedback />
    </div>
  );
};

export default AboutUsPage;
