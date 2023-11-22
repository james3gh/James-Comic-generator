import { useState } from "react";
import ComicGallery from "./components/ComicGallery/ComicGallery";
import ComicForm from "./components/ComicForm/ComicForm";
import query from "./api/queryApi";
import "./App.css";

function App() {
  const [comicImages, setComicImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // const [chatMessages, setChatMessages] = useState([]);

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

      const apiCalls = Array.from({ length: 3 }, async (_, index) => {
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
      <div className="center_div">
        <h1 className="main_heading">Comic Generator</h1>
        <ComicForm generateComic={generateComic} />
        {error && <p>API Error: {error}</p>}
        {loading ? makeSpinner() : <ComicGallery imgUrls={comicImages} />}
      </div>
    </div>
  );
}

export default App;
