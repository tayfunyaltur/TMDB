import "./index.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchDetailedMovie } from "../../stores/movies.slice";
import { RootState } from "../../store";
import Button from "../../components/Button";
import { BiLeftArrow } from "react-icons/bi";

const Movie = () => {
  let params = useParams();
  const dispatch = useDispatch();
  const movie = useSelector((state: RootState) => state.movies.detailedMovie);
  const isLoading = useSelector((state: RootState) => state.movies.isLoading);
  const navigate = useNavigate();
  useEffect(() => {
    if (!!params.id) {
      dispatch(fetchDetailedMovie({ id: params.id }) as any);
    }
  }, [params]);
  return isLoading ? (
    <div className="detail_loading">Loading</div>
  ) : (
    <div className="movie_details">
      <Button
        type="ghost"
        className="back_button"
        onClick={() => navigate("/")}
      >
        <div>
          <BiLeftArrow />
          <div>Back</div>
        </div>
      </Button>
      <img src={movie?.Poster} />
      <div className="details">
        <div className="title">{movie?.Title}</div>
        <div className="sub_title">
          <div>{movie?.Genre}</div>
        </div>
        <div className="sub_title">
          <div>{movie?.Runtime}</div>
          <div>{movie?.Country}</div>
          <div>{movie?.Director}</div>
          <div>{movie?.Language}</div>
          <div>{movie?.imdbRating}</div>
        </div>
        <div className="sub_title">
          <div>{movie?.Actors}</div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
