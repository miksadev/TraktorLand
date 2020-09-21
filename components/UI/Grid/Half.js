import React from "react";

const Half = ({ children, className }) => {
  return (
    <div className={className} style={{ width: "50vw" }}>
      {children}
    </div>
  );
};

export default Half;
