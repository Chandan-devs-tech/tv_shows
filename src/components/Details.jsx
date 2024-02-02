import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Details = () => {
  const { id } = useParams(); // Retrieve the 'id' parameter from the URL
  const [showDetails, setShowDetails] = useState(null);

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then((response) => response.json())
      .then((data) => setShowDetails(data));
  }, [id]);

  if (!showDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" bg-teal-500 h-screen flex justify-center flex-col items-center font-bold text-2xl text-white">
      <img
        className="w-80 h-96 rounded-lg"
        src={showDetails.image?.medium}
        alt={showDetails.name}
      />
      <p>Name: {showDetails.name}</p>
      <p>Genres: {showDetails.genres[0]}</p>
      <p>Language: {showDetails.language}</p>
    </div>
  );
};

export default Details;
