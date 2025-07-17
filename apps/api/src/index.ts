import express from 'express';
import cors from 'cors';
import { connectDB } from './db';
import usersRouter from './routes/users';
import messagesRouter from './routes/messages';

connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/users', usersRouter);
app.use('/messages', messagesRouter);

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});