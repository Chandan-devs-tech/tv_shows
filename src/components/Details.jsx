import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Details = () => {
  const { id } = useParams();
  const [showDetails, setShowDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
        const data = await response.json();
        setShowDetails(data);
        localStorage.setItem(`showDetails_${id}`, JSON.stringify(showDetails));
      } catch (error) {
        console.error("Error fetching show details", error);
      }
    };

    const showDetailsFromLocalStorage = JSON.parse(
      localStorage.getItem(`showDetails_${id}`)
    );
    if (showDetailsFromLocalStorage) {
      setShowDetails(showDetailsFromLocalStorage);
    } else {
      fetchData();
    }
  }, [showDetails, id]);

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

  function renderStars(rating) {
    const fullStars = Math.floor(rating);
    const starArray = [];

    for (let i = 0; i < fullStars; i++) {
      starArray.push(<span key={i}>⭐</span>);
    }

    return starArray;
  }

  return (
    <div className=" bg-black p-4 flex justify-center flex-col items-center font-bold text-2xl text-white">
      <div className="w-full sm:p-0 lg:px-10">
        <button type="button" onClick={() => navigate("/")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-arrow-big-left-lines-filled"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path
              d="M9.586 4l-6.586 6.586a2 2 0 0 0 0 2.828l6.586 6.586a2 2 0 0 0 2.18 .434l.145 -.068a2 2 0 0 0 1.089 -1.78v-2.586h2a1 1 0 0 0 1 -1v-6l-.007 -.117a1 1 0 0 0 -.993 -.883l-2 -.001v-2.585a2 2 0 0 0 -3.414 -1.414z"
              strokeWidth="0"
              fill="currentColor"
            />
            <path
              d="M21 8a1 1 0 0 1 .993 .883l.007 .117v6a1 1 0 0 1 -1.993 .117l-.007 -.117v-6a1 1 0 0 1 1 -1z"
              strokeWidth="0"
              fill="currentColor"
            />
            <path
              d="M18 8a1 1 0 0 1 .993 .883l.007 .117v6a1 1 0 0 1 -1.993 .117l-.007 -.117v-6a1 1 0 0 1 1 -1z"
              strokeWidth="0"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
      <div>
        <img
          className="w-80 h-96 rounded-lg"
          src={showDetails.image?.medium}
          alt={showDetails.name}
        />
      </div>
      <div className="lg:px-24 px-4 py-4 w-full">
        <p className="text-3xl lg:text-5xl">
          {showDetails.name}&apos;s details:
        </p>
      </div>
      <div className="flex justify-start w-full flex-col lg:px-32 lg:py-4 text-lg lg:text-xl">
        <ul className="lg:p-4">
          <li className="py-2 lg:px-8 px-2 flex justify-between bg-teal-500">
            <span>Name: </span>
            <span>{showDetails.name}</span>
          </li>
          <li className="py-2 lg:px-8 px-2 flex justify-between bg-white text-black">
            <span>Language: </span>
            <span>{showDetails.language}</span>
          </li>
          <li className="py-2 lg:px-8 px-2 flex justify-between bg-teal-500">
            <span>Genres: </span>
            <span>{showDetails.genres.join(" | ")}</span>
          </li>
          <li className="py-2 lg:px-8 px-2 flex justify-between bg-white text-black">
            <span>Day: </span>
            <span>{showDetails.schedule.days[0]}</span>
          </li>
          <li className="py-2 lg:px-8 px-2 flex justify-between bg-teal-500">
            <span>Time: </span>
            <span>{showDetails.schedule.time} (UTC-5)</span>
          </li>
          <li className="py-2 lg:px-8 px-2 flex justify-between bg-white text-black">
            <span>Rating: </span>
            <span>{renderStars(showDetails.rating.average)}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Details;
