import React from "react";
import logo from "../assets/well-walt-logo.png"; // adjust path if needed

const WWSFooter: React.FC = () => {
  return (
    <footer className="bg-gray-900 py-6 text-center text-gray-200 text-sm font-mono">
  <div className="flex flex-col items-center justify-center gap-1">
    <a href="https://www.wellwaltstudios.com" target="_blank" rel="noopener noreferrer">
      <img src={logo} alt="Well Walt Studios Logo" className="h-8 hover:opacity-80 transition-opacity duration-200" />
    </a>
    <p className="font-bold text-gray-200">
      👩🏽‍💻 A creation by Well Walt Studios
    </p>
    <p className="text-xs text-gray-400">Building apps that build people ✨</p>
  </div>
</footer>
  );
};

export default WWSFooter;
