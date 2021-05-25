import {provide, reactive, ref} from './vue/vue.js';
import {useDragDiffProvider} from './useDragDiffProvider.js';
//import {useDroppableProvider} from './useDroppableProvider.js';
import {findDropTarget} from './collisionHelpers.js';
import {computeDragRect, computeSelectionEnclosingRect, computeOverDroppableIds} from './dragUtils.js'

const dragContext = {
    name: "dragContext",
    props: {
        onDragend: Function
    },
    setup: function (props, context){
        const selectedElement = ref(null);
        const droppableList = new Map();
        const draggableList = new Map();

        //DRAG DIFF PROVISION
        let {
            lastEvent,
            diffToDownPoint,
            isDragging,
            diffHandlerDown,
            diffHandlerMove,
            diffHandlerUp
        } = useDragDiffProvider(props, context);

        provide('isDragging', isDragging);
        provide('diffToDownPoint', diffToDownPoint);

        const selectionRect = computeSelectionEnclosingRect(selectedElement,draggableList);

        const dragRect = computeDragRect(diffToDownPoint,selectionRect);

        const isOver = computeOverDroppableIds(draggableList,droppableList,selectedElement);  
        
        const dragData = reactive({
            dragRect:dragRect,
            isOver:isOver,
            lastEvent: lastEvent,
            isDragging: isDragging
        });
        
        provide ('dragData', dragData);

        // CALL PROPed EVENT HANDLERS
        //calls onDragend function passed in via Prop (in the demo this is done in app.js), 
        //so the component itself is agnostic towards it. 
        const callDragEndHandler = function(event){   
            if (isDragging.value == true && props.onDragend) {
                let dropTargetId = findDropTarget(draggableList,droppableList, selectedElement);
                props.onDragend(event, selectedElement, dropTargetId);
            }
        };



        // PASS TO TEMPLATE
        return {
            diffHandlerDown,
            diffHandlerMove,
            diffHandlerUp,
            callDragEndHandler,
            diffToDownPoint,
            dragData
        };
    },
    template: `
    <div 
        v-on:mousedown="diffHandlerDown" 
        v-on:mousemove="diffHandlerMove"
        v-on:mouseup="callDragEndHandler($event),diffHandlerUp($event) "
    >   
    <div style="
        top:{{dragData.dragRect.y+'px}};
        left: {{dragData.dragRect.x+'px'}};
        width: {{dragData.dragRect.width+'px'}};
        height:{{dragData.dragRect.height+'px'}};
        position: absolute;
        outline: 1px solid blue; 
    ">…</div>
        <slot></slot>
        <ul>
            <li>Is Dragging? {{dragData.isDragging}}</li>
            <li>is Over? {{Array.from(dragData.isOver).toString()}}</li>
            <li>Last Event? {{dragData.lastEvent}}</li>
        </ul>
        
    </div>
    `
}

export { dragContext }