import express from "express";
import app from "../src/app.js";

// Explicitly using express to satisfy Vercel's static analyzer
export const _vercelHack = express.Router();

export default app;

