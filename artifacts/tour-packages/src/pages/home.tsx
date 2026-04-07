import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { DestinationTabs } from "@/components/destination-tabs";
import { TourCard } from "@/components/tour-card";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";

const CDN = "https://vl-prod-static.b-cdn.net/system/images";

type Tour = {
  id: number;
  name: string;
  slug: string;
  destination: string;
  durationDays: number;
  price: string | number;
  discountPrice?: string | number;
  coverImage?: string;
  galleryImages: string[];
};

const sections = [
  {
    id: "top-selling",
    title: "Top Selling Group Trips",
    filterNames: [
      "Manali Kasol Amritsar Backpacking Trip",
      "Winter Spiti Road Trip",
      "Kedarnath Badrinath – Tungnath & Rishikesh",
      "Leh Ladakh Bike Expedition 2026",
      "Spiti Valley Road Trip"
    ],
  },
  {
    id: "manali",
    title: "Manali & Himachal Pradesh",
    tags: ["manali"],
  },
  {
    id: "spiti",
    title: "Spiti Valley",
    tags: ["spiti"],
  },
  {
    id: "ladakh",
    title: "Leh Ladakh",
    tags: ["ladakh"],
  },
  {
    id: "kedarnath",
    title: "Kedarnath & Rishikesh",
    tags: ["kedarnath"],
  },
  {
    id: "kerala",
    title: "South India – Kerala",
    tags: ["kerala"],
  },
];

function toursForTab(tab: string, allTours: Tour[]): { sectionTitle: string; tours: Tour[] }[] {
  if (tab === "all") {
    return sections.map((sec) => {
      const tours = sec.filterNames
        ? allTours.filter((t: any) => sec.filterNames!.includes(t.name))
        : allTours.filter((t: any) => sec.tags!.some((tag) => t.destination.toLowerCase().includes(tag)));
      return { sectionTitle: sec.title, tours };
    }).filter((s) => s.tours.length > 0);
  }
  const tours = allTours.filter((t: any) => t.destination.toLowerCase().includes(tab.toLowerCase()));
  if (!tours.length) return [];
  const sec = sections.find((s) => s.tags?.includes(tab));
  return [{ sectionTitle: sec?.title ?? "Tour Packages", tours }];
}

function Home() {
  const [activeTab, setActiveTab] = useState("all");

  const { data: allTours = [], isLoading } = useQuery<Tour[]>({
    queryKey: ["tours"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/api/tours");
      if (!res.ok) throw new Error("Failed to fetch tours");
      return res.json();
    },
  });

  const pageSections = toursForTab(activeTab, allTours);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
        <p className="text-gray-500 font-medium tracking-wide">Loading amazing trips...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "Poppins, sans-serif" }}>
      <Navbar />
      <DestinationTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Hero Banner */}
      <div className="relative w-full overflow-hidden" style={{ height: '460px' }}>
        <img
          src="https://vl-prod-static.b-cdn.net/system/images/000/780/691/c436acb230aef2966afeac73a90aa076/original/Purple_Illustration_City_Desktop_Wallpaper.jpg"
          alt="Discover Your Next Adventure"
          className="w-full h-full object-cover scale-105 active:scale-110 transition-transform duration-10000 ease-linear"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 flex flex-col items-center justify-center text-center px-6">
          <div className="max-w-4xl space-y-4">
            <span className="inline-block px-4 py-1.5 bg-primary/20 backdrop-blur-md border border-primary/30 text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full mb-2">
              Explore the Extraordinary
            </span>
            <h1 className="text-4xl md:text-7xl font-extrabold text-white leading-[1.1] mb-2 drop-shadow-2xl">
              Discover Your Next<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">Epic Adventure</span>
            </h1>
            <p className="text-white/80 text-base md:text-xl max-w-2xl mx-auto font-medium tracking-wide">
              "One Trip at a Time. Unforgettable experiences curated for the next generation of explorers."
            </p>
            <div className="pt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#top-selling"
                className="bg-primary hover:bg-red-600 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 text-sm shadow-xl shadow-red-500/25 hover:shadow-red-500/40 hover:-translate-y-1"
              >
                Browse Expeditions
              </a>
              <a
                href="https://www.youthcamping.in/collections/tours"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 font-bold px-8 py-4 rounded-2xl transition-all duration-300 text-sm"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Tour Sections */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-10 space-y-14">
        {pageSections.map((sec) => (
          <section key={sec.sectionTitle}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">{sec.sectionTitle}</h2>
              <a
                href="https://www.youthcamping.in/collections/tours"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary font-semibold hover:underline"
              >
                View All
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {sec.tours.map((tour) => (
                <Link
                  key={tour.id}
                  href={`/tour/${tour.id}`}
                  className="block no-underline"
                >
                  <TourCard
                    id={tour.id}
                    name={tour.name}
                    subtitle={tour.destination}
                    duration={`${tour.durationDays} Days`}
                    price={typeof tour.price === 'string' ? parseFloat(tour.price) : tour.price}
                    originalPrice={tour.discountPrice ? (typeof tour.discountPrice === 'string' ? parseFloat(tour.discountPrice) : tour.discountPrice) : undefined}
                    images={[tour.coverImage, ...(tour.galleryImages || [])].filter(Boolean) as string[]}
                    destination={tour.destination}
                  />
                </Link>
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* About Strip */}
      <section className="bg-white border-y border-gray-100 py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Who We Are</h2>
          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            At YouthCamping, we're all about awesome trips across India! Whether you're into road trips, trekking, or just
            exploring cool places, we've got you covered. Our trips are designed for groups of like-minded people who want to
            have a blast together. We take care of everything — from comfortable accommodations to guided tours — all without
            breaking the bank. Just tell us when you want to go, and get ready for an epic adventure filled with fun, history,
            and great food! Join us for the trip of a lifetime.
          </p>
          <div className="mt-6 flex items-center justify-center gap-4 flex-wrap text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              Instant Confirmation
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              Secure & Easy Booking
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              Age 12–35 Group Trips
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              Starting from ₹11,999
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="mb-4">
                <span className="text-xl font-bold tracking-tight text-white flex items-center">
                  Youth<span className="text-primary">Camping</span>
                  <span className="text-[10px] font-bold text-gray-400 ml-0.5 mt-1 border border-gray-700 px-1 rounded-sm">.IN</span>
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Your trusted travel partner for unforgettable youth camping trips and customised tour packages across India.
              </p>
              <div className="flex gap-3">
                {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-sm text-gray-300 uppercase tracking-wider mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                {["Tour Packages", "Group Trips", "About Us", "Contact Us", "Privacy Policy", "Terms & Conditions"].map((l) => (
                  <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>

            {/* Destinations */}
            <div>
              <h4 className="font-semibold text-sm text-gray-300 uppercase tracking-wider mb-4">Destinations</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                {["Manali & Kasol", "Spiti Valley", "Leh Ladakh", "Kedarnath", "Shimla", "Kerala"].map((l) => (
                  <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-sm text-gray-300 uppercase tracking-wider mb-4">Contact Us</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <Phone className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                  <span>+91 99242 46267</span>
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                  <span>youthcampingmedia@gmail.com</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                  <span>Ahmedabad, Gujarat, India</span>
                </li>
                <li className="flex items-start gap-2 mt-1">
                  <span className="text-gray-500 text-xs">Available 10AM – 7PM</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
            <p>© {new Date().getFullYear()} YouthCamping. All rights reserved.</p>
            <p className="mt-2 md:mt-0">Made with care for travellers across India</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
