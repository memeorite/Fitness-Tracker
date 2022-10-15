const express = require('express');
const router = express.Router();
// took from juicebox
const jwt = require('jsonwebtoken')

//took from juicebox
const { createUser, getUser, getUserById, getUserByUsername } = require('../db.users')


// POST /api/users/login
//from juicebox; no hashed password
usersRouter.post('/login', async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        next({
            name: "MissingCredentialsError",
            message: "Please suppy both a username and password"
        });
    }
//juicebox put in id: 1 and username: 'albert' not sure what we need for this
    const token = jwt.sign({ id: id, username: username }, process.env.JWT_SECRET);

    try {
        const user = await getUserByUsername(username);

        if (user && user.password == password) {
            res.send({ message: "you're logged in!", token});

        } else {
            next({
                name: 'IncorrectCredentialsError',
                message: 'Username or password is incorrect'
            });
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// POST /api/users/register
// from juicebox; did not hash password, took out name and location; added password.length if statement
usersRouter.post('/register', async (req, res, next) => {
    const { username, password } = req.body;
  
    try {
      const _user = await getUserByUsername(username);
  
      if (_user) {
        next({
          name: 'UserExistsError',
          message: 'A user by that username already exists'
        });
      }
  
      const user = await createUser({
        username,
        password
      });

      if(password.length < 8) {
        next({
            password: "Password must be at least 8 characters"
        });
      }
  
      const token = jwt.sign({
        id: user.id,
        username
      }, process.env.JWT_SECRET, {
        expiresIn: '1w'
      });
  
      res.send({
        message: "thank you for signing up",
        token
      });
    } catch ({ name, message }) {
      next({ name, message })
    }
  });
  


// GET /api/users/me
// from juicebox usersRouter.get to start. Created const userData... myself
users.get('/', async (req, res, next) => {
    const userData = await getAllUsers() ({
        id:user.id,
        username: username,
        password: password
    }, process.env.JWT_SECRET);    
  
    res.send({
      userData
    });
  });

// GET /api/users/:username/routines

module.exports = router;
