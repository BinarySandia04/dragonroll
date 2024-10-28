var currentElement, currentDropzone, offsetX, offsetY, heading;
var oldPos, oldZindex;
var startX, startY;
var dragStarted = false;

function findZoneUnderPoint(x, y) {
    /*
  var dropzones = preview.querySelectorAll(".dragonroll-dropzone");
  for (var i = 0; i < dropzones.length; i++) {
    var box = dropzones[i].getBoundingClientRect();
    if (x > box.left && x < box.right && y > box.top && y < box.bottom) {
      return dropzones[i];
    }
  }
    */
}

function onMouseDown(event) {
    if(event.button != 0) return;
    heading = event.target.closest(".dragonroll-draggable");
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
    console.log(offsetX);
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
  if (dropzone !== currentDropzone) {
    if (dropzone) {
      // -> drag enter zone
    }
    if (currentDropzone) {
      // -> drag leave zone
    }
    currentDropzone = dropzone;
  }
}
function onMouseUp(event) {
    if(event.button != 0) return;
    if(!dragStarted){
        currentElement._click();
    }
    dragStarted = false;
    currentElement.style.position = oldPos;
    currentElement.style.zIndex = oldZindex;
    currentElement.classList.remove("drag");
    this.removeEventListener("mousemove", onMouseMove);
    this.removeEventListener("mouseup", onMouseUp);

    /*
  var dropzone = findZoneUnderPoint(event.clientX, event.clientY);
  if (dropzone) {
    // -> drag complete
  } else {
    // -> drag canceled
  }
  currentElement = null;
  document.removeEventListener("mouseup", onMouseUp);
  document.removeEventListener("mousemove", onMouseMove);
  */
}
document.addEventListener("mousedown", onMouseDown);

function MakeDraggable(element, header, click){
    header.classList.add('dragonroll-draggable');
    element._click = click;
    header.__element = element;
}

export {
    MakeDraggable
}