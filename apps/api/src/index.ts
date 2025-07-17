import express from 'express';
import cors from 'cors';
import { connectDB } from './db';
import usersRouter from './routes/users';
import messagesRouter from './routes/messages';
import http from 'http';
import { Server } from 'socket.io';

connectDB();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

let connectedUsers: { [socketId: string]: string } = {};

io.on('connection', (socket) => {
  socket.on('user_connected', (username: string) => {
    connectedUsers[socket.id] = username;
    io.emit('users_online', Object.values(connectedUsers));
  });

  socket.on('disconnect', () => {
    delete connectedUsers[socket.id];
    io.emit('users_online', Object.values(connectedUsers));
  });
});

app.use(cors());
app.use(express.json());
app.use('/users', usersRouter);
app.use('/messages', messagesRouter);

const PORT = process.env.PORT || 4001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});