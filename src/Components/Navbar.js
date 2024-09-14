import React from "react";

import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/authcontext";
import toast, { Toaster } from "react-hot-toast";

const Navbar = () => {
  const [auth, setauth] = useAuth();
  const handleLogout = () => {
    setauth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  return (
    <div>
      <Toaster />
      <nav className="navbar navbar-expand-lg ">
        <div className="container" style={{zIndex:"10"}}>
          <Link className="navbar-brand" href="#">
            {!auth.user ? (
              <>
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </>
            ) : (
              <>
                <li className="nav-item dropdown" style={{zIndex:"10"}}>
                  <NavLink
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {auth?.user?.name}
                  </NavLink>
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink
                        to={`/dashboard/${
                          auth?.user?.role === 1 ? "admin" : "user"
                        }`}
                        className="dropdown-item"
                      >
                        Dashboard
                      </NavLink>
                      <NavLink
                        onClick={handleLogout}
                        className="dropdown-item"
                        to="/"
                      >
                        Logout
                      </NavLink>{" "}
                    </li>
                  </ul>
                </li>
              </>
            )}
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarContent">
            <div className="d-flex justify-content-between w-100">
              <ul className="navbar-nav  mb-2 mb-lg-0">
                <li className="nav-item">
                  {/* <NavLink
                    className="nav-link active"
                    aria-current="page"
                    to="/"
                  >
                    Home
                  </NavLink> */}
                </li>
              </ul>

              <div className="d-flex d-sm-inline-flex-colum fs-2 mx-3"></div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
