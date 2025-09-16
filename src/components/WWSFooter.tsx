import React from "react";
import logo from "../assets/well-walt-logo.png"; // adjust path if needed

const WWSFooter: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-6 text-center text-gray-600 text-sm">
      <div className="flex flex-col items-center justify-center gap-2">
        <img src={logo} alt="Well Walt Studios Logo" className="h-8" />
        <p className="text-gray-700 font-medium">
          👩🏽‍💻 A creation by <span className="font-bold">Well Walt Studios</span>
        </p>
        <p className="text-xs text-gray-500">Building apps that build people ✨</p>
      </div>
    </footer>
  );
};

export default WWSFooter;
