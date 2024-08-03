const bcrypt = require('bcryptjs');
const User = require('../models/user.schema');
const socketio = require('socket.io');
const jwt = require('jsonwebtoken');

const getRegister = (req, res) => {
  res.render('auth/register');
};

const registerUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      return res.status(400).send('All fields are required');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, email });
    await newUser.save();

    res.redirect('/login');
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).render('auth/404', { message: 'Error registering user' });
  }
};

const getLogin = (req, res) => {
  res.render('auth/login');
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).render('auth/404', { message: 'Username and password are required' });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).render('auth/404', { message: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).render('auth/404', { message: 'Invalid username or password' });
    }

    req.session = user; 

      return res.status(200).render('auth/chat');
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).render('auth/404', { message: 'Internal server error' });
  }
};

const io = socketio();
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  try {
    const user = jwt.verify(token, 'secret_key');
    socket.user = user;
    next();
  } catch (err) {
    next(new Error('Authentication error'));
  }
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.user.username}`);

  socket.on('joinRoom', (room) => {
    socket.join(room);
    socket.to(room).emit('message', { user: 'system', text: `${socket.user.username} has joined the room` });
  });

  socket.on('chatMessage', (data) => {
    const { room, message } = data;
    io.to(room).emit('message', { user: socket.user.username, text: message });
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.user.username}`);
  });
});


const logoutUser = (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error logging out:', err);
        return res.status(500).render('auth/404', { message: 'Error logging out' });
      }
      res.redirect('/login');
    });
  } else {
    res.redirect('/login');
  }
};

module.exports = {
  getRegister,
  registerUser,
  getLogin,
  loginUser,
  logoutUser
};
