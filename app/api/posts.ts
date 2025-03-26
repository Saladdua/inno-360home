// import { NextApiRequest, NextApiResponse } from "next";
// import db from "../../lib/db";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === "POST") {
//     try {
//       const { title, content, image, author } = req.body;

//       if (!title || !content || !author) {
//         return res.status(400).json({ error: "Missing required fields" });
//       }

//       // Insert post into the database
//       const [result]: any = await db.query(
//         "INSERT INTO posts (title, content, image, author) VALUES (?, ?, ?, ?)",
//         [title, content, image, author]
//       );

//       return res.status(201).json({ message: "Post uploaded successfully", postId: result.insertId });
//     } catch (error) {
//       console.error("Database error:", error);
//       return res.status(500).json({ error: "Internal Server Error" });
//     }
//   } else if (req.method === "GET") {
//     try {
//       // Fetch all posts from the database
//       const [posts]: any = await db.query("SELECT * FROM posts ORDER BY created_at DESC");
//       return res.status(200).json(posts);
//     } catch (error) {
//       console.error("Database error:", error);
//       return res.status(500).json({ error: "Internal Server Error" });
//     }
//   } else {
//     return res.status(405).json({ error: "Method Not Allowed" });
//   }
// }
