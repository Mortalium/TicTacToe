import mitt from 'mitt';

const emitter = mitt();

export const eventBus = emitter;

var sessionId;
var symbol;
var socket;
var yourTurn=false;

export function initializeSocket() {
  socket = new WebSocket('ws://localhost:3000');
  socket.onopen = () => console.log('Socket verbunden');
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === 'update') {
      emitter.emit('buttonUpdate',data);
    }else if(data.type === 'win'){
      emitter.emit('navigate',"/Won");
    }else if(data.type === 'loss'){
      emitter.emit('navigate',"/Lost");
    }else if(data.type === 'even'){
      emitter.emit('navigate',"/Even");
    } else if(data.type === 'unlock'){
      emitter.emit('buttonUnlock');
    }else if(data.type === 'lock'){
      emitter.emit('buttonLock');   
    }else if(data.type === 'validation'){
      if(data.valid){
        emitter.emit('navigate',"/Game");
        setSymbol("o");
      }
    }else if(data.type === 'new_response'){
      setSessionID(data.sessionId);
      emitter.emit('setSessionID',data.sessionId);
    }else if(data.type === 'join_response'){
      setSessionID(data.sessionId);
      emitter.emit('setSessionID',data.sessionId);
    }else if(data.type === 'changeTurn'){
      yourTurn = data.yourTurn;
      emitter.emit('updateYourTurn',data.yourTurn);
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

export function getYourTurn(){
  return yourTurn;
}