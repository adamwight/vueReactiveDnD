import {ref} from './vue/vue.js';
import {makeDraggable} from './makeDraggable.js';

const draggable = {
    name:"drag-draggable",
    props:{
        id:String
    },
    emits: [ 'drag' ],
    setup: function(props, { emit }){
        const domDraggable = ref(null); //needed so that it can be set in the template
        
        const{
            isSelected,
            styleTransform,
            mousedown
        }= makeDraggable(props.id, emit);
       

        const styleDefault = {
            "user-select":"none"
        }

        return {
            domDraggable, //to set the ref in the template
            styleDefault,
            //from hook: 
            styleTransform,
            mousedown
        };
    },
    template:`
        <div ref="domDraggable" @mousedown="mousedown" :style="[styleDefault,styleTransform]"><slot></slot></div>`

}

export {draggable};
