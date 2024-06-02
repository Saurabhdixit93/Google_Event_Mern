import React from "react";

export default function HoverToolTip({ textMessage, children }) {
  return (
    <div className="relative group" style={{ zIndex: "10000" }}>
      {children}
      <span className="tooltip group-hover:scale-100 w-max">{textMessage}</span>
    </div>
  );
}
