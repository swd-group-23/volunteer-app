import express from 'express';
import usersRouter from './routes/users'
import volunteersRouter from './routes/volunteers'
import cors from 'cors';

const app = express();

//options for cors midddleware
const options: cors.CorsOptions = {
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'X-Access-Token',
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: true,
    preflightContinue: false,
  };
  
//use cors middleware
app.use(cors(options));

app.use('/api/users', usersRouter)
app.use('/api/volunteers', volunteersRouter)

const PORT = 4000;

app.options('*', cors(options));

app.listen(PORT, () => {
    console.log(`Running on Port ${PORT }`);
})