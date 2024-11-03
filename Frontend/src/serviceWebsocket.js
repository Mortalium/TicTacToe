import { useRouter } from 'vue-router';

var sessionId;

export function initializeSocket() {
  socket = new WebSocket('ws://localhost:3000');
  socket.onopen = () => console.log('Socket verbunden');
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === 'update') {
      
    }else if(data.type === 'win'){
  
    }else if(data.type === 'loss'){
      
    }else if(data.type === 'even'){
      
    } else if(data.type === 'unlock'){
      
    }else if(data.type === 'lock'){
      
    }else if(data.tyoe === 'validation'){
      if(data.valid){
        const router = useRouter();
        router.push('/Game');
      }
    }else if(data.type === 'new_response'){
      setSessionID(data.sessionId)
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