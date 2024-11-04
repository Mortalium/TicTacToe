<template>
<DisplayPedestal>
    <div class="column">
        <p class="session-id">Session ID: {{ sessionId }}</p>
        <p class="your-turn">Your Turn: {{ yourTurn ? 'Yes' : 'No' }}</p>

        <div class="row" v-for="rowIndex in 3" :key="rowIndex">
            <button v-for="colIndex in 3" :key="colIndex" :id="`${rowIndex * 3 - 3 + colIndex}`" :ref="addButtonRef" @click="sendData(rowIndex,colIndex)" :disabled="areButtonsDisabled"></button>
        </div>
    </div>
</DisplayPedestal>
</template>
<script setup>
import DisplayPedestal from "@/components/DisplayPedastel.vue"
import { ref,onMounted, onUnmounted } from 'vue';
import { eventBus,getSocket,getSessionID,getSymbol} from '@/serviceWebsocket'
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(() => {
    eventBus.on('buttonUpdate', handleButtonUpdate);
    eventBus.on('buttonUnlock', handleButtonUnlock);
    eventBus.on('buttonLock', handleButtonLock);
    eventBus.on('navigate',(path)=>{
        router.push(path);
    });
    eventBus.on('updateYourTurn',updateYourTurn);
    eventBus.on('setSessionID',setSessionID);
});

onUnmounted(() => {
    eventBus.off('buttonUpdate', handleButtonUpdate);
    eventBus.off('buttonUnlock', handleButtonUnlock);
    eventBus.off('buttonLock', handleButtonLock);
    eventBus.off('navigate',(path)=>{
        router.push(path);
    });
    eventBus.off('updateYourTurn',updateYourTurn);
    eventBus.off('setSessionID',setSessionID);
});

const buttons = ref([]);
function addButtonRef(el) {
  if (el) buttons.value.push(el);
}

var areButtonsDisabled = ref(true);
var yourTurn = ref(false);
var sessionId = ref(null);

function updateYourTurn(yT){
    yourTurn.value = yT;
}

function setSessionID(sID){
    sessionId.value = sID;
}

function handleButtonUpdate(data){
    let i = 0;
    for (let row of Object.values(data.board)) {
        for (let col of Object.values(row)){
            let button = buttons.value[i];

            button.textContent = col;
            i++;
        }
    }
}

function sendData(rowIndex,colIndex){
    let idx = rowIndex*3-3+colIndex-1;
    if(buttons.value[idx].textContent!="x" ||buttons.value[idx].textContent!="o"){
        buttons.value[idx].textContent = getSymbol();
        let board = {
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
        let i = 0;
        for (let row of Object.keys(board)) {
            for (let col of Object.keys(board[row])){
                let button = buttons.value[i];
                board[row][col] = button.textContent;
                i++;
            }
        }
        let socket = getSocket();
        socket.send(JSON.stringify({type:'update',board:board,sessionId:getSessionID()}));
    }
}

function handleButtonUnlock(){
    areButtonsDisabled=false;
}

function handleButtonLock(){
    areButtonsDisabled=true;
}


</script>

<style scoped>

.column {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding-top: 60px;
}

.session-id{
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
