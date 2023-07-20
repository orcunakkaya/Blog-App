import { useState } from "react";
import closeButton from "../assets/images/close-button.svg";

const ImageResizeModal = ({ setShowImageResizeModal, setImageWidth }) => {
  const [size, setSize] = useState();

  const handleSave = () => {
    setShowImageResizeModal(false);
    setImageWidth(size);
  };
  return (
    <div className="image-resize">
      <div className="image-resize__container">
        <div className="image-resize__header">
          <div>Resim Boyutunu Değiştir</div>
          <button onClick={() => setShowImageResizeModal(false)}>
            <img src={closeButton} alt="close-button" />
          </button>
        </div>

        <div className="image-resize__item">
          <label>Resim genişliği</label>
          <input
            onChange={(e) => setSize(e.target.value)}
            type="number"
            onKeyDown={(e) =>
              ["e", "E", "+", "-", "*", "/", " "].includes(e.key) &&
              e.preventDefault()
            }
            onWheel={(e) => e.currentTarget.blur()}
          />
        </div>

        <div className="image-resize__footer">
          <button onClick={() => setShowImageResizeModal(false)}>kapat</button>
          <button onClick={() => handleSave()}>kaydet</button>
        </div>
      </div>
    </div>
  );
};

export default ImageResizeModal;
