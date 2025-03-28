// import express, { RequestHandler } from "express";
// import { PrismaClient } from "@prisma/client";
// import { authenticateToken } from "./middleware/auth";

// const router = express.Router();
// const prisma = new PrismaClient();

// // **Get All News**
// router.get("/", (async (req, res) => {
//   const news = await prisma.news.findMany({
//     orderBy: { createdAt: 'desc' }
//   });
//   res.json(news);
// }) as RequestHandler);

// // **Get Single News**
// router.get("/:id", (async (req, res) => {
//   const { id } = req.params;
//   const news = await prisma.news.findUnique({
//     where: { id: parseInt(id) }
//   });
//   if (!news) return res.status(404).json({ error: "News not found" });
//   res.json(news);
// }) as RequestHandler);

// // **Create News** (Protected Route)
// router.post("/", authenticateToken, (async (req, res) => {
//   const { title, description, image, date, link } = req.body;
  
//   const news = await prisma.news.create({
//     data: {
//       title,
//       description,
//       image,
//       date,
//       link
//     }
//   });
  
//   res.status(201).json(news);
// }) as RequestHandler);

// // **Update News** (Protected Route)
// router.put("/:id", authenticateToken, (async (req, res) => {
//   const { id } = req.params;
//   const { title, description, image, date, link } = req.body;
  
//   const news = await prisma.news.update({
//     where: { id: parseInt(id) },
//     data: {
//       title,
//       description,
//       image,
//       date,
//       link
//     }
//   });
  
//   res.json(news);
// }) as RequestHandler);

// // **Delete News** (Protected Route)
// router.delete("/:id", authenticateToken, (async (req, res) => {
//   const { id } = req.params;
  
//   await prisma.news.delete({
//     where: { id: parseInt(id) }
//   });
  
//   res.status(204).send();
// }) as RequestHandler);

// export default router; 