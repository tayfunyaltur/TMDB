import { useEffect, useState } from "react";
import TableGrid from "../../components/TableGrid";
import { Movie } from "../../types/Movie.type";
import Card from "../../components/Card";
import { fetchMovies } from "../../stores/movies.slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { Column } from "../../components/TableGrid/type";
import { useNavigate } from "react-router-dom";

const Movies = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state: RootState) => state.movies.results);
  const pageCount = useSelector((state: RootState) => state.movies.pageCount);
  const isLoading = useSelector((state: RootState) => state.movies.isLoading);
  const [searchKey, setSearchKey] = useState("Pokemon");
  const [debounceSearch, setDebounceSearch] = useState("Pokemon");
  const [page, setPage] = useState(1);
  const [timer, setTimer] = useState<number | null>(null);
  const columns: Column<Movie>[] = [
    {
      accessor: "imdbID",
      render: (val: Movie) => (
        <a href={`https://www.imdb.com/title/${val.imdbID}/`} target="_blank">
          {val.imdbID}
        </a>
      ),
    },
    {
      accessor: "Poster",
      render: (val: Movie) => <img src={val.Poster} />,
    },
    {
      accessor: "Title",
    },
    {
      accessor: "Type",
    },
    {
      accessor: "Year",
    },
  ];
  const navigate = useNavigate();

  const cardRenderer = (movie: Movie) => (
    <Card
      imdbID={movie.imdbID}
      poster={movie.Poster}
      title={movie.Title}
      type={movie.Type}
      year={movie.Year}
      key={movie.imdbID}
      onClick={() => navigate(`movie/${movie.imdbID}`)}
    />
  );

  useEffect(() => {
    if (timer !== null) {
      clearInterval(timer);
    }
    setTimer(
      setTimeout(() => {
        setDebounceSearch(searchKey);
      }, 500)
    );
  }, [searchKey]);

  useEffect(() => {
    setPage(1);
  }, [debounceSearch]);

  useEffect(() => {
    dispatch(
      fetchMovies({
        searchKey: debounceSearch,
        page,
      }) as any
    );
  }, [debounceSearch, page]);

  return (
    <TableGrid<Movie>
      isSeachable
      isPaginated
      page={page}
      pageCount={pageCount}
      onPageChange={setPage}
      searchKey={searchKey}
      onSearch={setSearchKey}
      columns={columns}
      data={movies}
      cardRenderer={cardRenderer}
      isLoading={isLoading}
      onEntityClick={(value: Movie) => {
        navigate(`movie/${value.imdbID}`);
      }}
    />
  );
};

export default Movies;
