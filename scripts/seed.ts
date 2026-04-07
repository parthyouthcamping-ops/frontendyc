import "dotenv/config";
import { db, tours } from "../lib/db/src";

const CDN = "https://vl-prod-static.b-cdn.net/system/images";

const allTours = [
  {
    name: "Manali Kasol Amritsar Backpacking Trip",
    slug: "manali-kasol-amritsar-adventure-trip",
    destination: "Manali, Kasol, Amritsar",
    durationDays: 9,
    price: "11999",
    discountPrice: "11999",
    description: "Wagah Border · Golden Temple · Bijli Mahadev Trek. Explore the best of Himachal and Punjab in this comprehensive 9-day backpacking adventure. Perfect for youth travelers looking for culture, spirituality, and thrill.",
    coverImage: `${CDN}/000/888/076/6f012c2f939c45fd491d86b3d33b0cbb/x540gt/IMG_3309.jpg`,
    galleryImages: [
      `${CDN}/000/748/614/9b56160b1abe219a402c11001702ae24/x540gt/IMG_3398.JPG`,
      `${CDN}/000/748/611/6293bbb8cff91918ba4aea8025dca151/x540gt/IMG_3359.JPG`,
    ],
  },
  {
    name: "Manali Kasol Amritsar Trip (Summer 2026)",
    slug: "manali-kasol-amritsar-summer-trip",
    destination: "Manali, Kasol",
    durationDays: 9,
    price: "11999",
    discountPrice: "11999",
    description: "Vashisht Hot Springs · Solang Valley · Chalal Village. A perfect summer getaway to the cool mountains of Manali and the hippie vibes of Kasol.",
    coverImage: `${CDN}/000/748/614/9b56160b1abe219a402c11001702ae24/x540gt/IMG_3398.JPG`,
    galleryImages: [
      `${CDN}/000/748/611/6293bbb8cff91918ba4aea8025dca151/x540gt/IMG_3359.JPG`,
      `${CDN}/000/748/612/fea69680cd85a1e40d4f3643574c89af/x540gt/IMG_3326.JPG`,
    ],
  },
  {
    name: "Shimla Manali Kullu",
    slug: "shimla-manali-kullu-experience",
    destination: "Manali, Shimla",
    durationDays: 8,
    price: "12999",
    discountPrice: "12999",
    description: "Mall Road · Hadimba Temple · Kullu Rafting. The classic Himachal circuit. Visit the queen of hills Shimla and the adventure capital Manali.",
    coverImage: `${CDN}/000/795/284/3bba832671671da87e0f23ce9864e6c1/x540gt/27121997__26_.jpg`,
    galleryImages: [
      `${CDN}/000/750/627/c9e426f29444d71754171e3f6c9081c8/x540gt/Untitled_design__18_.png`,
      `${CDN}/000/750/628/e1eea3594999b766f2e8a399debb52d2/x540gt/Untitled_design__21_.png`,
    ],
  },
  {
    name: "Winter Spiti Road Trip",
    slug: "winter-spiti-expedition",
    destination: "Spiti Valley",
    durationDays: 10,
    price: "19999",
    discountPrice: "19999",
    description: "Frozen Rivers · Snow-covered Villages · Key Monastery. A legendary journey into the white desert of Spiti. Experience sub-zero temperatures and breathtaking landscapes.",
    coverImage: `${CDN}/000/862/062/b7cb9dc7ccc9fe863f0f009c4fe1746f/x540gt/Website_Itinerary_Ohotos__2_.png`,
    galleryImages: [
      `${CDN}/000/862/060/5d50edec4e8decdefec9e352873b99e8/x540gt/Website_Itinerary_Ohotos__4_.png`,
      `${CDN}/000/862/061/9b72e8a2d0b5f7708ed73d1c712eed1a/x540gt/Website_Itinerary_Ohotos__3_.png`,
    ],
  },
  {
    name: "Leh Ladakh Bike Expedition 2026",
    slug: "leh-ladakh-bike-2026",
    destination: "Ladakh",
    durationDays: 7,
    price: "18999",
    discountPrice: "18999",
    description: "Khardung La · Nubra Valley · Turtuk · Pangong Lake. The ultimate bucket list trip. Ride through the highest motorable passes in the world.",
    coverImage: `${CDN}/000/888/077/e84148f8d1adacaa5dc96e8f834b8cdd/x540gt/t2-graphy-IJfpVYlRv5I-unsplash.jpg`,
    galleryImages: [
      `${CDN}/000/888/133/bae231ef3cdd69e7dc0d467e3ba04cbe/x540gt/Website_Itinerary_Ohotos__4_.jpg`,
      `${CDN}/000/888/134/10b5d1ede53e33bb93e210e4846fcec9/x540gt/Website_Itinerary_Ohotos__3_.jpg`,
    ],
  },
  {
    name: "Kedarnath Badrinath – Tungnath & Rishikesh",
    slug: "kedarnath-badrinath-spiritual-trek",
    destination: "Kedarnath, Rishikesh",
    durationDays: 8,
    price: "19499",
    discountPrice: "19499",
    description: "Char Dham · Panch Kedar · Ganga Aarti · Bungee. A spiritual odyssey mixed with adventure in the heart of Uttarakhand.",
    coverImage: `${CDN}/000/748/925/95ce9359f68bd2d93dee6aa2e3a18d17/x540gt/Untitled_design__11_.png`,
    galleryImages: [
      `${CDN}/000/748/920/5abeca5343adce67a22013a929647f71/x540gt/Untitled_design__12_.png`,
      `${CDN}/000/748/921/30e9ea2cafbd0b433acdf1c21b6d3e0c/x540gt/Untitled_design__13_.png`,
    ],
  },
];

async function seed() {
  console.log("Seeding database with Unified Schema...");
  try {
    for (const tour of allTours) {
      await db.insert(tours).values(tour).onConflictDoNothing();
      console.log(`Inserted: ${tour.name}`);
    }
    console.log("Seeding complete!");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    process.exit(0);
  }
}

seed();
