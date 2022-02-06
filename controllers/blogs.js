const blogsRouter = require('express').Router();

const { Blog } = require('../models');

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

blogsRouter.post('/', async (req, res) => {
  const blog = await Blog.create(req.body);
  res.json(blog);
});

blogsRouter.delete('/:id', blogFinder, async (req, res) => {
  const { blog } = req;

  if (blog) {
    blog.destroy();
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

blogsRouter.put('/:id', blogFinder, async (req, res) => {
  const { blog } = req;

  if (blog) {
    const updatedBlog = await blog.update({ likes: req.body.likes });
    res.json(updatedBlog);
  } else {
    res.status(404).end();
  }
});

module.exports = blogsRouter;
