import express from 'express';
import usersRouter from './routes/users'

const app = express();

app.use('/api/users', usersRouter)

const PORT = 4000;


app.listen(PORT, () => {
    console.log(`Running on Port ${PORT }`);
})