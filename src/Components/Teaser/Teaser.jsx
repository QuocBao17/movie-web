import { useState, useEffect } from "react";
import tmdbApi from "../../Api/tmbdApi";
import "./teaser.scss";
const Teaser = (props) => {
  var cate = props.cate;
  var id = props.id;
  const [video, setVideo] = useState([]);
  useEffect(() => {
    const getItem = async () => {
      const response = await tmdbApi.getVideo(cate, id);
      setVideo(response.results);
    };
    getItem();
  }, []);
  return (
    <div className="teaser">
      <div className="teaser__container">
        <div className="teaser__container__wrap">
          <h1>Teaser</h1>
          <div className="teaser__container__wrap__item">
            {video.map((item, index) => (
              <Item key={index} item={item}></Item>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
const Item = (props) => {
  var item = props.item;
  var url = "https://www.youtube.com/embed/" + item.key;
  return (
    <div className="item-video">
      <div className="item-video__box">
        <iframe src={url} width="100%" height="500px" title="trailer"></iframe>
      </div>
    </div>
  );
};
export default Teaser;
