import React, { useState } from "react";
import { GalleryModal } from "./ComicModal";
import "./ComicGallery.css";

function ComicGallery({ imgUrls }) {
  const [currentIndex, setCurrentIndex] = useState(null);

  const renderImageContent = (src, index) => (
    <div key={src} onClick={() => openModal(index)}>
      <div className="tooltip">
        <img src={src} alt={`gallery-img-${index}`} />
        <span className="oval-thought">Speech bubble message {index + 1}</span>
      </div>
    </div>
  );

  const openModal = (index) => {
    setCurrentIndex(index);
  };

  const closeModal = (e) => {
    if (e) {
      e.preventDefault();
    }
    setCurrentIndex(null);
  };

  const findPrev = (e) => {
    if (e) {
      e.preventDefault();
    }
    setCurrentIndex((prevIndex) => (prevIndex - 1 >= 0 ? prevIndex - 1 : null));
  };

  const findNext = (e) => {
    if (e) {
      e.preventDefault();
    }
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 < imgUrls.length ? prevIndex + 1 : null
    );
  };

  return (
    <div className="gallery-container">
      <div className="gallery-grid">{imgUrls.map(renderImageContent)}</div>
      <GalleryModal
        closeModal={closeModal}
        findPrev={findPrev}
        findNext={findNext}
        hasPrev={currentIndex > 0}
        hasNext={currentIndex + 1 < imgUrls.length}
        src={imgUrls[currentIndex]}
      />
    </div>
  );
}

export default ComicGallery;
