import { useState, useEffect } from "react";

export default function useHeroCarousel(images, interval = 5000) {
  const [currentImage, setCurrentImage] = useState(0);

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  // Preload next image
  useEffect(() => {
    const nextImage = (currentImage + 1) % images.length;
    const img = new Image();
    img.src = images[nextImage];
  }, [currentImage, images]);

  return { currentImage, setCurrentImage };
}
