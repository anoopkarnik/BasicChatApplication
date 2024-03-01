const express = require('express');
const cors = require('cors'); 
const rootRouter = require('./routes/root');
const {rateLimiter, errorFunction, authMiddleware} = require('./middlewares/middlewares');
require('dotenv').config();


const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(rateLimiter);
app.use('/api/v1/auth/logout',authMiddleware)
app.use('/api/v1/auth/update',authMiddleware)
app.use('/api/v1/user',authMiddleware)
app.use('/api/v1/message',authMiddleware)
app.use('/api/v1', rootRouter);
app.use(errorFunction);

app.listen(PORT, () => {
    console.log('Server is running on port 3000');
})


