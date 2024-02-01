import { useEffect, useState } from "react";

const Home = () => {
  const [shows, setShows] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (search === "") {
      fetch("https://api.tvmaze.com/search/shows?q=all")
        .then((response) => response.json())
        .then((data) => setShows(data));
    } else {
      fetch(`https://api.tvmaze.com/search/shows?q=${search}`)
        .then((response) => response.json())
        .then((data) => setShows(Array.isArray(data) ? data : []));
    }
  }, [search]);

  return (
    <div>
      <div className="bg-teal-500 text-center p-3">
        <input
          type="text"
          placeholder="Search Shows"
          className="lg:w-96 rounded-xl p-2 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="flex justify-evenly flex-wrap gap-6 bg-teal-500">
        {shows.map((show, index) => {
          return (
            <div
              className="flex items-center justify-center flex-wrap p-6"
              key={index}
            >
              <div className="w-80 h-96 bg-black rounded-lg p-4 shadow duration-150 hover:scale-105 hover:shadow-md  relative">
                <img
                  className="w-full h-full rounded-lg"
                  src={show.show.image?.medium}
                  alt={show.show.name}
                />
                <div>
                  <button className="bg-white rounded-full absolute bottom-2 mb-2 right-4 p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-arrow-narrow-right"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="6"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M5 12l14 0" />
                      <path d="M15 16l4 -4" />
                      <path d="M15 8l4 4" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
