import express, { Request, Response } from "express";
import Message from "../models/Message";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const message = new Message(req.body);
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

export default router;
