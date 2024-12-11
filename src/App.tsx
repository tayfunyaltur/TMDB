import Card from "./components/Card";
import "./styles/index.scss";

const _item = {
  Title: "Batman Beyond",
  Year: "1999–2001",
  imdbID: "tt0147746",
  Type: "series",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BMDExYjNiYTYtZDkwZC00NDcxLTk3YWYtMmIyN2ZlZGYyY2E0XkEyXkFqcGc@._V1_SX300.jpg",
};

function App() {
  return (
    <main className="mainBg">
      <Card
        poster={_item.Poster}
        imdbID={_item.imdbID}
        title={_item.Title}
        type={_item.Type}
        year={_item.Year}
      ></Card>
    </main>
  );
}

export default App;
