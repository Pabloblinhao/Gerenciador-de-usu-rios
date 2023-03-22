import { Request, Response } from 'express';

// Array com usuários
const users = [
  { id: 1, nome: 'João' },
  { id: 2, nome: 'Maria' },
  { id: 3, nome: 'José' },
];

// Função para encontrar um usuário pelo ID
function encontrarUsuarioPorId(id: number) {
  return users.find(user => user.id === id);
}

// Função para encontrar todos os usuários
function encontrarTodosUsuarios() {
  return users;
}

// Função para atualizar um usuário
function atualizarUsuario(id: number, nome: string) {
  const user = encontrarUsuarioPorId(id);
  if (user) {
    user.nome = nome;
    return true;
  }
  return false;
}

// Função para remover um usuário
function removerUsuario(id: number) {
  const index = users.findIndex(user => user.id === id);
  if (index >= 0) {
    users.splice(index, 1);
    return true;
  }
  return false;
}

// Controlador de usuários
export default class UserController {
  static get(req: Request, res: Response) {
    const users = encontrarTodosUsuarios();
    res.json(users);
  }

  static post(req: Request, res: Response) {
    const { nome } = req.body;
    const novoId = users.length + 1;
    users.push({ id: novoId, nome: nome });
    return res.status(201).json({ mensagem: 'Usuário criado com sucesso', id: novoId });
  }

  static put(req: Request, res: Response) {
    const { id } = req.params;
    const { nome } = req.body;
    const sucesso = atualizarUsuario(parseInt(id), nome);
    if (sucesso) {
      return res.status(200).json({ mensagem: 'Usuário atualizado com sucesso' });
    }
    return res.status(404).json({ mensagem: 'Usuário não encontrado' });
  }

  static delete(req: Request, res: Response) {
    const { id } = req.params;
    const sucesso = removerUsuario(parseInt(id));
    if (sucesso) {
      return res.status(200).json({ mensagem: 'Usuário removido com sucesso' });
    }
    return res.status(404).json({ mensagem: 'Usuário não encontrado' });
  }
}