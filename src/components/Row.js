import React, {useState, useEffect} from "react";
import YouTube from 'react-youtube';
// import movieTrailer  from "movie-trailer";
import './css/Row.css';

const imageBaseUrl = "https://image.tmdb.org/t/p/original/";

function Row({title, fetchUrl, isLargeRow}){
    const [movies, setMovies] = useState([]);
    const [trailer, setTrailer] = useState("");
    const [apiError, setApiError] = useState("");

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

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };

    const getYoutubeVideoId = async (movie) => {
        try {
            const apiKey = "YOUR_YOUTUBE_DATA_API_KEY";
            const movieTitle = encodeURIComponent(movie.name || " ");
            const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${movieTitle}+trailer&key=${apiKey}`;
            const response = await fetch(searchUrl);
            const data = await response.json();
            const videoId = data.items.length > 0 ? data.items[0].id.videoId : "";
            return videoId;
        } catch (error) {
            console.log(error);
            return "";
        }
    };

    const handleClick = async (movie) => {
        if (trailer) {
            setTrailer("");
        } else {
            const videoId = await getYoutubeVideoId(movie);
            if (videoId) {
                setTrailer(videoId);
            } else {
                setApiError("Trailer not found");
            }
        }
    };

    console.log(trailer);

    return(
        <div className="row">
            <h2>{title}</h2>

            <div className="row__posters">
                {movies.map((movie) => (
                    <img
                        key={movie.id} 
                        onClick={() => handleClick(movie)}
                        className={`row__poster ${isLargeRow && "row__posterLarge"}`} 
                        src={`${imageBaseUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                        alt={movie.name} />
                ))}
            </div>
            {trailer && <YouTube videoId={trailer} opts={opts} />}
        </div>
    );
}

export default Row;