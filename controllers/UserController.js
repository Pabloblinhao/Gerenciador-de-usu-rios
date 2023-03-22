"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Array com usuários
const usuarios = [
    { id: 1, nome: 'João' },
    { id: 2, nome: 'Maria' },
    { id: 3, nome: 'José' },
];
// Função para encontrar um usuário pelo ID
function encontrarUsuarioPorId(id) {
    return usuarios.find(usuario => usuario.id === id);
}
// Função para encontrar todos os usuários
function encontrarTodosUsuarios() {
    return usuarios;
}
// Função para atualizar um usuário
function atualizarUsuario(id, nome) {
    const usuario = encontrarUsuarioPorId(id);
    if (usuario) {
        usuario.nome = nome;
        return true;
    }
    return false;
}
// Função para remover um usuário
function removerUsuario(id) {
    const index = usuarios.findIndex(usuario => usuario.id === id);
    if (index >= 0) {
        usuarios.splice(index, 1);
        return true;
    }
    return false;
}
// Controlador de usuários
class UserController {
    static get(req, res) {
        const usuarios = encontrarTodosUsuarios();
        res.json(usuarios);
    }
    static post(req, res) {
        const { nome } = req.body;
        const novoId = usuarios.length + 1;
        usuarios.push({ id: novoId, nome: nome });
        return res.status(201).json({ mensagem: 'Usuário criado com sucesso', id: novoId });
    }
    static put(req, res) {
        const { id } = req.params;
        const { nome } = req.body;
        const sucesso = atualizarUsuario(parseInt(id), nome);
        if (sucesso) {
            return res.status(200).json({ mensagem: 'Usuário atualizado com sucesso' });
        }
        return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }
    static delete(req, res) {
        const { id } = req.params;
        const sucesso = removerUsuario(parseInt(id));
        if (sucesso) {
            return res.status(200).json({ mensagem: 'Usuário removido com sucesso' });
        }
        return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }
}
exports.default = UserController;
