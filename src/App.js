import { useState, useEffect } from "react";
import ComicGallery from "./components/ComicGallery/ComicGallery";
import ComicForm from "./components/ComicForm/ComicForm";
import query from "./api/queryApi";
import "./App.css";

function Header() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const body = document.body;
    const toggle = document.querySelector(".toggle-inner");

    // If dark mode is enabled - adds classes to update dark-mode styling.
    // Else, removes and styling is as normal.
    if (darkMode === true) {
      body.classList.add("dark-mode");
      toggle.classList.add("toggle-active");
    } else {
      body.classList.remove("dark-mode");
      toggle.classList.remove("toggle-active");
    }
  }, [darkMode]);

  return (
    <header>
      <div
        id="toggle"
        onClick={() =>
          darkMode === false ? setDarkMode(true) : setDarkMode(false)
        }
      >
        <div className="toggle-inner" />
      </div>
    </header>
  );
}

function App() {
  const [comicImages, setComicImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const makeSpinner = () => (
    <div className="spinner">
      <div className="bounce1"></div>
      <div className="bounce2"></div>
      <div className="bounce3"></div>
    </div>
  );

  const generateComic = async (textInput) => {
    try {
      setLoading(true);

      const apiCalls = Array.from({ length: 6 }, async (_, index) => {
        const response = await query({ inputs: textInput });
        return { image: response };
      });
      const results = await Promise.all(apiCalls);
      const urls = results.map((result) => URL.createObjectURL(result.image));

      setComicImages(urls);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <Header />
      <div className="center-div">
        <h1 className="main_heading">Comic Generator</h1>
        <ComicForm generateComic={generateComic} />
        {error && <p>API Error: {error}</p>}
        {loading ? (
          <>
            {" "}
            <h3>
              API might take 5 minutes to load images
            </h3> {makeSpinner()}{" "}
          </>
        ) : (
          <ComicGallery imgUrls={comicImages} />
        )}
      </div>
    </div>
  );
}

export default App;
