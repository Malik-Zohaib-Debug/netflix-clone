import React, {useState, useEffect} from 'react';
import requests from '../request';
import "./css/Banner.css";

const baseUrl = "https://api.themoviedb.org/3"

function Banner(){
    const [movies, setMovies] = useState(null);

    useEffect(() => {
        async function fetchData(){
            const response = await fetch(`${baseUrl+requests.fetchNetflixOriginals}`)
                            .then(data => data.json())
                            .then(json => {
                                const randomIndex = Math.floor(Math.random() * json.results.length);
                                setMovies(json.results[randomIndex]);
                            });
            return response;
        }
        fetchData();
    }, [])

    function truncate(str, n){
        return str.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    return(
        <header className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url(
                    "https://image.tmdb.org/t/p/original/${movies ? movies.backdrop_path : ""}"
                )`,
                backgroundPosition: 'center',
            }}
        >
            <div className='banner__contents'>
                <h1 className='banner__title'>
                {movies ? movies.name || movies.title || "Loading..." : "Loading..."}
                </h1>
            
                <div className='banner__buttons'>
                    <button className='banner__buttons'>Play</button>
                    <button className='banner__buttons'>My List</button>
                </div>

                <h1 className='banner__description'>
                {movies? truncate(movies.overview, 150) : "...loading"}
                </h1>
            </div>
        </header>
    );
}

export default Banner;