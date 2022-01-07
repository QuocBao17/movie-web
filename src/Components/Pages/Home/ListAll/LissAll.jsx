import HeaderResponsive from "../../../Header/HeaderResponsive";
import ListVertical from "../../../List/ListVertical";
import ListVerticalTV from "../../../List/ListVerticalTv";
import { useState, useEffect } from "react";
import tmdbApi from "../../../../Api/tmbdApi";
import { useParams } from "react-router-dom";
import apiConfig from "../../../../Api/apiConfig";
import "./listAll.scss";
import { Link } from "react-router-dom";
const LissAll = (props) => {
  const [video, setVideo] = useState([]);
  const { cate } = useParams();
  const [page, setPage] = useState([1]);
  useEffect(() => {
    const getItem = async () => {
      if (cate === "movie") {
        const params = { page: 1 };
        const response = await tmdbApi.getMoviesList("popular", {
          params,
        });
        setPage(params.page);
        setVideo(response.results);
      } else {
        const params = { page: 1 };
        const response = await tmdbApi.getTvList("popular", { params });
        setVideo(response.results);
        setPage(params.page);
      }
    };
    window.scrollTo(0, 0);
    getItem();
  }, []);
  const next = async () => {
    console.log("next");
    var response = null;
    var current = page + 1;
    const params = { page: current };
    if (cate === "movie") {
      const response = await tmdbApi.getMoviesList("popular", {
        params,
      });
      setPage(current);
      setVideo(response.results);
    } else {
      const response = await tmdbApi.getTvList("popular", { params });
      setPage(current);
      setVideo(response.results);
    }
    console.log(video);
  };
  const prev = async () => {
    var response = null;
    if (page > 1) {
      var current = page - 1;
    }

    const params = { page: current };
    if (cate === "movie") {
      const response = await tmdbApi.getMoviesList("popular", {
        params,
      });
      setPage(current);
      setVideo(response.results);
    } else {
      const response = await tmdbApi.getTvList("popular", { params });
      setPage(current);
      setVideo(response.results);
    }
  };
  return (
    <div className="list-all">
      <div className="list-all__container">
        <div className="list-all__container__left">
          <HeaderResponsive props={props}></HeaderResponsive>
          <div className="list-all__container__left__list">
            <div className="list-all__container__left__list__video">
              {video.map((item, index) => (
                <Item item={item} key={index}></Item>
              ))}
            </div>
            <div className="list-all__container__left__list__button">
              <div className="button-group">
                <div className="prev">
                  <button onClick={prev}>
                    <i className="fas fa-step-backward"></i>
                  </button>
                </div>
                <div className="current">
                  <button>{page}</button>
                </div>
                <div className="next">
                  <button onClick={next}>
                    <i className="fas fa-step-forward"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="movies__container__right">
          <div className="movies__container__right__search">
            <i className="fas fa-search"></i>
            <input type="text" placeholder="Search" />
          </div>
          <div className="movies__container__right__list">
            {cate === "movie" ? (
              <div>
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
            ) : (
              <div>
                {" "}
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
const Item = (props) => {
  var { cate } = useParams();
  var item = props.item;
  var bg = apiConfig.originalImage(item.backdrop_path || item.poster_path);
  return (
    <Link to={`/home/${cate}/${item.id}`}>
      <div className="video-item" style={{ backgroundImage: `url(${bg})` }}>
        <div className="video-item__container">
          <div className="video-item__container__content">
            <div className="name">
              <p>{item.title || item.name}</p>
            </div>
            <div className="button">
              <i className="far fa-play-circle"></i>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default LissAll;
