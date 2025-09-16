import React from "react";

const ScreenshotCarousel: React.FC = () => {
  // Placeholder images (replace with real screenshots later)
  const images = [
    "https://via.placeholder.com/300x600?text=Screenshot+1",
    "https://via.placeholder.com/300x600?text=Screenshot+2",
    "https://via.placeholder.com/300x600?text=Screenshot+3",
  ];

  return (
    <div className="flex space-x-4 overflow-x-auto py-4 px-2">
      {images.map((src, idx) => (
        <img
          key={idx}
          src={src}
          alt={`Screenshot ${idx + 1}`}
          className="rounded-lg shadow-md w-72 flex-shrink-0"
        />
      ))}
    </div>
  );
};

export default ScreenshotCarousel;
