import { useEffect, useRef, useState } from "react";

const images = [
  "https://wallpapercave.com/dwp2x/wp2003951.jpg",
  "https://wallpapercave.com/wp/wp2481186.jpg",
  "https://wallpapercave.com/wp/wp3067499.jpg",
  "https://www.hdwallpapers.in/thumbs/2020/village_near_alps_lake_around_mountain_panorama_switzerland_hd_travel-t2.jpg",
];

const HomeSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }

    intervalRef.current = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      {images.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === activeIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={src}
            alt={`Travearth destination ${index + 1}`}
            className="w-full h-full object-cover"
            loading={index === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}

      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
        {images.map((_, index) => (
          <button
            key={`dot-${index}`}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => setActiveIndex(index)}
            className={`h-2.5 w-2.5 rounded-full transition-all ${
              index === activeIndex ? "bg-primary-foreground w-6" : "bg-primary-foreground/60 hover:bg-primary-foreground/90"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeSlider;
