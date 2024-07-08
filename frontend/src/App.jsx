import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const response = await axios.get("http://localhost:5000/urls");
        setUrls(response.data);
      } catch (error) {
        console.error("Error fetching URLs:", error);
      }
    };

    fetchUrls();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:5000/shorten", {
      originalUrl,
    });
    setShortUrl(response.data.shortUrl);
    window.location.reload();
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/urls/${id}`);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting URL:", error);
    }
  };
  return (
    <main className="bg-gradient-to-bl bg-slate-500 from-orange-800  h-screen sm:grid sm:grid-cols-5 sm:gap-4 ">
      <section className=" h-72 w-full p-2 relative sm:grid sm:grid-cols-1 sm:h-screen sm:col-span-3">
        <div className="justify-center rounded  flex items-center h-64">
          <article className="p-2">
            <h1 className=" text-5xl mb-10 font-extrabold text-white text-balance">
              ACORTADOR DE URLs
            </h1>
            <div>
              <form className="grid grid-cols-3" onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="col-span-3 mb-5 placeholder:text-black p-1 bg-transparent border-b"
                  placeholder="Ingresa URL"
                  value={originalUrl}
                  onChange={(e) => setOriginalUrl(e.target.value)}
                />
                <button
                  className="col-start-2 rounded-2xl bg-blue-500/80 hover:bg-blue-600 p-2 w-fit"
                  type="submit"
                >
                  ACORTAR
                </button>
              </form>
              {shortUrl && (
                <div>
                  <h2>Shortened URL</h2>
                  <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                    {shortUrl}
                  </a>
                </div>
              )}
            </div>
          </article>
        </div>
      </section>
      <aside className="w-full sm:h-screen sm:col-span-2">
        <div className="sm:h-full px-3 py-4 overflow-y-auto ">
          <h2 className="text-4xl text-center font-extrabold bg-gradient-to-r from-orange-300 via-green-500 to-blue-400 inline-block text-transparent bg-clip-text ">LINKS: </h2>
          <ul className=" font-medium w-full flex flex-col-reverse">
            {urls.map((url) => (
              <li
                className="grid grid-cols-6 border-b border-l p-2 last:bg-cyan-600/50 "
                key={url._id}
              >
                <div className="col-span-5 w-full">
                  <label> Link Acortado:</label>
                  <p>
                    <a
                      href={url.shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-green-600 hover:bg-black/30 text-balance"
                    >
                      {url.shortUrl}
                    </a>
                  </p>

                  <label> Url Original:</label>
                  <p className="text-balance">{url.originalUrl}</p>
                </div>
                <div className="col-span-1 flex items-center">
                  <button className="" onClick={() => handleDelete(url._id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={800}
                      height={800}
                      viewBox="0 0 32 32"
                      xmlSpace="preserve"
                      className="size-4 hover:scale-125"

                    >
                      <path
                        d="M20 26.5v-16a.5.5 0 0 1 1 0v16a.5.5 0 0 1-1 0M28 5v1a1 1 0 0 1-1 1l-1.847 22.166A2 2 0 0 1 23.16 31H8.84a2 2 0 0 1-1.993-1.834L5 7a1 1 0 0 1-1-1V5a2 2 0 0 1 2-2h7V2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1h7a2 2 0 0 1 2 2M14 3h4V2h-4zm11.997 4H6.003l1.84 22.083c.044.518.477.917.997.917h14.32c.52 0 .953-.399.997-.917zM27 5a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v1h22zm-9.5 22a.5.5 0 0 0 .5-.5v-16a.5.5 0 0 0-1 0v16a.5.5 0 0 0 .5.5m-3 0a.5.5 0 0 0 .5-.5v-16a.5.5 0 0 0-1 0v16a.5.5 0 0 0 .5.5m-3 0a.5.5 0 0 0 .5-.5v-16a.5.5 0 0 0-1 0v16a.5.5 0 0 0 .5.5"
                        style={{
                          fill: "#111918",
                        }}
                      />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </main>
  );
}

export default App;
