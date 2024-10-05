const Post = require("../models/Post");

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json({ posts });
  } catch (error) {
    console.error("Erro ao obter todos os posts':", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const getPostById = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findByPk(id);
    res.json(post);
  } catch (error) {
    console.error("Erro ao obter todos os posts':", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const addPost = async (req, res) => {
  try {
    if (req.body.autor && req.body.postagem) {
      const newPost = await Post.create({
        autor: req.body.autor,
        postagem: req.body.postagem,
      });
      res.status(201).json({ item: newPost });
    } else {
      res.status(400).json({ error: "Dados não enviados corretamente!" });
    }
  } catch (error) {
    console.error("Erro ao adicionar post:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const updatePost = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findByPk(id);

    if (!post) {
      return res.status(400).json({ error: "Post não encontrado" });
    }

    if (req.body.autor) {
      post.autor = req.body.autor;
    }

    if (req.body.postagem) {
      post.postagem = req.body.postagem;
    }

    await post.save();
    res.json({ item: post });
  } catch (error) {
    console.error("Erro ao atualizar post:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const removePost = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findByPk(id);
    if (post) {
      await post.destroy();
      res.json({});
    } else {
      return res.status(400).json({ error: "Tarefa não encontrada" });
    }
  } catch (error) {
    console.error("Erro ao remorer tarefa:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

module.exports = { getAllPosts, addPost, updatePost, removePost, getPostById };
