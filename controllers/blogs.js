const blogsRouter = require('express').Router();

const { Blog } = require('../models');

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

blogsRouter.post('/', async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    return res.json(blog);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

blogsRouter.delete('/:id', async (req, res) => {
  const numberOfDestroyedRows = await Blog.destroy({
    where: { id: req.params.id },
  });

  if (!numberOfDestroyedRows) {
    res.status(404).end();
  }

  res.status(204).end();
});

module.exports = blogsRouter;
