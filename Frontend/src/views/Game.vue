<template>
<DisplayPedestal>
    <div class="column">
        <p class="session-id">Session ID: {{ sessionId }}</p>

        <div class="row" v-for="rowIndex in 3" :key="rowIndex">
            <button v-for="colIndex in 3" :key="colIndex" :id="`${rowIndex * 3 - 3 + colIndex}`" ref="buttons" @click="sendData(rowIndex,colIndex)" :disabled="areButtonsDisabled">{{ rowIndex * 3 - 3 + colIndex }}</button>
        </div>
    </div>
</DisplayPedestal>
</template>
<script setup>
import DisplayPedestal from "@/components/DisplayPedastel.vue"
import { ref,onMounted, onUnmounted } from 'vue';
import { eventBus,getSocket,getSessionID,getSymbol } from '@/serviceWebsocket'
</script>
<script>
const buttons = ref([]);
const areButtonsDisabled = ref(true);
const sessionId = getSessionID();

function handleButtonUpdate(data){
    let i = 0;
    for (let row of Object.values(data.board)) {
        for (let col of Object.values(row)){
            button = buttons.value[i];

            button.textContent = col.value;
            i++;
        }
    }
}

function sendData(rowIndex,colIndex){
    board = {
        "a": {
            "1":"",
            "2":"",
            "3":"",
        },
        "b":{
            "1":"",
            "2":"",
            "3":"",
        },
        "c":{
            "1":"",
            "2":"",
            "3":"",
        },
    };
    buttons[rowIndex*3-3+colIndex].textContent = getSymbol;
    let i = 0;
    for (let row of Object.values(data.board)) {
        for (let col of Object.values(row)){
            button = buttons.value[i];

            board.row.col = button.textContent;
            i++;
        }
    }
    let socket = getSocket();
    socket.send(JSON.stringify({type:'update',board:board,sessionId:getSessionID}));
}

function handleButtonUnlock(){
    areButtonsDisabled=false;
}

function handleButtonLock(){
    areButtonsDisabled=true;
}

onMounted(() => {
    eventBus.on('buttonUpdate', handleButtonUpdate);
    eventBus.on('buttonUnlock', handleButtonUnlock);
    eventBus.on('buttonLock', handleButtonLock);
});

onUnmounted(() => {
    eventBus.off('buttonUpdate', handleButtonUpdate);
    eventBus.off('buttonUnlock', handleButtonUnlock);
    eventBus.off('buttonLock', handleButtonLock);
});
</script>

<style scoped>
.column {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding-top: 60px;
}

.session-id {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 14px;
  font-weight: bold;
  background-color: white;
  padding: 5px 10px;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  color: #333;
}


</style>