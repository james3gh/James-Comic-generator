import { useState } from "react";
import ComicGallery from "./components/ComicGallery/ComicGallery";
import ComicForm from "./components/ComicForm/ComicForm";
import query from "./api/queryApi";
import "./App.css";

function Animation() {
  return (
    <div className="pen">
      <div className="light x1"></div>
      <div className="light x2"></div>
      <div className="light x3"></div>
      <div className="light x4"></div>
      <div className="light x5"></div>
      <div className="light x6"></div>
      <div className="light x7"></div>
      <div className="light x8"></div>
      <div className="light x9"></div>
    </div>
  );
}

function App() {
  const imageUrls = [
    "/images/image1.jpg",
    "/images/image2.jpg",
    "/images/image3.jpg",
    "/images/image4.jpg",
    "/images/image5.jpg",
    "/images/image6.jpg",
  ];

  const [comicImages, setComicImages] = useState(imageUrls);
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

      const apiCalls = Array.from({ length: 10 }, async (_, index) => {
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
