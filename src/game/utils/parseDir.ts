interface SimpleVector {
  x: number;
  y: number;
}

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT" | "NORTH" | "SOUTH" | "WEST" | "EAST";

export default function parseDir(direction: Direction): SimpleVector {
  let x = 0;
  let y = 0;

  switch (direction.toUpperCase()) {
    case "UP":
    case "NORTH":
      y = 1;
      break;
    case "DOWN":
    case "SOUTH":
      y = -1;
      break;
    case "LEFT":
    case "WEST":
      x = -1;
      break;
    case "RIGHT":
    case "EAST":
      x = 1;
      break;
  }

  return { x, y };
}