import { useState } from "react";
import ComicGallery from "./components/ComicGallery/ComicGallery";
import ComicForm from "./components/ComicForm/ComicForm";
import query from "./api/queryApi";
import "./App.css";

function Animation() {
  return (
    <div class="pen">
      <div class="light x1"></div>
      <div class="light x2"></div>
      <div class="light x3"></div>
      <div class="light x4"></div>
      <div class="light x5"></div>
      <div class="light x6"></div>
      <div class="light x7"></div>
      <div class="light x8"></div>
      <div class="light x9"></div>
    </div>
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
      <Animation />
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
