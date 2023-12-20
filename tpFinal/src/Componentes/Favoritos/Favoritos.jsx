import React from 'react';
import "./Favoritos.css"

function Favoritos({ favoritesList }) {
    return (
        <>
            <div className='Card'>
                <h3 className='h3Fav'>Tus películas favoritas</h3>
                <ul className='ulMovies'>
                    {favoritesList.map(movie => (
                        <li className='liMovies' key={movie.id}>
                            <img
                                className='imgMovies'
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                            />
                            <p className='pMovies'>{movie.title}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default Favoritos;
