import React from "react";

function Menu() {
  return (
    <div>
      <div
        class="d-flex gap-5 justify-content-center align-items-center"
        style="height: 60px"
      >
        <div>
          <img src={icon1} alt="" />
        </div>
        <div>
          <img src={icon2} alt="" />
        </div>
        <div>
          <img src={icon3} alt="" />
        </div>
        <div>
          <img src={icon4} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Menu;
