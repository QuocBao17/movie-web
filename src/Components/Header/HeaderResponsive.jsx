import logo from "./../../Image/logo.png";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "./headerResponsive.scss";
import { useRef, useState, useEffect } from "react";
import tmdbApi, { category } from "../../Api/tmbdApi";
import PopupSearch from "../PopupSearch/PopupSearch";
const HeaderResponsive = (props) => {
  const Nav = [
    {
      display: "TV Series",
      path: "/home/tv",
    },
    {
      display: "Movies",
      path: "/",
    },
  ];
  const curerentPath = useLocation();
  var currentPath = useLocation().pathname; // lấy path hiện tại
  var pathArray = currentPath.split("/");
  var pathActive;
  if (pathArray.includes("tv")) {
    pathActive = "/home/tv";
  } else {
    pathActive = "/";
  }
  const onOpen = () => {
    var status = true;
    props.props.reciveStatus(status);
  };
  const [keyword, setKeyword] = useState([]);
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState(false);
  const getItem = async () => {
    const params = {
      query: keyword,
    };
    const response = await tmdbApi.search(category.movie, { params });
    setItems(response.results.splice(0, 3));
  };
  const goToSearch = () => {
    getItem();
    handleClickInside();
  };
  const myRef = useRef();
  const handleClickOutside = (e) => {
    if (!myRef.current.contains(e.target)) {
      setStatus(false);
    }
  };
  const handleClickInside = () => {
    setStatus(true);
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });
  return (
    <div>
      <div className="movies__container__left__responsive__logo">
        <div className="movies__container__left__responsive__logo__content">
          <img src={logo} alt="" />
        </div>
      </div>
      <div className="movies__container__left__nav">
        <div className="movies__container__left__nav__menu">
          <i id="iconOpen" className="fas fa-bars" onClick={() => onOpen()}></i>
        </div>
        <ul>
          {Nav.map((item, index) => (
            <Link to={item.path} key={index}>
              <li className={`${item.path === pathActive ? "active" : ""}`}>
                {item.display}
              </li>
            </Link>
          ))}
        </ul>
        <div
          className={`movies__container__left__nav__search ${
            status ? "active-search" : "noactive-search"
          }`}
          ref={myRef}
        >
          <input
            type="text"
            placeholder="Search"
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
          />
          <i className="fas fa-search" onClick={goToSearch}></i>
          <PopupSearch item={items} cate="movie"></PopupSearch>
        </div>
      </div>
    </div>
  );
};
export default HeaderResponsive;
