import express from 'express';
import usersRouter from './routes/users'
import volunteersRouter from './routes/volunteers'
import notificationsRouter from './routes/notifications'
import eventsRouter from './routes/events'
import historyRouter from './routes/history'
import { connectToDatabase } from './configs/database.service';

const app = express();
//db connection
connectToDatabase()
    .then(() => {
      //cors
      app.use((_req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
        
        if (_req.method === 'OPTIONS') {
          return res.status(200).end();
        }

        next();
      });

      //middleware
      app.use(express.json());


      app.get('/', (req, res) => {
        res.send('Express server');
      })
      app.use('/api/users', usersRouter)
      app.use('/api/volunteers', volunteersRouter)
      app.use('/api/events',eventsRouter)
      app.use('/api/notifications', notificationsRouter)
      app.use('/api/history', historyRouter)

      const PORT = 4000;


      app.listen(PORT, () => {
          console.log(`Running on Port ${PORT }`);
      })
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });

