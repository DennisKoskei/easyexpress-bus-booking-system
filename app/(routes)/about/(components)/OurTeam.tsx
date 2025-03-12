import React from "react";
import Image from "next/image";
import { teamMembers } from "@constants/constants";

const OurTeam = () => {
  return (
    <div className="flex py-16 bg-white px-8 md:px-20">
      <div className="flex flex-col w-[55%]">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          Meet Our Team
        </h1>

        <div className="flex flex-row justify-center gap-4">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="flex flex-col bg-slate-50 shadow-2xl rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-3xl"
            >
              <div className="relative w-full h-64 p-4 py-6 text-center">
                <Image
                  src={member.image}
                  fill
                  style={{ objectFit: "cover" }}
                  alt={member.name}
                />
              </div>
              <div className="p-4 py-6 text-center">
                <h2 className="text-2xl font-semibold text-gray-900">
                  {member.name}
                </h2>
                <p className="text-blue-500 font-medium">{member.role}</p>
                <p className="text-gray-600 mt-2 text-sm">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurTeam;
