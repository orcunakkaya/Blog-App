import React from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const ImageCrop = ({ uploadedImage, onCrop, cropperRef, setShowCropper }) => {
  const onClickCrop = () => {
    onCrop();
    setShowCropper(false);
  };
  return (
    <div className="crop-image">
      <div className="crop-image-container">
        <Cropper
          src={uploadedImage}
          style={{ height: 400, width: "100%" }}
          initialAspectRatio={1}
          guides={true}
          ref={cropperRef}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false}
        />

        <div className="crop-image-buttons">
          <button onClick={() => setShowCropper(false)}>kapat</button>
          <button onClick={() => onClickCrop()}>resmi kırp</button>
        </div>
      </div>
    </div>
  );
};

export default ImageCrop;
