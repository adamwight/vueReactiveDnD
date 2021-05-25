import {ref} from './vue/vue.js';
import {makeDroppable} from './makeDroppable.js';



const droppable = {
    name:"drag-draggable",
    props:{
        id:String
    },
    setup: function(props, { emit }){
        const domDroppable = ref(null);

        makeDroppable(props.id, emit);

        return {domDroppable};
    },
    template:`
        <div ref="domDroppable"><slot></slot></div>`

}

export {droppable};
