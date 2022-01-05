import { useState } from "react";
import { useEffect } from "react";
import tmdbApi, { category } from "../../Api/tmbdApi";
import apiConfig from "../../Api/apiConfig";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "./listVertical.scss";
const ListVertical = (props) => {
  const [list, setList] = useState([]);
  const [listGenres, setListGenres] = useState([]);
  useEffect(() => {
    const getItem = async () => {
      const params = { page: 1 };
      var response = await tmdbApi.getMoviesList(props.type, {
        params,
      });
      var responseGenres = await tmdbApi.getGenresList(category.movie, {
        // lấy ra list genre
        params,
      });
      setList(response.results.slice(13, 16));
      setListGenres(responseGenres.genres);
    };
    getItem();
  }, []);
  return (
    <div className="list-vertical">
      <div className="list-vertical__container">
        <h2>{props.title}</h2>
        {list.map((item, index) => (
          <Item
            item={item}
            listGenres={listGenres}
            type={props.type}
            key={index}
            cate={props.category}
          ></Item>
        ))}
        <div className="list-vertical__button">
          <Link to="/home/movie/all">
            <button>Load more</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
const Item = (props) => {
  var item = props.item;
  var cate = props.cate;
  var id = item.id;
  var listGenres = props.listGenres;
  const background = apiConfig.originalImage(
    item.backdrop_path ? item.poster_path : item.backdrop_path
  );
  const count = (str) => {
    var dem = str.length;
    if (dem >= 10) {
      return true;
    }
  };
  return (
    <Link to={`/home/${cate}/${id}`}>
      <div className="item__vertical">
        <div className="item__vertical__img">
          <img src={background} alt="" />
        </div>
        <div className="item__vertical__info">
          <div className="item__vertical__info__name">
            {count(item.title) ? (
              <p>{item.title.slice(0, 25) + "..."}</p>
            ) : (
              <p>{item.title}</p>
            )}
          </div>
          <div className="item__vertical__info__genres">
            {listGenres.map((genre, index) => {
              if (item.genre_ids.includes(genre.id)) {
                return <p key={index}>{genre.name},</p>;
              } else {
                return "";
              }
            })}
          </div>
          <div className="item__vertical__info__rate">
            <div className="logo">
              <img
                src="https://1000logos.net/wp-content/uploads/2020/08/Imdb-logo.png"
                alt=""
              />
            </div>
            <div className="point">
              <p>{item.vote_average}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default ListVertical;
