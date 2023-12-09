window.onload = function () {
  // find the element that you want to drag.
  var box = document.getElementById("box");

  /* listen to the touchMove event,
    every time it fires, grab the location
    of touch and assign it to box */

  box.addEventListener("touchmove", function (e) {
    // grab the location of touch
    var touchLocation = e.targetTouches[0];

    // assign box new coordinates based on the touch.
    box.style.left = pageX - box.offsetWidth / 2 + "px";
    box.style.top = pageY - box.offsetHeight / 2 + "px";
  });
};
