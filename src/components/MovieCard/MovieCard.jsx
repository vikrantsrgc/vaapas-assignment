import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MovieCard({ movie }) {
  const [dogImage, setDogImage] = useState('');

  useEffect(() => {
    const fetchDogImage = async () => {
      const response = await axios.get('https://dog.ceo/api/breeds/image/random');
      setDogImage(response.data.message);
    };

    fetchDogImage();
  }, []);

  return (
    <li>
      <h2>{movie.title}</h2>
      <p>Author: {movie.author_name.join(', ')}</p>
      <img src={dogImage} alt="Random dog image" />
    </li>
  );
}

export default MovieCard;