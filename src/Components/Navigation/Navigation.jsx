import logo from "../../Image/logo.png";
import { Link, useLocation } from "react-router-dom";
import "./navigation.scss";
import { useState, useRef, useEffect } from "react";
const Navigation = (props) => {
  var Menu = [
    {
      display: "Home",
      path: "/",
      icon: "fas fa-home",
    },
    {
      display: "Community",
      path: "/community",
      icon: "fas fa-fax",
    },
    {
      display: "Discovery",
      path: "/discovery",
      icon: "far fa-compass",
    },
    {
      display: "Coming soon",
      path: "/comming",
      icon: "far fa-clock",
    },
  ];
  var Social = [
    {
      display: "Friends",
      path: "/friends",
      icon: "far fa-user",
    },
    {
      display: "Parties",
      path: "/parties",
      icon: "fas fa-users",
    },
    {
      display: "Media",
      path: "/media",
      icon: "fas fa-compact-disc",
    },
  ];
  var Genaral = [
    {
      display: "Setting",
      path: "/setting",
      icon: "fas fa-cog",
    },
    {
      display: "Log out",
      path: "/logout",
      icon: "fas fa-sign-out-alt",
    },
  ];
  var currentPath = useLocation().pathname; // lấy path hiện tại
  var pathActive;
  if ((currentPath = "/home/tv")) {
    pathActive = "/";
  } else {
    pathActive = currentPath;
  }
  const onClose = () => {
    var status = false;
    props.reciveStatus(status);
  };
  const myRef = useRef();
  const check = (e) => {
    if (!myRef.current.contains(e.target)) {
      onClose();
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", check);
    return () => document.removeEventListener("mousedown", check);
  });

  return (
    <div className="navigation">
      <div className="navigation__container">
        <div className="navigation__container__logo">
          <img src={logo} alt="" />
        </div>
        <div className="navigation__container__menu">
          <h1>Menu</h1>
          <ul>
            {Menu.map((item, index) => (
              <li
                key={index}
                className={`${item.path === pathActive ? "active" : ""}`}
              >
                <Link to="/">
                  <i className={item.icon}></i>
                  <p>{item.display}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="navigation__container__social">
          <h1>Social</h1>
          <ul>
            {Social.map((item, index) => (
              <li
                key={index}
                className={`${
                  item.path === currentPath.pathActive ? "active" : ""
                }`}
              >
                <Link to="/">
                  <i className={item.icon}></i>
                  <p>{item.display}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="navigation__container__general">
          <h1>General</h1>
          <ul>
            {Genaral.map((item, index) => (
              <li
                key={index}
                className={`${
                  item.path === currentPath.pathActive ? "active" : ""
                }`}
              >
                <Link to="/">
                  <i className={item.icon}></i>
                  <p>{item.display}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div
        id="menu"
        ref={myRef}
        className={`navigation__mobile__container ${
          props.status ? "active-menu" : "unactive-menu"
        }`}
      >
        <div className="navigation__mobile__container__menu">
          <div className="close-menu">
            <i className="fas fa-times" onClick={() => onClose()}></i>
          </div>
          <div className="menu">
            <h1>Menu</h1>
            <ul>
              {Menu.map((item, index) => (
                <li
                  key={index}
                  className={`${item.path === pathActive ? "active" : ""}`}
                >
                  <Link to="/">
                    <i className={item.icon}></i>
                    <p>{item.display}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="social">
            <h1>Social</h1>
            <ul>
              {Social.map((item, index) => (
                <li
                  key={index}
                  className={`${
                    item.path === currentPath.pathname ? "active" : ""
                  }`}
                >
                  <Link to="/">
                    <i className={item.icon}></i>
                    <p>{item.display}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="general">
            <h1>General</h1>
            <ul>
              {Genaral.map((item, index) => (
                <li
                  key={index}
                  className={`${
                    item.path === currentPath.pathname ? "active" : ""
                  }`}
                >
                  <Link to="/">
                    <i className={item.icon}></i>
                    <p>{item.display}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navigation;
