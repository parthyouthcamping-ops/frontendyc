import { Router } from "express";
import { db, tours } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

// Get all tours
router.get("/tours", async (req, res) => {
  try {
    const allTours = await db.select().from(tours);
    res.json(allTours);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tours" });
  }
});

// Get tour by ID
router.get("/tours/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [tour] = await db.select().from(tours).where(eq(tours.id, parseInt(id, 10)));
    
    if (!tour) {
      res.status(404).json({ error: "Tour not found" });
      return;
    }
    
    res.json(tour);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tour" });
  }
});

// Add a tour (for testing)
router.post("/tours", async (req, res) => {
  try {
    const [newTour] = await db.insert(tours).values(req.body).returning();
    res.json(newTour);
  } catch (error) {
    res.status(500).json({ error: "Failed to create tour" });
  }
});

export default router;
