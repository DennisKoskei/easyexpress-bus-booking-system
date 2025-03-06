import React from "react";
import Image from "next/image";
import SearchBox from "./SearchBox";

const Hero = () => {
  return (
    <div className="relative h-[400px] w-full">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/Assets/bus-wallpaper-bg.jpg"
          alt="Bus Travel"
          fill
          style={{ objectFit: "cover" }}
          priority
          className="z-0 backdrop-blur-[1px]"
        />
        {/* Optional: Overlay for better contrast */}
        <div className="absolute inset-0 bg-blue-700/10"></div>
      </div>

      {/* Search Section */}
      <SearchBox />
    </div>
  );
};

export default Hero;
