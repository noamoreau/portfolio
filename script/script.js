window.onload = function () {
  // find the element that you want to drag.
  let currentDroppable = null;
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

  /* record the position of the touch
    when released using touchend event.
    This will be the drop position. */

  box.addEventListener("touchend", function (e) {
    // current box position.
    var x = parseInt(box.style.left);
    var y = parseInt(box.style.top);
  });
  box.onmousedown = function (event) {
    // (1) la préparer au déplacement :  réglé en absolute et en haut par z-index
    box.style.position = "absolute";
    box.style.zIndex = 1000;

    // déplacez-le de tout parent actuel directement dans body
    // pour le placer par rapport à body
    document.body.append(box);

    // Centrer la balle aux coordonnées (pageX, pageY)
    function moveAt(pageX, pageY) {
      box.style.left = pageX - box.offsetWidth / 2 + "px";
      box.style.top = pageY - box.offsetHeight / 2 + "px";
    }

    // déplacer notre balle en positionnement absolu sous le pointeur
    moveAt(event.pageX, event.pageY);

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);

      box.hidden = true;
      let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
      box.hidden = false;

      if (!elemBelow) return;

      let droppableBelow = elemBelow.closest(".droppable");
      if (currentDroppable != droppableBelow) {
        if (currentDroppable) {
          // null lorsque nous étions sur un élément déposable avant cet évènement
          leaveDroppable(currentDroppable);
        }
        currentDroppable = droppableBelow;
        if (currentDroppable) {
          // null si nous ne n'atterrissions pas sur un élément déposable maintenant
          // (peut être a juste quitte l'objet déposable)
          enterDroppable(currentDroppable);
        }
      }
    }

    // (2) déplacer la balle sur le déplacement de la souris
    document.addEventListener("mousemove", onMouseMove);

    // (3) laisser tomber la balle, retirer les gestionnaires inutiles
    box.onmouseup = function () {
      document.removeEventListener("mousemove", onMouseMove);
      box.onmouseup = null;
    };

    function enterDroppable(elem) {
      elem.style.background = "pink";
    }

    function leaveDroppable(elem) {
      elem.style.background = "";
    }

    box.ondragstart = function () {
      return false;
    };
  };
};
