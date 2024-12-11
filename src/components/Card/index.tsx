import Button from "../Button";
import "./index.scss";
import { BiLogoImdb } from "react-icons/bi";

interface CardProps {
  title: string;
  year: string;
  imdbID: string;
  type: string;
  poster: string;
}

const Card = ({ title, year, imdbID, type, poster }: CardProps) => {
  const onClickIMDB = () => {
    window.open(`https://www.imdb.com/title/${imdbID}/`, "_blank");
  };

  return (
    <div className="card">
      <Button type="ghost" onClick={onClickIMDB}>
        <div className="imdb-btn-content">
          <BiLogoImdb data-testid="imdb-logo" />
          <span>{imdbID}</span>
        </div>
      </Button>
      <img src={poster} />
      <div className="details">
        <h3>{title}</h3>
        <div className="sub_details">
          <span>{year}</span>
          <span>{type}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
