import express from 'express';
import usersRouter from './routes/users'
import volunteersRouter from './routes/volunteers'
import notificationsRouter from './routes/notifications'
import eventsRouter from './routes/events'

const app = express();

//cors
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');

  next();
});

//middleware
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World, from express');
})
app.use('/api/users', usersRouter)
app.use('/api/volunteers', volunteersRouter)
app.use('/api/events',eventsRouter)
app.use('/api/notifications', notificationsRouter)

const PORT = 4000;


app.listen(PORT, () => {
    console.log(`Running on Port ${PORT }`);
})