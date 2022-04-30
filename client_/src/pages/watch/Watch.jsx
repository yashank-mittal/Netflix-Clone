import { ArrowBackOutlined } from "@material-ui/icons";
import { useLocation, Link } from "react-router-dom";
import "./watch.scss";

export default function Watch() {
  const location = useLocation();
  console.log(location)
  const movie = location.movie;
  // console.log(movie)
  return (
    <div className="watch">
      <Link to='/'>
          <div className="back">
            <ArrowBackOutlined />
            Home
          </div>
      </Link>
      <video className="video" autoPlay progress controls src={movie.video} />
    </div>
  );
}


