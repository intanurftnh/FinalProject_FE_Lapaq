import React from "react";

function ButtonRed({nameButton}) {
  
  const styleButton = {
    borderColor: "#DDDD",
    backgroundColor: "#B31312",
    color: "white",
    fontWeight: "500",
  };

  return (
    <div>
      <button type="button" className="btn btn-sm" style={styleButton}>
        {nameButton}
      </button>
    </div>
  );
}

export default ButtonRed;
