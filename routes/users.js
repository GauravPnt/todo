const { User, validate } = require('../models/user');
const { ToDo } = require('../models/todo');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcryptjs');

router.post('/add', async (req, res) => {
  console.log(req.body);
  const newTodo = new ToDo(_.pick(req.body, ['text', 'priority']));
  try {
    await newTodo.save();
    let user = await User.findById(req.body.userId);
    if (!user) return;
    user.canView.push(newTodo._id);
    user.canEdit.push(newTodo._id);
    await user.save();
  } catch (error) {
    console.log(error);
  }
  return res.send(newTodo);
})

router.post('/delete', async (req, res) => {
  console.log(req.body);
  const todo = await ToDo.findById(req.body.todoid);
  if (!todo)
    return res.status(400).send('Todo not found');
  await todo.remove();
  return res.send('Success');
})

router.post('/canView', async (req, res) => {
  let list = await User.findById(req.body._id).populate('canView').select('canView -_id');
  if (!list) return res.status(400).send('User doesnt exist');
  return res.send(list);
})

router.post('/canEdit', async (req, res) => {
  let list = await User.findById(req.body._id).populate('canEdit').select('canEdit -_id');
  if (!list) return res.status(400).send('User doesnt exist');
  return res.send(list);
})

router.post('/grantView', async (req, res) => {
  let user = await User.find({ email: req.body.email });
  user.canView.push(req.body.id);
  await user.save();
})

router.post('/grantEdit', async (req, res) => {
  let user = await User.find({ email: req.body.email });
  user.canEdit.push(req.body.id);
  await user.save();
})

router.post('/register', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered');

  user = new User(_.pick(req.body, ['name', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

router.post('/login', async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(403).send('User doesnt exist');

    let pwdVerify = bcrypt.compareSync(req.body.password, user.password);

    if (pwdVerify) {
      console.log('Success');
      const token = user.generateAuthToken();
      res.send(token);
    } else {
      res.status(401).send('Wrong Password');
    }
  } catch (error) {
    console.log(req.body);
  }
});

module.exports = router;