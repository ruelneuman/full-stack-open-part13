const blogsRouter = require('express').Router();
const { tokenExtractor } = require('../util/middleware');

const { Blog, User } = require('../models');

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

blogsRouter.post('/', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);
  const blog = await Blog.create({ ...req.body, userId: user.id });
  res.json(blog);
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
  const blog = await Blog.findByPk(req.params.id);

  if (blog) {
    const updatedBlog = await blog.update({ likes: req.body.likes });
    res.json(updatedBlog);
  } else {
    res.status(404).end();
  }
});

module.exports = blogsRouter;
