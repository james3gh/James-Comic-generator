import { useEffect } from "react";
import Draggable from "react-draggable";
import "./ComicGallery.css";

export const GalleryModal = ({
  closeModal,
  findPrev,
  findNext,
  hasPrev,
  hasNext,
  src,
}) => {
  const handleKeyDown = (e) => {
    if (e.keyCode === 27) closeModal();
    if (e.keyCode === 37 && hasPrev) findPrev();
    if (e.keyCode === 39 && hasNext) findNext();
  };

  useEffect(() => {
    document.body.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  if (!src) {
    return null;
  }

  return (
    <div>
      <div className="modal-overlay" onClick={closeModal}></div>
      <div className="modal">
        <div className="modal-body">
          <a
            href="/#"
            className="modal-close"
            onClick={closeModal}
            onKeyDown={handleKeyDown}
          >
            &times;
          </a>
          {hasPrev && (
            <a
              href="/#"
              className="modal-prev"
              onClick={findPrev}
              onKeyDown={handleKeyDown}
            >
              &lsaquo;
            </a>
          )}
          {hasNext && (
            <a
              href="/#"
              className="modal-next"
              onClick={findNext}
              onKeyDown={handleKeyDown}
            >
              &rsaquo;
            </a>
          )}
          <Draggable axis="both">
            <h3 className="onClick-modal-img-text">Speech bubble message</h3>
          </Draggable>
          <img src={src} alt="modal-img" />
        </div>
      </div>
    </div>
  );
};
