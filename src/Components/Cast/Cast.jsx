import "./cast.scss";
import { useState } from "react";
import { useEffect } from "react";
import tmdbApi from "../../Api/tmbdApi";
import apiConfig from "../../Api/apiConfig";
const Cast = (props) => {
  const [cast, setCast] = useState([]);
  var cate = props.cate;
  var id = props.id;
  useEffect(() => {
    const getItem = async () => {
      const response = await tmdbApi.getCastList(props.cate, props.id);
      setCast(response.cast.slice(0, 5));
    };
    getItem();
  }, [cate, id]);
  return (
    <div className="cast">
      <h1>Cast</h1>
      <div className="cast__list">
        {cast.map((item, index) => {
          if (item.profile_path != null) {
            return (
              <div className="cast__list__item" key={index}>
                <Item item={item}></Item>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};
const Item = (props) => {
  var item = props.item;
  var img = apiConfig.originalImage(item.profile_path);
  return (
    <div className="item">
      <div className="item__img">
        <img src={img} alt="" />
      </div>
      <div className="item__name">
        <p>{item.name}</p>
      </div>
    </div>
  );
};
export default Cast;
