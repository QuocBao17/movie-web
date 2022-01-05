import "./popupSearch.scss";
import { Link } from "react-router-dom";
import apiConfig from "../../Api/apiConfig";
const PopupSearch = (props) => {
  var item = props.item;
  return (
    <div className="popup">
      <div className="popup__container">
        {item.map((i, index) => (
          <Item item={i} key={index} cate={props.cate}></Item>
        ))}
      </div>
    </div>
  );
};
const Item = (props) => {
  var cate = props.cate;
  var item = props.item;
  var bg = apiConfig.originalImage(item.poster_path || item.backdrop_path);
  return (
    <div className="popup__container__item">
      <Link to={`/home/${cate}/${item.id}`}>
        <div className="popup__item">
          <div className="popup__item__img">
            <img src={bg} alt="" />
          </div>
          <div className="popup__item__info">
            <div className="popup__item__info__name">
              <p>{item.title || item.name}</p>
            </div>
            <div className="popup__item__info__rate">
              <p>{item.vote_average}</p>
            </div>
            <div className="popup__item__info__star">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star-half-alt"></i>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default PopupSearch;
