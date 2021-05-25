import { computed, inject, onMounted, onUnmounted, ref } from './vue/vue.js';

function makeDraggable(id, emit){
    const isSelected = ref(false);
    
    onMounted(()=>{
        emit('register-draggable', id);
    });

    onUnmounted(()=>{
        emit('deregister-draggable', id);
    });

    const mousedown = function(e){
        isSelected.value = true; // TODO: dragEnd resets.
        emit('drag', id);
    };
    
    
    // provide the transform properties
    
    const diffToDownPoint = inject("diffToDownPoint");
    
    const styleTransform = computed(function(){
        let transformValue = "translate("+0+"px,"+ 0 +"px)"; //do not move element, except...
        if (isSelected.value) {
            transformValue = "translate("+diffToDownPoint.value.x+"px,"+ diffToDownPoint.value.y +"px)";
        }
        return {
            "transform":transformValue
        };
     });

     return{
        isSelected,
        styleTransform,
        mousedown, //event handler for selection
     };
}

export {makeDraggable};
