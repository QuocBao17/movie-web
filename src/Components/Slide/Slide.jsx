import { useState, useEffect } from "react";
import tmdbApi, { movieType, tvType, category } from "../../Api/tmbdApi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Link } from "react-router-dom";
import "./slide.scss";
import "swiper/css";
import "swiper/css/navigation";
import apiConfig from "../../Api/apiConfig";
const Slide = (props) => {
  const [listItems, setListItem] = useState([]);
  const [listGenres, setListGenres] = useState([]);
  useEffect(() => {
    const getItem = async () => {
      const params = { page: 1 };
      try {
        if (props.type == "movie") {
          var response = await tmdbApi.getMoviesList(movieType.popular, {
            // lấy ra list movie
            params,
          });
          var responseGenres = await tmdbApi.getGenresList(category.movie, {
            // lấy ra list genre
            params,
          });
        }
        if (props.type == "tv") {
          var response = await tmdbApi.getTvList(tvType.popular, {
            params,
          });
          var responseGenres = await tmdbApi.getGenresList(category.tv, {
            params,
          });
        }

        setListGenres(responseGenres.genres);
        setListItem(response.results.slice(10, 21)); // cắt respone thành 10 item
      } catch {
        console.log("error");
      }
    };
    getItem();
  }, []);
  return (
    <div className="slide">
      <Swiper
        modules={[Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        // navigation
        speed={2000}
      >
        {listItems.map((item, index) =>
          item.overview && item.backdrop_path ? (
            <SwiperSlide key={index}>
              <Item
                item={item}
                listGenres={listGenres}
                type={props.type}
              ></Item>
            </SwiperSlide>
          ) : null
        )}
      </Swiper>
    </div>
  );
};
const Item = (props) => {
  var item = props.item;
  var listGenres = props.listGenres;
  const background = apiConfig.originalImage(
    item.backdrop_path ? item.backdrop_path : item.poster_path
  );
  const count = (str) => {
    var dem = str.length;
    if (dem >= 30) {
      return true;
    }
  };
  return (
    <div
      className="slide__item"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="slide__item__name">
        {count(item.title || item.name) ? (
          <h1 style={{ fontSize: "25px", lineHeight: "30px" }}>
            {item.title || item.name}
          </h1>
        ) : (
          <h1>{item.title || item.name}</h1>
        )}
      </div>
      <div className="slide__item__genre">
        {listGenres.map((genre, index) => {
          if (item.genre_ids.includes(genre.id)) {
            return <p key={index}>{genre.name},</p>;
          } else {
            return "";
          }
        })}
      </div>
      <div className="slide__item__button">
        <Link to={`/home/${props.type}/${item.id}`}>
          <button>Watch</button>
        </Link>

        <button className="button__plus">
          <i className="fas fa-plus"></i>
        </button>
      </div>
    </div>
  );
};
export default Slide;
