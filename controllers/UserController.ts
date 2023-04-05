import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export default class UserController {
  static default: any;
  static async get(req: Request, res: Response) {
    const { id } = req.params;

    // Verifica se o ID foi fornecido na requisição
    if (id) {
      const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });
      if (user) {
        return res.status(200).json(user);
      }
      return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    } else {
      // Retorna todos os usuários se o ID não foi fornecido
      const users = await prisma.user.findMany();
      return res.status(200).json(users);
    }
}

static async post(req: Request, res: Response) {
  const { name, email, password } = req.body;
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password
    }
  });
  return res.status(201).json({ mensagem: 'Usuário criado com sucesso', id: newUser.id });
}

  static async put(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        name,
        email,
        password
      }
    });
    if (updatedUser) {
      return res.status(200).json({ mensagem: 'Usuário atualizado com sucesso' });
    }
    return res.status(404).json({ mensagem: 'Usuário não encontrado' });
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    const deletedUser = await prisma.user.delete({ where: { id: parseInt(id) } });
    if (deletedUser) {
      return res.status(200).json({ mensagem: 'Usuário removido com sucesso' });
    }
    return res.status(404).json({ mensagem: 'Usuário não encontrado' });
  }
}