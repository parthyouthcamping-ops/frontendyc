import { Router } from "express";
import { db, bookings, tours } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

// Create a booking
router.post("/bookings", async (req, res) => {
  try {
    const { name, phone, travelers, tourId } = req.body;
    
    if (!name || !phone || !travelers || !tourId) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    // Since the schema changed to match the Admin's "Source of Truth", 
    // bookings now require a customerId and financial fields.
    // For now we use a placeholder customerId = 1
    // In a real flow, we would first find or create a customer.
    
    // Fetch tour to get price
    const [tour] = await db.select().from(tours).where(eq(tours.id, parseInt(tourId, 10)));
    const price = tour ? (typeof tour.price === 'string' ? parseFloat(tour.price) : tour.price) : 0;
    const totalAmount = price * parseInt(travelers, 10);

    const [newBooking] = await db
      .insert(bookings)
      .values({
        customerId: 1, 
        tourId: parseInt(tourId, 10),
        totalAmount: totalAmount.toString(),
        paidAmount: "0",
        remainingAmount: totalAmount.toString(),
        status: "pending",
      })
      .returning();

    res.json(newBooking);
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ error: "Failed to create booking" });
  }
});

export default router;
