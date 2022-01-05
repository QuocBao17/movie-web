import List from "../../../List/List";
import ListVertical from "../../../List/ListVertical";
import Slide from "../../../Slide/Slide";
import "./movies.scss";
import { Link, Location, useLocation } from "react-router-dom";
import HeaderResponsive from "../../../Header/HeaderResponsive";
import PopupSearch from "../../../PopupSearch/PopupSearch";
import { useState, useEffect, useRef } from "react";
import tmdbApi, { category } from "../../../../Api/tmbdApi";
const Movies = (props) => {
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
    <div className="movies">
      <div className="movies__container">
        <div className="movies__container__left">
          <HeaderResponsive props={props}></HeaderResponsive>
          <div className="movies__container__left__slider">
            <Slide type={"movie"} props={props}></Slide>
          </div>
          <div className="movies__container__left__list">
            <List
              category={"movie"}
              type={"popular"}
              title={"Popular Movies"}
            ></List>
            <List
              category={"movie"}
              type={"upcoming"}
              title={"Upcoming Movies"}
            ></List>
            <List
              category={"movie"}
              type={"top_rated"}
              title={"Top Movies"}
            ></List>
            <List
              category={"movie"}
              type={"now_playing"}
              title={"Premiering Movies"}
            ></List>
            <div className="button-all">
              <Link to="/home/movie/all">
                {" "}
                <button>See All</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="movies__container__right">
          <div
            className={`movies__container__right__search ${
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
          <div className="movies__container__right__list">
            <ListVertical
              category={"movie"}
              type={"popular"}
              title={"Hot Movies"}
            ></ListVertical>
            <ListVertical
              category={"movie"}
              type={"upcoming"}
              title={"Suggest Movies"}
            ></ListVertical>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Movies;
