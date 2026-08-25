// server.js - Standalone WebSocket Server
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const app = express();
const httpServer = createServer(app);
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: process.env.ALLOWED_ORIGINS 
      ? process.env.ALLOWED_ORIGINS.split(',')
      : ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
  transports: ['websocket', 'polling'],
});

// Active connections tracker
const activeConnections = new Map();

// Socket.IO event handlers
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('join-chat', async (sessionId) => {
    try {
      socket.join(`chat:${sessionId}`);
      activeConnections.set(sessionId, socket.id);

      const messages = await prisma.chatMessage.findMany({
        where: { sessionId },
        orderBy: { createdAt: 'asc' },
      });

      socket.emit('chat-history', messages);
      console.log(`Client ${socket.id} joined chat session ${sessionId}`);
    } catch (error) {
      console.error('Error joining chat:', error);
      socket.emit('error', { message: 'Failed to join chat' });
    }
  });

  socket.on('join-admin', () => {
    try {
      socket.join('admin-room');
      console.log(`Admin ${socket.id} joined admin room`);
    } catch (error) {
      console.error('Error joining admin room:', error);
      socket.emit('error', { message: 'Failed to join admin room' });
    }
  });

  socket.on('send-message', async (data) => {
    try {
      const { sessionId, message, userName } = data;

      const newMessage = await prisma.chatMessage.create({
        data: {
          sessionId,
          message,
          sender: 'user',
          senderName: userName,
        },
      });

      await prisma.chatSession.update({
        where: { id: sessionId },
        data: {
          lastMessage: message,
          updatedAt: new Date(),
        },
      });

      io.to(`chat:${sessionId}`).emit('new-message', newMessage);

      const session = await prisma.chatSession.findUnique({
        where: { id: sessionId },
      });

      if (session) {
        io.to('admin-room').emit('session-updated', {
          ...session,
          lastMessage: message,
          updatedAt: new Date(),
        });
      }

      console.log(`Message sent in session ${sessionId}:`, message);
    } catch (error) {
      console.error('Error sending message:', error);
      socket.emit('error', { message: 'Failed to send message' });
    }
  });

  socket.on('admin-message', async (data) => {
    try {
      const { sessionId, message, senderName } = data;

      const newMessage = await prisma.chatMessage.create({
        data: {
          sessionId,
          message,
          sender: 'admin',
          senderName: senderName,
        },
      });

      await prisma.chatSession.update({
        where: { id: sessionId },
        data: {
          lastMessage: message,
          updatedAt: new Date(),
        },
      });

      io.to(`chat:${sessionId}`).emit('new-message', newMessage);

      const session = await prisma.chatSession.findUnique({
        where: { id: sessionId },
      });

      if (session) {
        io.to('admin-room').emit('session-updated', {
          ...session,
          lastMessage: message,
          updatedAt: new Date(),
        });
      }

      console.log(`Admin message sent in session ${sessionId}:`, message);
    } catch (error) {
      console.error('Error sending admin message:', error);
      socket.emit('error', { message: 'Failed to send message' });
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    activeConnections.forEach((socketId, sessionId) => {
      if (socketId === socket.id) {
        activeConnections.delete(sessionId);
      }
    });
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    activeConnections: activeConnections.size,
    timestamp: new Date().toISOString(),
  });
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing HTTP server');
  await prisma.$disconnect();
  httpServer.close(() => {
    console.log('HTTP server closed');
  });
});

const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () => {
  console.log(`WebSocket server running on port ${PORT}`);
  console.log(`Allowed origins: ${process.env.ALLOWED_ORIGINS || 'http://localhost:3000'}`);
});