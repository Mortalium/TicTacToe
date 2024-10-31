import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')

const socket = new WebSocket('ws://localhost:3000');

//socket.send(JSON.stringify({ type: 'join', sessionId: 'your-session-id' }));

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.type === 'update') {
    
  }else if(data.type === 'win'){

  }else if(data.type === 'loss'){
    
  }else if(data.type === 'even'){
    
  } else if(data.type === 'unlock'){
    
  }else if(data.type === 'lock'){
    
  }
};