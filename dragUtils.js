import {computed} from './vue/vue.js';
import {findDropTarget} from './collisionHelpers.js'

const computeOverDroppableIds = function(draggableList,droppableList, selectedElement){
    const isOver = computed(()=>{   
        const elementIdsOverData = new Set(); 
        elementIdsOverData.add(
            findDropTarget(draggableList,droppableList, selectedElement)
        );
        return elementIdsOverData;
    });
    
    return isOver;
};

//get a rectangle, shifted by the distance of the drag
const computeDragRect = function(dragdiff, selectionRect){
    const dragRect = computed(()=>{
         return {
             x: selectionRect.x + dragdiff.x, 
             y: selectionRect.y + dragdiff.x,
             width: selectionRect.width,
             height: selectionRect.height 
         }; 
    });

    return dragRect; 
};


//get a rectangle enclosing the selected elements 
const computeSelectionEnclosingRect = function(selectedElement,selectableElements){

    return computed(()=>{
        if ( selectedElement !== null ) {
            singleElementBoundingRect = selectableElements.get(id).getBoundingClientRect();
            //take position coordinates that are more top-left

            return {
                x: selectionRectData.x < singleElementBoundingRect.x ? selectionRectData.x: singleElementBoundingRect.x,
                y: selectionRectData.y < singleElementBoundingRect.y ? selectionRectData.y: singleElementBoundingRect.y,
                //take size coordinates if more  bottom-right
                width: selectionRectData.width > singleElementBoundingRect.width ? selectionRectData.width: singleElementBoundingRect.width,
                height: selectionRectData.height > singleElementBoundingRect.height ? selectionRectData.height: singleElementBoundingRect.height
            }
        } else {
            return selectionRectData = {
                x:null, 
                y:null,
                width: null, 
                height: null
            };
        }
    });
};

export {computeDragRect, computeSelectionEnclosingRect, computeOverDroppableIds};