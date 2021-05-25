import {inject,onMounted,onUnmounted} from './vue/vue.js';

function makeDroppable(id, emit){

    onMounted(()=>{
        emit('register-droppable', id);
    });

    onUnmounted(()=>{
        emit('deregister-droppable', id);
    });
}

export {makeDroppable};
