const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const { User } = require('../models');

const strategy = async (username, password, done) => {
  try {
    const user = await User.findOne({ where: { username } });

    const passwordCorrect =
      !user || !password
        ? false
        : await bcrypt.compare(password, user.passwordHash);

    if (!passwordCorrect) {
      return done(null, false, { error: 'invalid username or password' });
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
};

const configurePassport = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password',
      },
      strategy()
    )
  );

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findByPk(id);

      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  });
};

module.exports = configurePassport;
