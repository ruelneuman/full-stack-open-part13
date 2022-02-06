const blogsRouter = require('express').Router();

const { Blog } = require('../models');

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

blogsRouter.post('/', async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.json(blog);
  } catch (error) {
    res.status(400).json({ error });
  }
});

blogsRouter.delete('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);

  if (blog) {
    blog.destroy();
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

blogsRouter.put('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);

    if (blog) {
      const updatedBlog = await blog.update({ likes: req.body.likes });
      res.json(updatedBlog);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = blogsRouter;
