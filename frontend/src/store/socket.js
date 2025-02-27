import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
   autoConnect: false,
   transports: ["websocket"]
});

socket.on("connect", () => {
   console.log("✅ Socket connected:", socket.id);
});

socket.on("connect_error", (err) => {
   console.error("❌ Socket connection failed:", err.message);
});

socket.on("notification", (message) => {
   console.log("📩 SOCKET RECEIVED NOTIFICATION:", message);
});

export default socket;
