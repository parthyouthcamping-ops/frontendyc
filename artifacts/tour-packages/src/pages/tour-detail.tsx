import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Navbar } from "@/components/navbar";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Tag, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

type Tour = {
  id: number;
  name: string;
  slug: string;
  destination: string;
  durationDays: number;
  price: string | number;
  discountPrice?: string | number;
  description: string;
  coverImage: string;
  galleryImages: string[];
};

export default function TourDetail() {
  const params = useParams<{ id: string }>();
  const { toast } = useToast();
  const [currentImg, setCurrentImg] = useState(0);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    travelers: "1",
  });

  const { data: tour, isLoading, error } = useQuery<Tour>({
    queryKey: ["tour", params.id],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/api/tours/${params.id}`);
      if (!res.ok) throw new Error("Failed to fetch tour details");
      return res.json();
    },
    enabled: !!params.id,
  });

  const allImages = tour ? [tour.coverImage, ...(tour.galleryImages || [])].filter(Boolean) : [];

  const nextImg = () => {
    if (allImages.length) {
      setCurrentImg((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
    }
  };

  const prevImg = () => {
    if (allImages.length) {
      setCurrentImg((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
    }
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsBookingLoading(true);
    
    try {
      const res = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          tourId: tour?.id,
        })
      });
      
      if (!res.ok) throw new Error("Booking failed");
      
      setBookingSuccess(true);
      toast({
        title: "Booking Confirmed! 🎉",
        description: "We'll be in touch with you shortly to finalize your trip.",
      });
      
      // Auto-reset and close after 3 seconds
      setTimeout(() => {
        setIsBookingModalOpen(false);
        setBookingSuccess(false);
        setFormData({ name: "", phone: "", travelers: "1" });
      }, 3000);
      
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Booking Error",
        description: "Something went wrong. Please try again or call us.",
      });
    } finally {
      setIsBookingLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
        <p className="text-gray-500 font-medium">Loading tour details...</p>
      </div>
    );
  }

  if (error || !tour) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tour Not Found</h2>
          <p className="text-gray-500">We couldn't find the trip you're looking for.</p>
        </div>
      </div>
    );
  }

  const tourPrice = typeof tour.price === 'string' ? parseFloat(tour.price) : tour.price;
  const tourDiscountPrice = tour.discountPrice ? (typeof tour.discountPrice === 'string' ? parseFloat(tour.discountPrice) : tour.discountPrice) : undefined;
  const savings = tourDiscountPrice ? tourDiscountPrice - tourPrice : 0;

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "Poppins, sans-serif" }}>
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Left Column - Gallery */}
          <div className="w-full lg:w-2/3">
            <div className="relative rounded-2xl overflow-hidden bg-gray-200 aspect-[4/3] group">
              <img 
                src={allImages[currentImg]} 
                alt={`${tour.name} full view`} 
                className="w-full h-full object-cover transition-transform duration-500"
              />
              
              {allImages.length > 1 && (
                <>
                  <button 
                    onClick={prevImg}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronLeft className="w-6 h-6 text-gray-800" />
                  </button>
                  <button 
                    onClick={nextImg}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronRight className="w-6 h-6 text-gray-800" />
                  </button>
                  
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {allImages.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImg(idx)}
                        className={`transition-all rounded-full ${idx === currentImg ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/60"}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
            
            <div className="mt-4 flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {allImages.map((src, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setCurrentImg(idx)}
                  className={`w-24 h-20 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${idx === currentImg ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"}`}
                >
                  <img src={src} className="w-full h-full object-cover" alt="thumbnail" />
                </button>
              ))}
            </div>
            
            {/* Description Section */}
            <div className="mt-10 bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">About the Trip</h2>
              <div className="text-gray-600 leading-relaxed whitespace-pre-line text-sm md:text-base">
                <p>Join our exclusive <b>{tour.name}</b>!</p>
                <br/>
                <p>Experience the beauty of {tour.destination} over {tour.durationDays} Days. This curated itinerary is designed for youth travelers looking for an unforgettable adventure.</p>
                <br/>
                <p><b>Highlights:</b></p>
                <p>{tour.description || "A wonderful journey through " + tour.destination}</p>
                <br/>
                <p>All basic amenities, transport coordinations, and guidance are provided.</p>
              </div>
            </div>
          </div>
          
          {/* Right Column - Booking Card */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-28 bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
              <div className="mb-2">
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 text-xs font-bold uppercase tracking-wider rounded-md mb-3">
                  {tour.durationDays} Days
                </span>
                <h1 className="text-2xl font-black text-gray-900 leading-tight mb-2">
                  {tour.name}
                </h1>
                <p className="text-gray-500 font-medium text-sm">
                  {tour.destination}
                </p>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-100 mb-8">
                {savings > 0 && (
                  <div className="flex items-center gap-1.5 mb-2">
                    <Tag className="w-4 h-4 text-primary" />
                    <span className="text-sm text-primary font-bold">
                      Save ₹{savings.toLocaleString('en-IN')} today!
                    </span>
                  </div>
                )}
                
                <div className="flex items-end gap-3 mb-1">
                  <span className="text-4xl font-extrabold text-primary">₹{tourPrice.toLocaleString('en-IN')}</span>
                  {savings > 0 && tourDiscountPrice && (
                    <span className="text-lg text-gray-400 line-through mb-1">₹{tourDiscountPrice.toLocaleString('en-IN')}</span>
                  )}
                </div>
                <p className="text-gray-500 text-sm font-medium">per person • taxes included</p>
              </div>
              
              <button 
                onClick={() => setIsBookingModalOpen(true)}
                className="w-full py-4 bg-primary hover:bg-red-600 text-white rounded-xl font-bold text-lg transition-transform active:scale-95 shadow-lg shadow-red-500/30"
              >
                Book Now
              </button>
              
              <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" /> Secure Online Payment
              </p>
            </div>
          </div>
          
        </div>
      </main>

      {/* Booking Form Modal */}
      <Dialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
        <DialogContent className="sm:max-w-md" style={{ fontFamily: "Poppins, sans-serif" }}>
          {bookingSuccess ? (
            <div className="py-8 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
              <p className="text-gray-500">Thank you for booking <b>{tour.name}</b>. We will contact you soon with trip details.</p>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">Complete Your Booking</DialogTitle>
                <DialogDescription>
                  Enter your details for <b>{tour.name}</b>
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleBookingSubmit} className="space-y-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="e.g. John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input 
                    required 
                    type="tel" 
                    placeholder="+91 99999 99999"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of Travelers</label>
                  <select 
                    value={formData.travelers}
                    onChange={(e) => setFormData({...formData, travelers: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white"
                  >
                    {[1,2,3,4,5,6,7,8,9,10].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Traveler' : 'Travelers'}</option>
                    ))}
                  </select>
                </div>
                
                <div className="pt-4 flex items-center justify-between border-t border-gray-100 mt-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Price</p>
                    <p className="text-xl font-bold text-gray-900">₹{(tourPrice * parseInt(formData.travelers)).toLocaleString('en-IN')}</p>
                  </div>
                  <button 
                    type="submit" 
                    disabled={isBookingLoading}
                    className="px-6 py-2.5 bg-primary text-white rounded-lg font-semibold hover:bg-red-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isBookingLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                    {isBookingLoading ? 'Processing...' : 'Confirm Booking'}
                  </button>
                </div>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
