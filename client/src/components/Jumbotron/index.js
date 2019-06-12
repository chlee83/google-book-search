import React from "react";

function Jumbotron({ children }) {
  return (
    <div
      style={{ clear: "both", textAlign: "center" }}
      className="jumbotron bg-secondary"
    >
      {children}
    </div>
  );
}

export default Jumbotron;
