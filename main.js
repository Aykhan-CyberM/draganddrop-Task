const draggables = document.querySelectorAll(".draggable");
const containers = document.querySelectorAll(".container");

containers.forEach((container) => {
  container.addEventListener("dragover", (e) => {
    e.stopPropagation();
    e.preventDefault();

    const afterElement = getDragAfterElement(container, e.clientY);
    const draggable = document.querySelector(".dragging");

    if (afterElement == null) {
      container.appendChild(draggable);
    } else {
      container.insertBefore(draggable, afterElement);
    }
  });

  container.addEventListener("dragstart", (e) => {
    const id = e.target.id;
    const box = document.getElementById(id);

    box.classList.add("dragging");
  });

  container.addEventListener("dragend", (e) => {
    const id = e.target.id;
    const box = document.getElementById(id);

    box.classList.remove("dragging");
  });
});

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll(".draggable:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;

      if (offset < 0 && offset > closest.offset) {
        return {
          offset: offset,
          element: child,
        };
      }
      return closest;
    }, {
      offset: Number.NEGATIVE_INFINITY
    }
  ).element;
}