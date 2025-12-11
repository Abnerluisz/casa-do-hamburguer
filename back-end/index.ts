import express, { type Request, type Response } from "express";
import { connection } from "./src/prismadb.js";
import { prisma } from "./src/prismadb.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
connection();

app.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "E-mail e senha são obrigatórios." });
      return;
    }

    const user = await prisma.user.findFirst({
      where: { email: email, password: password },
    });

    if (!user) {
      res.status(404).json({ message: "Usuario não encontrado." });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor." });
    return;
  }
});

app.post("/register", async (req: Request, res: Response) => {
  try {
    const { name, email, password, cep } = req.body;

    if (!name || !email || !password || !cep) {
      res
        .status(400)
        .json({ menssage: "Todas as informações são obrigatórias." });
      return;
    }

    const emailLower = email.toLowerCase();

    const user = await prisma.user.findFirst({
      where: { email: emailLower },
    });

    if (user?.email) {
      res.status(409).json({
        menssage: "E-email já existe.",
      });
      return;
    }

    const newUser = await prisma.user.create({
      data: { name: name, email: emailLower, password: password, cep: cep },
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor." });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
