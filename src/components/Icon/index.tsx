import React, { useCallback } from "react";
import logo from '@assets/images/talent-icons-sprite.png'

import "./styles.css";
interface IconProps {
  name: "stack" | "fork" | "cake" | "crown" | "ship" | "goggles" | "lightning" | "skull";
  status?: 'active' | 'inactive';
  size?: number;
  onClick: Function;
}

type CardinalCoordinate = { x: number; y: number}
const ICON_POSITIONS: Record<string, { active: CardinalCoordinate, inactive: CardinalCoordinate}> = {
  stack: {inactive: { x: 0, y: 50 }, active: { x: 0, y: 0 }},
  fork: {inactive: { x: 50, y: 50 }, active: { x: 50, y: 0 }},
  cake: {inactive: { x: 100, y: 50 }, active: { x: 100, y: 0 }},
  crown: {inactive: { x: 150, y: 50 }, active: { x: 150, y: 0 }},
  ship: {inactive: { x: 200, y: 50 }, active: { x: 200, y: 0 }},
  goggles: {inactive: { x: 250, y: 50 }, active: { x: 250, y: 0 }},
  lightning: {inactive: { x: 300, y: 50 }, active: { x: 300, y: 0 }},
  skull: {inactive: { x: 350, y: 50 }, active: { x: 350, y: 0 }},
};

const Icon: React.FC<IconProps> = ({ name, size = 40, status = 'inactive', onClick }) => {

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      onClick({ left: event.button === 0, right: event.button === 2 });
    },
    [onClick]
  );
  
  const position = ICON_POSITIONS[name];
  return (
    <div
      role="button"
      onMouseDown={handleMouseDown}
      onContextMenu={(e) => e.preventDefault()}
      className={`icon ${status === "active" ? "glow" : ""}`}
      style={{
        width: size,
        height: size,
        backgroundImage: `url(${logo})`,
        backgroundPosition: `-${position[status].x}px -${position[status].y}px`,
        backgroundSize: "auto",
      }}
    />
  );
};

export default Icon;
