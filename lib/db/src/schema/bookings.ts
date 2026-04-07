import { pgTable, serial, integer, decimal, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const bookings = pgTable('bookings', {
  id: serial('id').primaryKey(),
  customerId: integer('customer_id').notNull(), 
  tourId: integer('tour_id').notNull(),
  totalAmount: decimal('total_amount', { precision: 10, scale: 2 }).notNull(),
  paidAmount: decimal('paid_amount', { precision: 10, scale: 2 }).default('0'),
  remainingAmount: decimal('remaining_amount', { precision: 10, scale: 2 }).notNull(),
  status: varchar('status', { length: 50 }).default('pending'), // pending, confirmed, cancelled
  createdAt: timestamp('created_at').defaultNow()
});

export const insertBookingSchema = createInsertSchema(bookings).omit({ id: true });
export type InsertBooking = typeof bookings.$inferInsert;
export type Booking = typeof bookings.$inferSelect;
