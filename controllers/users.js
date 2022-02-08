const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();

const { User } = require('../models');

usersRouter.get('/', async (req, res) => {
  const users = await User.findAll();

  res.json(users);
});

usersRouter.post('/', async (req, res) => {
  const { name, username, password } = req.body;

  if (!password || password.length < 8) {
    res.status(400).json({ error: 'password must be at least 8 characters' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = await User.create({
    name,
    username,
    passwordHash,
  });

  res.json(user);
});

usersRouter.put('/:username', async (req, res) => {
  const { username } = req.params;

  const user = await User.findOne({
    where: {
      username,
    },
  });

  if (user) {
    const updatedUser = await user.update({ username: req.body.username });
    res.json(updatedUser);
  } else {
    res.status(404).end();
  }
});

module.exports = usersRouter;
