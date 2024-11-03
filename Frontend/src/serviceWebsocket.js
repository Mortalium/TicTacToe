import { useRouter } from 'vue-router';
import mitt from 'mitt';

const emitter = mitt();

export const eventBus = emitter;

var sessionId;

var symbol;

export function initializeSocket() {
  socket = new WebSocket('ws://localhost:3000');
  socket.onopen = () => console.log('Socket verbunden');
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === 'update') {
      emitter.emit('buttonUpdate',data);
    }else if(data.type === 'win'){
  
    }else if(data.type === 'loss'){
      
    }else if(data.type === 'even'){
      
    } else if(data.type === 'unlock'){
      emitter.emit('buttonUnlock');
    }else if(data.type === 'lock'){
      emitter.emit('buttonLock');
    }else if(data.tyoe === 'validation'){
      if(data.valid){
        const router = useRouter();
        router.push('/Game');
        setSymbol("o");
      }
    }else if(data.type === 'new_response'){
      setSessionID(data.sessionId);
    }
  socket.onclose = () => console.log('Socket geschlossen');
  return socket;
}


};
export function getSocket() {
  return socket;
}
export function sendCode(code){
  socket.send(JSON.stringify({type:"join",sessionId:code}))
}

export function setSessionID(sessionId){
  this.sessionId = sessionId;
}

export function getSessionID(){
  return this.sessionId;
}

export function setSymbol(symbol){
  this.symbol = symbol;
}

export function getSymbol(){
  return symbol;
}