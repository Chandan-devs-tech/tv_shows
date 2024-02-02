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
    return (
      <div className="flex justify-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-loader text-teal-500"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="4"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 6l0 -3" />
          <path d="M16.25 7.75l2.15 -2.15" />
          <path d="M18 12l3 0" />
          <path d="M16.25 16.25l2.15 2.15" />
          <path d="M12 18l0 3" />
          <path d="M7.75 16.25l-2.15 2.15" />
          <path d="M6 12l-3 0" />
          <path d="M7.75 7.75l-2.15 -2.15" />
        </svg>
      </div>
    );
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
