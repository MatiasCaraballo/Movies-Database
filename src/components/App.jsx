import React, { useState } from 'react';
import '../styles/App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [myList, setMyList] = useState([]);

  const apiKey = 'e0a07a3d';

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchMovies();
  };

  const fetchMovies = async () => {
    try {
      const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&t=${search}`);
      const data = await response.json();
      setMovies([data]);
    } catch (error) {
      console.error('Error to Api call:', error);
    }
  };

  const printData = (movie) => {
    return (
      <> 
      <div className='posterOverview'>
        <img src={movie.Poster} alt={movie.Title} />
        
          <p> Synopsis: {movie.Plot}</p>
      </div>
          <ul>
            <li>Cast: {movie.Actors}</li>
            <li>Directed by: {movie.Director}</li>
            <li>Year: {movie.Year}</li>
            <li>Country: {movie.Country}</li>
            <li>Rated: {movie.Rated}</li>
          </ul>
        
        <button type="button" onClick={() => addMovie(movie)}>
          Add to my list
        </button>
      </>
    );
  };

  const addMovie = (movie) => {myList.includes(movie)
    ? setMyList((prevList) => prevList.filter((m) => m !== movie))
    : setMyList((prevList) => [...prevList, movie])
  };

  const printMyList = () => {
    return (
      <>
        <ul>
          {myList.map((movie) => (
            <li key={movie.Title}>
              <img src={movie.Poster} alt={movie.Title} width="200px" height="300px" />
            </li>
          ))}
        </ul>
      </>
    );
  };

  return (
    <>
      <h1 className='principalTitle'>THE MOVIES DATABASE</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="movie"
          value={search}
          placeholder="Search a movie"
          onChange={handleInputChange}
        />
        <input type="submit" value="Let's go!" className="boton" />
      </form>

      <div>
        {movies.map((movie) => (
          <div key={movie.imdbID}>
            {movie.Response === 'False' && <p>Movie not found.</p>}
            {movie.Response === 'True' && printData(movie)}
          </div>
        ))}
      </div>
      <div className="myList">
        {myList.length === 0 && <p>Add movies to your list</p>}
        {myList.length > 0 && printMyList()}
      </div>
    </>
  );
}

export default App;
