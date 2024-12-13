import React, { useEffect, useState } from "react";
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
  const [searchKey, setSearchKey] = useState("Pokemon");
  const [page, setPage] = useState(1);
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
    dispatch(
      fetchMovies({
        searchKey,
        page,
      }) as any
    );
  }, [searchKey, page]);
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
      onEntityClick={(value: Movie) => {
        navigate(`movie/${value.imdbID}`);
      }}
    />
  );
};

export default Movies;
