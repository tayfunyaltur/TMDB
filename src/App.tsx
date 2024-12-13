import Movie from "./pages/Movie";
import Movies from "./pages/Movies";
import "./styles/index.scss";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <main className="mainBg">
      <Routes>
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/" element={<Movies />} />
      </Routes>
    </main>
  );
}

export default App;
