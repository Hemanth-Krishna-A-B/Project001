require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const pollRoutes = require('./routes/pollRoutes');
const responseRoutes = require('./routes/responseRoutes');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());

// ✅ Prevent multiple connections
if (mongoose.connection.readyState === 0) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));
} else {
  console.log('⚠️ MongoDB already connected.');
}

// API Routes
app.use('/api/polls', pollRoutes);
app.use('/api/responses', responseRoutes);

// Socket.io setup
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('createPoll', (pollData) => {
    console.log('New poll created:', pollData);
    io.emit('newPoll', pollData);
  });

  socket.on('submitResponse', (responseData) => {
    console.log('New response received:', responseData);
    io.emit('newResponse', responseData);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const PORT = process.env.PORT || 5001 ;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
