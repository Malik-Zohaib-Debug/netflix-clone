import React, {useState, useEffect} from "react";
import './css/Row.css';

const imageBaseUrl = "https://image.tmdb.org/t/p/original/";

function Row({title, fetchUrl, isLargeRow}){
    const [movies, setMovies] = useState([]);

    const baseUrl = "https://api.themoviedb.org/3"
    const dataFetchingUrl =  baseUrl + fetchUrl;

    useEffect(() => {
        async function fetchData(){
            const response = await fetch(dataFetchingUrl)
                            .then((data) => data.json())
                            .then(json => setMovies(json.results))
        }

        fetchData()
    }, [])

    // console.log(movies);

    return(
        <div className="row">
            <h2>{title}</h2>

            <div className="row__posters">
                {movies.map((movie) => (
                    <img
                        key={movie.id} 
                        className={`row__poster ${isLargeRow && "row__posterLarge"}`} 
                        src={`${imageBaseUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                        alt={movie.name} />
                ))}
            </div>
        </div>
    );
}

export default Row;