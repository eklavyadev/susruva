import express, {json} from 'express';
import usersRouter from './routes/users-routes.js';
import authRouter from './routes/auth-routes.js';
import dataRouter from './routes/data-routes.js';
import marketRouter from './routes/market-routes.js'
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = {credentials:true, origin: process.env.URL || '*'};

app.use(cors(corsOptions));
app.use(json());
app.use(cookieParser());

app.get('/', (req, res)=>{
  res.send("Hello World");
})
app.use('/', marketRouter);
app.use('/api/auth',authRouter);
app.use('/api/users', usersRouter);
app.use('/api/data', dataRouter);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    type: 'error', message: err.message
  });
});

// React Dashboard Link
// app.use(express.static(path.join(__dirname, 'build')));


app.listen(PORT, ()=> {
  console.log(`Server is listening on port:${PORT}`);
})