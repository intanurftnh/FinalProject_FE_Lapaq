import React from "react";

function ButtonLg({nameButton}) {
  
  const styleButton = {
    borderColor: "#DDDD",
    backgroundColor: "#B31312",
    color: "white",
    fontWeight: "500",
    windth: "90%"
  };

  return (
    <div>
      <button type="button" className="btn btn-lg" style={styleButton}>
        {nameButton}
      </button>
    </div>
  );
}

export default ButtonLg;
