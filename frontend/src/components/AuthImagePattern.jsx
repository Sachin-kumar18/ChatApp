import React from "react";
import background2 from "../assets/background2.jpg"; // your illustration image

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div>
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] w-full bg-blue-500 mt-16">
        <div className="flex flex-col items-center text-center px-6">
          {/* Illustration Image */}
          <img
            src={background2}
            alt="Welcome Illustration"
            className="max-w-lg w-full mb-8"
          />

          {/* Text */}
          <h2 className="text-3xl font-bold text-white mb-4">{title}</h2>
          <p className="text-white text-lg">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

export default AuthImagePattern;
