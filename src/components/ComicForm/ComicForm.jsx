import React, { useState } from "react";
import "./ComicForm.css";

function ComicForm({ generateComic }) {
  const [textInput, setTextInput] = useState("");

  const handleInputChange = (e) => {
    setTextInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (textInput.trim().length === 0) return;
    generateComic(textInput);
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={textInput}
          onChange={handleInputChange}
          required
          placeholder="Enter your search word here..."
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
    </div>
  );
}

export default ComicForm;
