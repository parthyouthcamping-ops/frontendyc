import { pgTable, serial, varchar, text, integer, decimal, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const tours = pgTable('tours', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  destination: varchar('destination', { length: 255 }).notNull(),
  durationDays: integer('duration_days').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  discountPrice: decimal('discount_price', { precision: 10, scale: 2 }),
  description: text('description'),
  coverImage: text('cover_image'),
  galleryImages: jsonb('gallery_images').default([]),
  itineraryId: integer('itinerary_id'), // Simplified for FrontEnd
  createdAt: timestamp('created_at').defaultNow()
});

export const insertTourSchema = createInsertSchema(tours).omit({ id: true });
export type InsertTour = typeof tours.$inferInsert;
export type Tour = typeof tours.$inferSelect;
