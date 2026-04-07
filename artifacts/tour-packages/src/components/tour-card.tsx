import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock, Tag, MapPin } from "lucide-react";

interface TourCardProps {
  id: string | number;
  name: string;
  subtitle: string;
  duration: string;
  price: number;
  originalPrice?: number;
  images: string[];
  destination: string;
}

export function TourCard({
  name,
  subtitle,
  duration,
  price,
  originalPrice,
  images,
}: TourCardProps) {
  const [currentImg, setCurrentImg] = useState(0);
  const savings = originalPrice ? originalPrice - price : 0;

  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImg((i) => (i === 0 ? images.length - 1 : i - 1));
  };

  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImg((i) => (i === images.length - 1 ? 0 : i + 1));
  };

  return (
    <div
      className="group bg-white dark:bg-zinc-900 rounded-[2rem] overflow-hidden border border-gray-100 dark:border-zinc-800 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-500 cursor-pointer"
      data-testid={`card-tour-${name.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {/* Image Slider Section */}
      <div className="relative h-60 overflow-hidden bg-gray-100 dark:bg-zinc-800">
        <div
          className="flex h-full transition-transform duration-700 cubic-bezier(0.4, 0, 0.2, 1)"
          style={{ transform: `translateX(-${currentImg * 100}%)` }}
        >
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${name} - photo ${i + 1}`}
              className="w-full h-full object-cover shrink-0 transition-transform duration-700 group-hover:scale-110"
              style={{ width: "100%" }}
            />
          ))}
        </div>

        {/* Overlay Gradients */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/40 to-transparent" />

        {/* Floating Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <div className="bg-black/40 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/10 tracking-wider uppercase">
            <Clock className="w-3 h-3 text-primary" />
            {duration}
          </div>
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <button
              onClick={prev}
              className="bg-white/90 dark:bg-black/60 backdrop-blur-md hover:bg-white dark:hover:bg-black p-2 rounded-full shadow-lg transition-all active:scale-90"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-4 h-4 text-gray-900 dark:text-white" />
            </button>
            <button
              onClick={next}
              className="bg-white/90 dark:bg-black/60 backdrop-blur-md hover:bg-white dark:hover:bg-black p-2 rounded-full shadow-lg transition-all active:scale-90"
              aria-label="Next photo"
            >
              <ChevronRight className="w-4 h-4 text-gray-900 dark:text-white" />
            </button>
          </div>
        )}

        {/* Pagination Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {images.map((_, i) => (
              <div
                key={i}
                className={`transition-all duration-300 rounded-full h-1.5 ${
                  i === currentImg ? "w-6 bg-white" : "w-1.5 bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-1 text-[10px] font-bold text-primary tracking-widest uppercase mb-1">
            <MapPin className="w-3 h-3" />
            <span>{subtitle}</span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight transition-colors group-hover:text-primary mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
          {name}
        </h3>

        <div className="pt-4 border-t border-gray-100 dark:border-zinc-800 flex items-center justify-between">
          <div className="space-y-1">
             {originalPrice && originalPrice > price && (
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-bold text-green-500 bg-green-50 dark:bg-green-500/10 px-1.5 py-0.5 rounded">
                  Save ₹{(originalPrice - price).toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-gray-400 line-through">
                  ₹{originalPrice.toLocaleString('en-IN')}
                </span>
              </div>
            )}
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-gray-900 dark:text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                ₹{price.toLocaleString('en-IN')}
              </span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">/ person</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-orange-400 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
            <button
              className="relative bg-primary hover:bg-primary-dark text-white text-xs font-bold px-5 py-3 rounded-xl transition-all duration-300 active:scale-95"
              data-testid={`button-book-${name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              Book Trip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
