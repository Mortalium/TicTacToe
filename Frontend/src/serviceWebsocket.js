import { ref } from 'vue';

const socket = ref(null);

export function initializeSocket() {
  if (!socket.value) {
    socket.value = new WebSocket('ws://localhost:3000');
    socket.value.onopen = () => console.log('Socket verbunden');
    socket.value.onmessage = (message) => console.log('Nachricht erhalten:', message.data);
    socket.value.onclose = () => console.log('Socket geschlossen');
  }
  return socket.value;
}

export function getSocket() {
  return socket.value;
}
export function sendCode(code){
  socket.send(JSON.stringify({type:"join",sessionId:code}))
}