import React from "react";
import "../../SAAS/Navbar/Navbar.css"
const Navbar=()=>{
    return (
        <>
          <div className="navbar-container-fluid">
            <div className="navbar-container">
                <div className="navbar-logo">
                   <img src="./img/search.png" alt="logo" />
                </div>

                <div className="navbar-list">
                    <ul className="navbar-list-items">
                        <li className="navbar-list-item">Home</li>
                        <li className="navbar-list-item">Login</li>
                        <li className="navbar-list-item">SignUp</li>
                    </ul>
                </div>
            </div>
          </div>
        </>
    )
}

export default Navbar;