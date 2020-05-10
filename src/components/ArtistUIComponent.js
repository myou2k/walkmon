import React from "react";

const ArtistUIComponent = ({ artist }) => {
  if (!artist) {
    return null;
  }
  const { name, images, genres } = artist;

  return (
    <div className="container text-center mb-3">
      <h3>{name}</h3>
      <p><strong>Genres:</strong> {genres.join(", ")}</p>
      <img
        className="img-thumbnail rounded-circle h-50 w-50" 
        src={images[0] && images[0].url} 
        alt={name + " poster"} />
    </div>
  );
};

export default ArtistUIComponent;
