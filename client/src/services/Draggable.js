var currentElement, currentDropzone, startDropzone, offsetX, offsetY, heading;
var oldPos, oldZindex;
var startX, startY;
var dragStarted = false;


function oneIncludesOther(a, b){
  if(a === undefined || b === undefined) return false;
  for(let i = 0; i < a.length; i++){
    if(b.includes(a[i])) return true;
  } return false;
}

function getZIndex(element){
  var z = window.document.defaultView.getComputedStyle(element).getPropertyValue('z-index');
  if (isNaN(z)) return getZIndex(element.parentNode);
  return z; 
}

function findZoneUnderPoint(x, y) {
  var dropzones = document.querySelectorAll(".drag-container");
  var bestDropzone = undefined;
  let bestZIndex = -99999;
  for (var i = 0; i < dropzones.length; i++) {
    var box = dropzones[i].getBoundingClientRect();
    if (x > box.left && x < box.right && y > box.top && y < box.bottom) {
      if(bestDropzone === undefined){
        bestDropzone = dropzones[i];
        bestZIndex = getZIndex(dropzones[i]);
      }
      else {
        if(getZIndex(dropzones[i]) > bestZIndex){
          bestZIndex = getZIndex(dropzones[i]);
          bestDropzone = dropzones[i];
        }
      }
    }
  }
  return bestDropzone;
}

function onMouseDown(event) {
    if(event.button != 0) return;
    heading = event.target.closest(".dragonroll-draggable");
    startDropzone = findZoneUnderPoint(event.clientX, event.clientY);
    if(!heading) return;
    currentElement = heading.__element;
    if (currentElement) {
        currentElement.style.width = "auto";
        currentElement.style.height = "auto";
        var box = currentElement.getBoundingClientRect();
        offsetY = event.clientY - box.y;
        offsetX = event.clientX - box.x;
        startX = (event.clientX - offsetX);
        startY = (event.clientY - offsetY);
        this.addEventListener("mousemove", onMouseMove);
        this.addEventListener("mouseup", onMouseUp);
    }
}

function onMouseMove(event) {
    if(!currentElement) return;
    if( Math.sqrt(
            Math.pow((startX - (event.clientX - offsetX)), 2) +
            Math.pow((startY - (event.clientY - offsetY)), 2)
        ) > 50){
        currentElement.style.left = (event.clientX - offsetX) + "px";
        currentElement.style.top = (event.clientY - offsetY) + "px";
    } else return;

    if(!dragStarted){
        currentElement.classList.add("drag"); 
        currentElement.style.left = (event.clientX - offsetX) + "px";
        currentElement.style.top = (event.clientY - offsetY) + "px";
        
        oldPos = currentElement.style.position;
        oldZindex = currentElement.style.zIndex;
        currentElement.style.position = "fixed";
        currentElement.style.zIndex = "9999999";
        dragStarted = true;
    }


  var dropzone = findZoneUnderPoint(event.clientX, event.clientY);
  // if (dropzone !== startDropzone) {
    if (dropzone !== currentDropzone) {
      // Leave dropzone
      // console.log("Leaving dropzone")
      if(currentDropzone !== undefined){
        currentDropzone.classList.remove('dashed');
      }
      // -> drag enter zone
      currentDropzone = dropzone;
      if(dropzone !== undefined && dropzone !== startDropzone){
        console.log(currentDropzone.__validDrops);
        if(oneIncludesOther(currentDropzone.__validDrops, currentElement.__dropTypes)){
          dropzone.classList.add('dashed')
        }
      }
      // console.log("Enter other drop zone");
    }
  // }
}
function onMouseUp(event) {
    if(event.button != 0) return;
    
    let clickOnly = false;
    if(!dragStarted){
        clickOnly = true;
    }
    dragStarted = false;
    currentElement.style.position = oldPos;
    currentElement.style.zIndex = oldZindex;
    currentElement.classList.remove("drag");
    this.removeEventListener("mousemove", onMouseMove);
    this.removeEventListener("mouseup", onMouseUp);
    
    if(clickOnly){
      currentElement._click();
      return;
    }

    if(currentDropzone !== startDropzone && currentDropzone !== undefined){
      // Dropped on a valid dropzone
      currentDropzone.classList.remove("dashed");

      if(oneIncludesOther(currentDropzone.__validDrops, currentElement.__dropTypes)){
        currentDropzone.__onDrop(currentElement.__dropData);
      }
      currentElement = null;
    }
}
document.addEventListener("mousedown", onMouseDown);

function MakeDraggable(element, header, click, elementData = {}, dropTypes = undefined){
    header.classList.add('dragonroll-draggable');
    element._click = click;
    element.__dropData = elementData;
    header.__element = element;
    element.__dropTypes = dropTypes;
}

export {
    MakeDraggable
}