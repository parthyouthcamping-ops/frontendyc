import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

const destinations = [
  { id: "all", label: "All Trips", icon: "🌍" },
  { id: "manali", label: "Manali", icon: "🏕️" },
  { id: "spiti", label: "Spiti Valley", icon: "⛰️" },
  { id: "ladakh", label: "Ladakh", icon: "🏔️" },
  { id: "kedarnath", label: "Kedarnath", icon: "🛕" },
  { id: "shimla", label: "Shimla", icon: "🌄" },
  { id: "kerala", label: "Kerala", icon: "🌴" },
  { id: "kasol", label: "Kasol", icon: "🌿" },
];

interface DestinationTabsProps {
  activeTab: string;
  onTabChange: (id: string) => void;
}

export function DestinationTabs({ activeTab, onTabChange }: DestinationTabsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeft(scrollLeft > 10);
    setShowRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      checkScroll();
    }
    return () => el?.removeEventListener('scroll', checkScroll);
  }, []);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });
  };

  return (
    <div className="bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-gray-100 dark:border-zinc-900 sticky top-14 md:top-16 z-[90] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
        
        {/* Left Gradient & Arrow */}
        {showLeft && (
          <div className="absolute left-0 top-0 bottom-0 flex items-center z-20 pointer-events-none">
            <div className="w-16 h-full bg-gradient-to-r from-white dark:from-zinc-950 to-transparent" />
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-auto bg-white dark:bg-zinc-800 shadow-xl border border-gray-100 dark:border-zinc-700 rounded-full w-10 h-10 flex items-center justify-center hover:scale-110 active:scale-95 transition-all text-gray-900 dark:text-white"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        )}

        <div
          ref={scrollRef}
          className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-4 px-2"
        >
          {destinations.map((dest) => (
            <button
              key={dest.id}
              onClick={() => onTabChange(dest.id)}
              className={`group flex items-center gap-2.5 px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all shrink-0 border ${
                activeTab === dest.id
                  ? "bg-gray-900 dark:bg-white text-white dark:text-black border-gray-900 dark:border-white shadow-xl shadow-black/10 dark:shadow-white/10 scale-105"
                  : "bg-white dark:bg-zinc-900 text-gray-500 dark:text-zinc-400 border-gray-100 dark:border-zinc-800 hover:border-primary/50 hover:text-primary dark:hover:text-primary transition-all duration-300"
              }`}
            >
              <span className="text-lg grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-125 transition-all">{dest.icon}</span>
              <span>{dest.label}</span>
              {activeTab === dest.id && <Sparkles className="w-3 h-3 text-primary animate-pulse" />}
            </button>
          ))}
        </div>

        {/* Right Gradient & Arrow */}
        {showRight && (
          <div className="absolute right-0 top-0 bottom-0 flex items-center z-20 pointer-events-none">
            <div className="w-16 h-full bg-gradient-to-l from-white dark:from-zinc-950 to-transparent" />
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-auto bg-white dark:bg-zinc-800 shadow-xl border border-gray-100 dark:border-zinc-700 rounded-full w-10 h-10 flex items-center justify-center hover:scale-110 active:scale-95 transition-all text-gray-900 dark:text-white"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
