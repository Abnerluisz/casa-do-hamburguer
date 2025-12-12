import { type Request, type Response } from "express";
import { prisma } from "../prismadb.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "E-mail e senha são obrigatórios." });
      return;
    }

    const emailLower = email.toLowerCase();

    const user = await prisma.user.findFirst({
      where: { email: emailLower },
    });

    if (!user) {
      res.status(404).json({ message: "Usuario não encontrado." });
      return;
    }

    const match = await bcrypt.compare(password, user?.password);

    if (!match) {
      res.status(401).json({ message: "Usuário não encontrado." });
      return;
    }

    const userInfo = {
      id: user.id,
      name: user.name,
      email: user.email,
      cep: user.cep,
    };

    if (!process.env.JWT_SECRET) return;

    const token = jwt.sign(userInfo, process.env.JWT_SECRET);

    console.log(token);

    res.cookie("user", token, {
      maxAge: 30 * 1000,
    });

    res.status(200).json(userInfo);
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor, tente mais tarde." });
    return;
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, cep } = req.body;

    if (!name || !email || !password || !cep) {
      res
        .status(400)
        .json({ menssage: "Todas as informações são obrigatórias." });
      return;
    }

    const hash = await bcrypt.hash(password, 10);

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
      data: { name: name, email: emailLower, password: hash, cep: cep },
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor, tente mais tarde." });
    return;
  }
};

export const auth = async (req: Request, res: Response) => {
  try {
    const user = req.cookies.user;

    if (!process.env.JWT_SECRET) {
      res.status(401).json({ message: "Usuário não autorizado." });
      return;
    }

    const decoded = jwt.verify(user, process.env.JWT_SECRET);

    if (!decoded) {
      res.status(401).json({ message: "Usuário não autorizado." });
      return;
    }

    res.status(200).json(decoded);
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor, tente mais tarde." });
    return;
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const { user } = req.cookies;

    if (user) {
      res.clearCookie("user");
      res.status(200).json({ message: "Usuário deslogado." });
    } else {
      res.status(401).json({ message: "Não foi possível deslogar." });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor, tente mais tarde." });
    return;
  }
};
