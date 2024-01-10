import React, { useState } from 'react';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState(''); 
  const apiKey = 'e0a07a3d';
  const handleInputChange = (e) => {
    setSearch(e.target.value)
  }
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
      console.error('Error al llamar a la API:', error);
    }
  };
  const printData =(movie) => { 
    return(<> 
    <h2>{movie.Title}</h2>

                <img src={movie.Poster} alt={movie.Title} />
                
                <p>
                  Synopsis: {movie.Plot}
                  <ul>
                    <li> Cast: {movie.Actors}</li>
                    <li>Directed by: {movie.Director}</li>
                    <li>Year: {movie.Year}</li>
                    <li>Country:{movie.Country}</li>
                    
                    <li>Rated: {movie.Rated}</li>
                  </ul>
                  </p>
                  </>)
              
  }

  return (
    <>
      <h1 className='principalTitle'>THE MOVIES DATABASE</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="movie"
          value={search}
          placeholder="Search a movie"
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="submit" 
          value="Let's go!"
          className="boton"
        />
      </form>

      <div className="listMovies">
        {
          movies.map((movie) => (
            
            <div key={movie.imdbID}>
              {movie.Response == 'False' && <p>No se encontraron películas.</p>}
              {movie.Response == 'True' && printData}
               

              <div className='posterOverview'>
                
              </div>
              

            
            </div>
          )
          )
        }
      </div>
    
    </>
    
  );
}

export default App;
