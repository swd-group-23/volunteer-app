import express from 'express';
import usersRouter from './routes/users'
import volunteersRouter from './routes/volunteers'
import cors from 'cors';

const app = express();

const options: cors.CorsOptions = {
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'X-Access-Token',
    ],
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: true,
    preflightContinue: false,
  };
  
//middleware
app.use(express.json());
app.use(cors(options));

app.get('/test', (req, res) => {
  res.send('Hello World');
});
app.use('/api/users', usersRouter)
app.use('/api/volunteers', volunteersRouter)

const PORT = 4000;

app.options('*', cors(options));

app.listen(PORT, () => {
    console.log(`Running on Port ${PORT }`);
})