import { io } from 'socket.io-client';
const baseUrl = import.meta.env.VITE_BACKEND_API_BASE_URL;
const socket = io(baseUrl || 'http://localhost:4000');
socket.on('connect', () => {
    console.log('✅ Connected to Socket.io:', socket.id);
});
export default socket;
