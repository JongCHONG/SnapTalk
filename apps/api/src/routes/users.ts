import express, { Request, Response } from "express";
import User from "../models/User";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

router.post("/register", async (req: Request, res: Response) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error: any) {
    if (error.code === 11000) {
      // Détection du champ dupliqué
      const field = Object.keys(error.keyValue)[0];
      let message = "";
      if (field === "username") {
        message = "Nom d'utilisateur existe déjà";
      } else if (field === "email") {
        message = "Email existe déjà";
      } else {
        message = "Ce champ existe déjà";
      }
      return res.status(400).json({ message });
    }
    res.status(400).json({ error: error.message });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email ou mot de passe incorrect" });
    }
    // Vérification du mot de passe (en clair, à remplacer par du hash en prod)
    if (user.password !== password) {
      return res.status(400).json({ message: "Email ou mot de passe incorrect" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router;
