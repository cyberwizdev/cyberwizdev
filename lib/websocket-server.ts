import { Server as NetServer } from "http";
import { NextApiResponse } from "next";
import { Server as ServerIO } from "socket.io";
import { prisma } from "@/prisma/prisma";

export type NextApiResponseServerIO = NextApiResponse & {
  socket: {
    server: NetServer & {
      io?: ServerIO;
    };
  };
};

interface ChatMessage {
  id: string;
  sessionId: string;
  message: string;
  sender: string;
  senderName: string | null;
  createdAt: string;
}

export class WebSocketChatServer {
  private io: ServerIO;
  private activeConnections: Map<string, string> = new Map(); // sessionId -> socketId

  constructor(io: ServerIO) {
    this.io = io;
    this.setupEventHandlers();
  }

  private setupEventHandlers() {
    this.io.on("connection", (socket) => {
      console.log("Client connected:", socket.id);

      socket.on("join-chat", async (sessionId: string) => {
        try {
          // Join socket to session-specific room
          socket.join(`chat:${sessionId}`);
          this.activeConnections.set(sessionId, socket.id);

          // Send chat history to the client
          const messages = await prisma.chatMessage.findMany({
            where: { sessionId },
            orderBy: { createdAt: "asc" },
          });

          socket.emit("chat-history", messages);
          console.log(`Client ${socket.id} joined chat session ${sessionId}`);
        } catch (error) {
          console.error("Error joining chat:", error);
          socket.emit("error", { message: "Failed to join chat" });
        }
      });

      socket.on("join-admin", () => {
        try {
          // Join admin to admin room for receiving notifications
          socket.join("admin-room");
          console.log(`Admin ${socket.id} joined admin room`);
        } catch (error) {
          console.error("Error joining admin room:", error);
          socket.emit("error", { message: "Failed to join admin room" });
        }
      });

      socket.on("send-message", async (data: {
        sessionId: string;
        message: string;
        userName: string;
      }) => {
        try {
          const { sessionId, message, userName } = data;

          // Save message to database
          const newMessage = await prisma.chatMessage.create({
            data: {
              sessionId,
              message,
              sender: "user",
              senderName: userName,
            },
          });

          // Update chat session
          await prisma.chatSession.update({
            where: { id: sessionId },
            data: { 
              lastMessage: message,
              updatedAt: new Date(),
            },
          });

          // Broadcast message to OTHER clients in the session room (not sender)
          // User already has optimistic update, so we only send to admins
          socket.to(`chat:${sessionId}`).emit("new-message", newMessage);
          
          // Notify admins about the new message
          const session = await prisma.chatSession.findUnique({
            where: { id: sessionId },
          });
          if (session) {
            this.io.to("admin-room").emit("session-updated", {
              ...session,
              lastMessage: message,
              updatedAt: new Date(),
            });
          }
          
          console.log(`Message sent in session ${sessionId}:`, message);
        } catch (error) {
          console.error("Error sending message:", error);
          socket.emit("error", { message: "Failed to send message" });
        }
      });

      socket.on("admin-message", async (data: {
        sessionId: string;
        message: string;
        senderName: string;
      }) => {
        try {
          const { sessionId, message, senderName } = data;

          // Save message to database
          const newMessage = await prisma.chatMessage.create({
            data: {
              sessionId,
              message,
              sender: "admin",
              senderName: senderName,
            },
          });

          // Update chat session
          await prisma.chatSession.update({
            where: { id: sessionId },
            data: { 
              lastMessage: message,
              updatedAt: new Date(),
            },
          });

          // Broadcast message to OTHER clients in the session room (not admin sender)
          // Admin already has optimistic update
          socket.to(`chat:${sessionId}`).emit("new-message", newMessage);
          
          // Notify other admins about the updated session
          const session = await prisma.chatSession.findUnique({
            where: { id: sessionId },
          });
          if (session) {
            this.io.to("admin-room").emit("session-updated", {
              ...session,
              lastMessage: message,
              updatedAt: new Date(),
            });
          }
          
          console.log(`Admin message sent in session ${sessionId}:`, message);
        } catch (error) {
          console.error("Error sending admin message:", error);
          socket.emit("error", { message: "Failed to send message" });
        }
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
        // Remove from active connections
        // ES5-compatible iteration
        this.activeConnections.forEach((socketId, sessionId) => {
          if (socketId === socket.id) {
            this.activeConnections.delete(sessionId);
          }
        });
      });
    });
  }

  // Method to send message to specific session (can be called from other parts of the app)
  sendToSession(sessionId: string, event: string, data: any) {
    this.io.to(`chat:${sessionId}`).emit(event, data);
  }

  // Method to notify admins about new session
  notifyNewSession(session: any) {
    this.io.to("admin-room").emit("new-session", session);
    console.log(`Notified admins about new session: ${session.id}`);
  }

  // Get active connections count
  getActiveConnectionsCount(): number {
    return this.activeConnections.size;
  }
}