
import { useState } from 'react';
import './App.css';

function App() {
  const [movie, setMovie] = useState('');
  const [result, setResult] = useState('');
  const apiKey = 'e0a07a3d';

  const searchMovie = () => {
    fetch(`http://www.omdbapi.com/?apikey=${apiKey}&t=${movie}`)
      .then(response => response.json())
      .then(data => {
        setResult(data);
      })
      .catch(error => {
        console.error('Error al llamar a la API:', error);
      });
  };

  return (
    <>
      <h1>The Movies Database</h1>
      <form>
        <input
          type="text"
          className="movie"
          value={movie}
          placeholder="Search a movie"
          onChange={(e) => setMovie(e.target.value)}
        />
        <input
          type="button"
          value="Let's go!"
          className="boton"
          onClick={searchMovie}  
        />
      </form>

      {/* Aquí puedes mostrar los resultados */}
      {result && (
        <div>
          <h2>Movie:</h2>
          <p>{result.Title}, ({result.Year})</p>
          <img src={result.Poster} alt="poster" />
          <h2>Actors:</h2>
          <p>{result.Actors}</p>
        </div>
      )}
    </>
  );
}

export default App;
