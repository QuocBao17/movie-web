import { useEffect } from "react";
import HeaderResponsive from "./../../Header/HeaderResponsive";
import { useState } from "react";
import "./detail.scss";
import tmdbApi, { category } from "../../../Api/tmbdApi";
import { useParams } from "react-router-dom";
import apiConfig from "./../../../Api/apiConfig";
import Cast from "../../Cast/Cast";
import Trailer from "../../Trailer/Trailer";
import Teaser from "../../Teaser/Teaser";
import Review from "../../Review/Review";
import ListSimilar from "../../List/ListSimilar";
const Detail = (props) => {
  const { cate, id } = useParams(); // lấy param theo bên routes /home/:cate/:id
  const [detail, Setdetail] = useState([]);
  const [status, setStatus] = useState(false);
  useEffect(() => {
    const getItem = async () => {
      var params = { page: 1 };
      var response = await tmdbApi.getDetail(cate, id, { params: {} });
      Setdetail(response);
      window.scrollTo(0, 0);
    };
    getItem();
  }, [cate, id]);
  const count = (str) => {
    if (str != undefined) {
      var dem = str.length;
      if (dem >= 280) {
        return true;
      }
    }
  };
  var poster = apiConfig.originalImage(
    detail.poster_path || detail.backdrop_path
  );
  var bg = apiConfig.originalImage(detail.backdrop_path || detail.poster_path);
  const getStatus = (status) => {
    var temp = !status;
    setStatus(temp);
  };
  return (
    <div className="container__detail">
      <HeaderResponsive props={props}></HeaderResponsive>
      <div className="container__detail__content">
        <div
          className="container__detail__content__wrap"
          style={{ backgroundImage: `url(${bg})` }}
        >
          <Trailer
            cate={cate}
            id={id}
            status={status}
            recevieStatus={getStatus}
          ></Trailer>
          <div className="container__detail__content__wrap__info">
            <div className="name">
              <p> {detail.title || detail.name}</p>
            </div>
            <div className="rate">
              <p>{detail.vote_average} (IMDb)</p>
              <div className="icon-rate">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="far fa-star"></i>
              </div>
            </div>
            <div className="overview">
              {count(detail.overview) ? (
                <p>{detail.overview.slice(0, 280) + "..."}</p>
              ) : (
                <p>{detail.overview}</p>
              )}
            </div>
            <div className="trailer">
              <button onClick={() => getStatus(status)}>Watch Trailer</button>
            </div>
          </div>
          <div className="container__detail__content__wrap__poster">
            <img src={poster} alt="" />
          </div>
        </div>
        <Cast cate={cate} id={id}></Cast>
        {/* <Teaser cate={cate} id={id}></Teaser> */}
        {/* <Review cate={cate} id={id}></Review> */}
        <ListSimilar cate={cate} id={id}></ListSimilar>
      </div>
    </div>
  );
};
export default Detail;
