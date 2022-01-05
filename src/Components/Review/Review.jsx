import "./review.scss";
import { useState, useEffect } from "react";
import tmdbApi from "../../Api/tmbdApi";

const Review = (props) => {
  var id = props.id;
  var cate = props.cate;
  const [review, setReview] = useState([]);
  useEffect(() => {
    const getItem = async () => {
      const response = await tmdbApi.getReview(cate, id);
      setReview(response.results);
    };
    getItem();
  }, []);
  return (
    <div className="review">
      <div className="review__container">
        <div className="review__container__wrap">
          {review.map((item, index) => (
            <Item key={index} item={item}></Item>
          ))}
        </div>
      </div>
    </div>
  );
};
const Item = (props) => {
  var item = props.item;
  console.log(item);
  return (
    <div className="item-review">
      <div className="item-review__container">
        <div className="item-review__container__avatar">
          <img src={item.author_details.avatar_path} alt="" />
        </div>
        <div className="item-review__container__content">
          <div className="name">
            <p>{item.author}</p>
          </div>
          <div className="content">
            <p>{item.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Review;
