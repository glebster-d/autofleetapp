import React from "react";

function Navbar() {
  return (
    <nav>
      <div className="nav-wrapper teal lighten-1" style={{ padding: "0 2rem" }}>
        <span className="brand-logo center">Autofleet App</span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">        
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
