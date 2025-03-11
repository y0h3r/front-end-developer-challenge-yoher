import React from "react";
import "./styles.css";

interface IconConnectorProps {
  status?: 'active' | 'inactive';
}

const IconConnector: React.FC<IconConnectorProps> = ({ status = 'inactive' }) => {

  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      className={`iconConnector ${status === "active" ? "glowConnector" : ""}`}
    />
  );
};

export default IconConnector;
