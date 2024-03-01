const express = require('express');
const authRouter = require('./auth');
const userRouter = require('./user');
const messageRouter = require('./message');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/message', messageRouter);

module.exports = router;