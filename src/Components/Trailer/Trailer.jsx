import "./trailer.scss";
import { useState, useEffect } from "react";
import tmdbApi from "../../Api/tmbdApi";
const Trailer = (props) => {
  var cate = props.cate;
  var id = props.id;
  var status = props.status;
  const [video, setVideo] = useState([]);
  useEffect(() => {
    const getItem = async () => {
      const response = await tmdbApi.getVideo(cate, id);
      setVideo(response.results);
    };
    getItem();
  }, []);

  if (video.length > 0) {
    var trailer = "https://www.youtube.com/embed/" + video[0].key;
    var text = "";
  } else {
    var trailer = "";
    var text = "No Trailer";
  }
  const handleTrailer = () => {
    props.recevieStatus(status);
  };
  return (
    <div className={`video ${status ? "active-trailer" : "nonactive-trailer"}`}>
      <div className="video__container">
        <div className="video__container__box ">
          <div className="text">
            <img
              src="data:image/jpeg;base64,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"
              alt=""
            />
          </div>
          <iframe
            src={status ? trailer : ""}
            width="100%"
            height="500px"
            title="trailer"
          ></iframe>
          <div className="button__closebox">
            <p onClick={handleTrailer}>x</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Trailer;
