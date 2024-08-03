// const express = require('express');
// const http = require('http');
// const socketio = require('socket.io');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const app = express();
// const server = http.createServer(app);
// const io = socketio(server);

// app.use(express.json());
// app.use(express.static('public'));

// const users = []; 

// app.post('/register', async (req, res) => {
//     const { username, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     users.push({ username, password: hashedPassword });
//     res.status(201).send('User registered');
// });

// app.post('/login', async (req, res) => {
//     const { username, password } = req.body;
//     const user = users.find(user => user.username === username);
//     if (user && await bcrypt.compare(password, user.password)) {
//         const token = jwt.sign({ username: user.username }, 'secret_key');
//         res.json({ token });
//     } else {
//         res.status(401).send('Invalid credentials');
//     }
// });

// io.use((socket, next) => {
//     const token = socket.handshake.auth.token;
//     try {
//         const user = jwt.verify(token, 'secret_key');
//         socket.user = user;
//         next();
//     } catch (err) {
//         next(new Error('Authentication error'));
//     }
// });

// io.on('connection', (socket) => {
//     console.log(`User connected: ${socket.user.username}`);

//     socket.on('joinRoom', (room) => {
//         socket.join(room);
//         socket.to(room).emit('message', { user: 'system', text: `${socket.user.username} has joined the room` });
//     });

//     socket.on('chatMessage', (data) => {
//         const { room, message } = data;
//         io.to(room).emit('message', { user: socket.user.username, text: message });
//     });

//     socket.on('disconnect', () => {
//         console.log(`User disconnected: ${socket.user.username}`);
//     });
// });

// server.listen(3000, () => console.log('Server running on port 3000'));
