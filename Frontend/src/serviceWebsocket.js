import { useRouter } from 'vue-router';
import mitt from 'mitt';

const emitter = mitt();

export const eventBus = emitter;

var sessionId;
var symbol;
var socket;

export function initializeSocket() {
  socket = new WebSocket('ws://localhost:3000');
  socket.onopen = () => console.log('Socket verbunden');
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    const router = useRouter();
    if (data.type === 'update') {
      emitter.emit('buttonUpdate',data);
    }else if(data.type === 'win'){
      router.push("/Won")
    }else if(data.type === 'loss'){
      router.push("/Lost")
    }else if(data.type === 'even'){
      router.push("/Even")
    } else if(data.type === 'unlock'){
      emitter.emit('buttonUnlock');
    }else if(data.type === 'lock'){
      emitter.emit('buttonLock');
    }else if(data.tyoe === 'validation'){
      if(data.valid){
        router.push('/Game');
        setSymbol("o");
      }
    }else if(data.type === 'new_response'){
      setSessionID(data.sessionId);
    }
  };
  socket.onclose = () => console.log('Socket geschlossen');
  return socket;
}

export function getSocket() {
  return socket;
}
export function sendCode(code){
  socket.send(JSON.stringify({type:"join",sessionId:code}))
}

export function setSessionID(id){
  sessionId = id;
}

export function getSessionID(){
  return sessionId;
}

export function setSymbol(sb){
  symbol = sb;
}

export function getSymbol(){
  return symbol;
}