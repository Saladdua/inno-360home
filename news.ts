// import express, { RequestHandler, Request, Response } from "express";
// import { PrismaClient } from "@prisma/client";
// import { authenticateToken } from "./middleware/auth";

// const router = express.Router();
// const prisma = new PrismaClient();

// // **Get All News**
// router.get("/", (async (req: Request, res: Response) => {
//   const news = await prisma.news.findMany({
//     orderBy: { date: "desc" }
//   });
//   res.json(news);
// }) as unknown as RequestHandler);

// // **Get Single News**
// router.get("/:id", (async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const news = await prisma.news.findUnique({
//     where: { id: parseInt(id) }
//   });
//   if (!news) {
//     res.status(404).json({ error: "News not found" });
//     return;
//   }
//   res.json(news);
// }) as unknown as RequestHandler);

// // **Create News** (Protected Route)
// router.post("/", authenticateToken, (async (req: Request, res: Response) => {
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
// }) as unknown as RequestHandler);

// // **Update News** (Protected Route)
// router.put("/:id", authenticateToken, (async (req: Request, res: Response) => {
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
// }) as unknown as RequestHandler);

// // **Delete News** (Protected Route)
// router.delete("/:id", authenticateToken, (async (req: Request, res: Response) => {
//   const { id } = req.params;
  
//   await prisma.news.delete({
//     where: { id: parseInt(id) }
//   });
  
//   res.status(204).send();
// }) as unknown as RequestHandler);

// export default router; 