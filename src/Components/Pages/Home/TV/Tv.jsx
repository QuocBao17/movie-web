import List from "../../../List/List";
import ListVertical from "../../../List/ListVertical";
import Slide from "../../../Slide/Slide";
import "./../Movies/movies.scss";
import { useState } from "react";
import tmdbApi, { category } from "../../../../Api/tmbdApi";
import { Link, Location, useLocation } from "react-router-dom";
import logo from "./../../../../Image/logo.png";
import ListVerticalTV from "../../../List/ListVerticalTv";
import HeaderResponsive from "../../../Header/HeaderResponsive";
import PopupSearch from "../../../PopupSearch/PopupSearch";
const Tv = (props) => {
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
    openForm(status);
  };
  const openForm = (status) => {
    status = true;
    setStatus(status);
  };
  const closeForm = (status) => {
    status = false;
    setStatus(status);
  };
  document.onclick = (e) => {
    var menuElement = document.getElementById("search");
    var open = document.getElementById("icon-search");
    if (menuElement.contains(e.target) == false && e.target != open) {
      closeForm(status);
    }
  };
  return (
    <div className="movies">
      <div className="movies__container">
        <div className="movies__container__left">
          <HeaderResponsive props={props}></HeaderResponsive>
          <div className="movies__container__left__slider">
            <Slide type={"tv"}></Slide>
          </div>
          <div className="movies__container__left__list">
            <List
              category={"tv"}
              type={"popular"}
              title={"Popular Tv Series"}
            ></List>
            <List
              category={"tv"}
              type={"top_rated"}
              title={"Top Tv Series"}
            ></List>
            <List
              category={"tv"}
              type={"on_the_air"}
              title={"World Best TV Series"}
            ></List>
            <List
              category={"tv"}
              type={"today"}
              title={"Today Tv Series"}
            ></List>
            <div className="button-all">
              <Link to="/home/tv/all">
                {" "}
                <button>See All</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="movies__container__right">
          <div
            id="search"
            className={`movies__container__right__search ${
              status ? "active-search" : "noactive-search"
            }`}
          >
            <input
              type="text"
              placeholder="Search"
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
            />
            <i
              className="fas fa-search"
              id="icon-search"
              onClick={goToSearch}
            ></i>
            <PopupSearch item={items}></PopupSearch>
          </div>
          <div className="movies__container__right__list">
            <ListVerticalTV
              category={"tv"}
              type={"popular"}
              title={"Hot Tv Series"}
            ></ListVerticalTV>
            <ListVerticalTV
              category={"tv"}
              type={"top_rated"}
              title={"Suggest Tv Series"}
            ></ListVerticalTV>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Tv;
