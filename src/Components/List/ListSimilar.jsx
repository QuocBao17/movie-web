import { useState } from "react";
import { useEffect } from "react";
import tmdbApi from "../../Api/tmbdApi";
import apiConfig from "../../Api/apiConfig";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "./listSimilar.scss";
const ListSimilar = (props) => {
  var id = props.id;
  var cate = props.cate;
  const [list, setList] = useState([]);
  useEffect(() => {
    const getItem = async () => {
      const params = { page: 1 };
      var response = await tmdbApi.getSimilar(cate, id);
      setList(response.results);
    };
    getItem();
  }, []);
  return (
    <div className="a">
      <h1>{`Similar ${cate}`}</h1>
      <div className="list">
        <div className="list__container">
          <Swiper
            breakpoints={{
              400: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              992: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
            }}
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={4}
            speed={2000}
          >
            {list.map((item, index) =>
              item.overview && item.backdrop_path ? (
                <SwiperSlide key={index}>
                  <Item item={item} cate={cate}></Item>
                </SwiperSlide>
              ) : null
            )}
          </Swiper>
        </div>
      </div>
    </div>
  );
};
const Item = (props) => {
  var item = props.item;
  var cate = props.cate;
  var id = props.id;
  const background = apiConfig.originalImage(
    item.backdrop_path ? item.backdrop_path : item.poster_path
  );
  return (
    <div className="item" style={{ backgroundImage: `url(${background})` }}>
      <Link to={`/home/${cate}/${item.id}`}>
        <div className="item__name">
          <p>{item.title || item.name}</p>
        </div>
        <div className="item__button__plus">
          <button>
            <i className="fas fa-plus"></i>
          </button>
        </div>
      </Link>
    </div>
  );
};
export default ListSimilar;
