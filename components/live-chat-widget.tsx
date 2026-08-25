// components/live-chat-widget.tsx
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MessageCircle, X, Send } from "lucide-react";
import { toast } from "react-hot-toast";
import { io, Socket } from "socket.io-client";

interface Message {
  id: string;
  message: string;
  sender: "user" | "admin";
  senderName?: string | null;
  createdAt: string;
}

export default function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState<string>("");
  const [userName, setUserName] = useState("");
  const [isStarted, setIsStarted] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);

  // Get WebSocket URL from environment variable
  const WEBSOCKET_URL = process.env.NEXT_PUBLIC_WEBSOCKET_URL || "http://localhost:3001";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // @ts-ignore
  useEffect(() => {
    const storedSessionId = localStorage.getItem("chatSessionId");
    if (storedSessionId) {
      setSessionId(storedSessionId);
      setIsStarted(true);
      initSocket(storedSessionId);
    }
    return () => socketRef.current?.disconnect();
  }, []);

  const initSocket = (sid: string) => {
    socketRef.current?.disconnect();

    const socket = io(WEBSOCKET_URL, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      setIsConnected(true);
      socket.emit("join-chat", sid);
      console.log("Connected to WebSocket server");
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
      console.log("Disconnected from WebSocket server");
    });

    socket.on("chat-history", (chatMessages: Message[]) =>
      setMessages(chatMessages)
    );

    socket.on("new-message", (newMessage: Message) => {
      // Only add admin messages (user messages are already added optimistically)
      if (newMessage.sender === "admin") {
        setMessages((prev) => [...prev, newMessage]);
      }
    });

    socket.on("error", (err: { message: string }) => {
      toast.error(err.message || "Connection error");
    });
  };

  const startChat = useCallback(async () => {
    if (!userName.trim()) return toast.error("Please enter your name");

    try {
      const res = await fetch("/api/chat/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName }),
      });
      const data = await res.json();
      setSessionId(data.sessionId);
      localStorage.setItem("chatSessionId", data.sessionId);
      setIsStarted(true);
      initSocket(data.sessionId);
      toast.success("Chat started!");
    } catch {
      toast.error("Failed to start chat");
    }
  }, [userName]);

  const sendMessage = useCallback(async () => {
    if (!input.trim() || !socketRef.current || !isConnected) return;

    const message: Message = {
      id: Date.now().toString(),
      message: input,
      sender: "user",
      senderName: userName,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, message]);
    setInput("");
    setIsSending(true);

    try {
      socketRef.current.emit("send-message", {
        sessionId,
        message: message.message,
        userName,
      });
    } catch {
      toast.error("Failed to send message");
    } finally {
      setIsSending(false);
    }
  }, [input, isConnected, sessionId, userName]);

  return (
    <>
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-2xl z-50 flex flex-col bg-white">
          <div className="bg-primary text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              <div>
                <h3 className="font-semibold">Live Chat</h3>
                <p className="text-xs flex items-center gap-2">
                  <span
                    className={`inline-block w-2 h-2 rounded-full ${
                      isConnected ? "bg-green-400" : "bg-red-400"
                    }`}
                  />
                  {isConnected ? "Connected" : "Connecting..."}
                </p>
              </div>
            </div>
            <Button
              aria-label="Close chat"
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {!isStarted ? (
            <div className="flex-1 p-6 flex flex-col justify-center">
              <h4 className="font-semibold text-lg mb-2">Start a conversation</h4>
              <p className="text-sm text-gray-500 mb-4">
                Enter your name to begin chatting
              </p>
              <Input
                placeholder="Your name..."
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && startChat()}
                className="mb-4"
              />
              <Button onClick={startChat} className="w-full">
                Start Chat
              </Button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    } animate-fadeIn`}
                  >
                    <div
                      className={`max-w-[75%] rounded-lg px-4 py-2 ${
                        msg.sender === "user"
                          ? "bg-primary text-white"
                          : "bg-gray-100 text-primary"
                      }`}
                    >
                      {msg.sender === "admin" && msg.senderName && (
                        <p className="text-xs font-semibold mb-1">
                          {msg.senderName}
                        </p>
                      )}
                      <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    disabled={isSending || !isConnected}
                  />
                  <Button
                    aria-label="Send message"
                    onClick={sendMessage}
                    size="icon"
                    disabled={isSending || !isConnected}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </Card>
      )}
    </>
  );
}