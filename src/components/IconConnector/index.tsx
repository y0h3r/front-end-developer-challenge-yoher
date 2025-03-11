import React from "react";
import "./styles.css";

interface IconConnectorProps {
  status?: 'active' | 'inactive';
}

const IconConnector: React.FC<IconConnectorProps> = ({ status = 'inactive' }) => {

  return (
    <div
      data-testid="icon-connector"
      onContextMenu={(e) => e.preventDefault()}
      className={`iconConnector ${status === "active" ? "glowConnector" : ""}`}
    />
  );
};

export default IconConnector;
