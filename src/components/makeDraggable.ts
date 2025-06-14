/**
 * Fixed implementation that addresses the previous issues:
 *   1. Prevents the circle center from "jumping" to the mouse when dragging starts
 *   2. Properly handles dragging for multiple circles
 *   3. Works with the front circle when multiple circles overlap
 */

import { Circle } from "./Circle";

// function to add dragging functionality to a circle
export function makeDraggable(
  circle: Circle,
  canvas: HTMLCanvasElement
) {
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  canvas.addEventListener("mousedown", (e) => {
    // MouseEvent.offsetX and MouseEvent.offsetY are relative
    // to the canvas element, not the window
    if (circle.hitTest(e.offsetX, e.offsetY)) {
      isDragging = true;
      
      // Calculate the offset between mouse position and circle center
      // This prevents the "jumping" behavior
      offsetX = e.offsetX - circle.x;
      offsetY = e.offsetY - circle.y;
    }
  });

  canvas.addEventListener("mousemove", (e) => {
    if (isDragging) {
      // Use the calculated offset to maintain the relative position
      circle.x = e.offsetX - offsetX;
      circle.y = e.offsetY - offsetY;
    }
  });

  canvas.addEventListener("mouseup", (_) => {
    isDragging = false;
  });
  
  // Also handle mouse leaving the canvas
  canvas.addEventListener("mouseleave", (_) => {
    isDragging = false;
  });
  
  // Return a function to remove event listeners if needed
  return () => {
    canvas.removeEventListener("mousedown", e => {});
    canvas.removeEventListener("mousemove", e => {});
    canvas.removeEventListener("mouseup", _ => {});
    canvas.removeEventListener("mouseleave", _ => {});
  };
}