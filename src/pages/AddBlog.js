import React, { useState, useRef, useEffect } from "react";
import "cropperjs/dist/cropper.css";
import ImageCrop from "../components/ImageCrop";
import cropIcon from "../assets/images/crop.svg";
import ImageResizeModal from "../components/ImageResizeModal";
import TextEditor from "../components/TextEditor/TextEditor";
import { Buffer } from "buffer";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

const AddBlog = () => {
  const unique_id = uuid();
  const navigate = useNavigate();
  const cropperRef = useRef(null);
  const [croppedImg, setCroppedImg] = useState("");
  const [uploadedImage, setUploadedImage] = useState("");
  const [showCropper, setShowCropper] = useState(false);

  const [showImageResizeModal, setShowImageResizeModal] = useState(false);
  const [imageWidth, setImageWidth] = useState();

  const [blogHeader, setBlogHeader] = useState("");

  const quillRef = useRef("");
  const [content, setContent] = useState("");

  const [buttonDisable, setButtonDisable] = useState(true);

  const onCrop = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    setCroppedImg(cropper.getCroppedCanvas().toDataURL());
  };

  const handleImage = (file) => {
    if (file.length === 0) return;
    var reader = new FileReader();

    reader.onload = () => {
      setUploadedImage(reader.result);
    };
    reader.readAsDataURL(file[0]);
  };
  const clickAddButton = () => {
    const body = {
      id: unique_id,
      header: blogHeader.trim(),
      image: croppedImg.trim().length === 0 ? uploadedImage : croppedImg,
      content: Buffer.from(content).toString("base64"),
      imageWidth: imageWidth && imageWidth.length > 0 ? imageWidth : null,
      comment: [
        {
          nameSurname: "Orçun Berkay Akkaya",
          email: "berkayakkaya49@gmail.com",
          comment: "Teşekkürler",
        },
      ],
    };
    if (localStorage.getItem("orcunAkkayaCase") !== null) {
      localStorage.setItem(
        "orcunAkkayaCase",
        JSON.stringify([
          ...JSON.parse(localStorage.getItem("orcunAkkayaCase")),
          body,
        ])
      );
    } else {
      localStorage.setItem("orcunAkkayaCase", JSON.stringify([body]));
    }

    navigate(`/blog/${unique_id}`);

    // fetch("https://64b8463721b9aa6eb079bd4f.mockapi.io/blog", {
    //     method: 'POST',
    //     headers: {'content-type': 'application/json'},
    //     body: JSON.stringify({
    //         header: blogHeader.trim(),
    //         image: croppedImg.trim().length === 0 ? uploadedImage : croppedImg,
    //         content: Buffer.from(content).toString('base64'),
    //         imageWidth: (imageWidth && imageWidth.length > 0) ? imageWidth : null,
    //         comment: [
    //             {
    //                 nameSurname: "Orçun Berkay Akkaya",
    //                 email: "berkayakkaya49@gmail.com",
    //                 comment: "Teşekkürler"
    //             }
    //         ]
    //     })
    // }).then(res => {
    //     if(res.status === 201){
    //         res.json().then(data => {
    //             navigate(`/blog/${data.id}`)
    //         })
    //     }
    // })
  };
  useEffect(() => {
    if (
      uploadedImage.trim().length > 0 &&
      blogHeader.trim().length > 0 &&
      content.trim().length > 0
    ) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [uploadedImage, blogHeader, content]);

  return (
    <div className="add-blog">
      <div>
        <h3>Add Blog</h3>
        <div className="add-blog-content">
          <div className="add-blog-content__item">
            <label>Resim ekleyin</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImage(e.target.files)}
            />
          </div>

          <div className="add-blog-content__item-buttons">
            <button
              onClick={() => setShowCropper(true)}
              disabled={uploadedImage.trim().length === 0}
            >
              <img src={cropIcon} alt="crop-icon" /> <span>resmi kırpın</span>
            </button>
            <button
              onClick={() => setShowImageResizeModal(true)}
              disabled={uploadedImage.trim().length === 0}
            >
              resim genişliği
            </button>
          </div>

          <div className="add-blog-content__item">
            <label>Blog Başlığı</label>
            <input
              className="add-input"
              type="text"
              onChange={(e) => setBlogHeader(e.target.value)}
            />
          </div>

          <div className="add-blog-content__item add-blog-editor">
            <label>İçerik</label>
            <TextEditor
              value={content}
              setValue={setContent}
              isLabelShow={false}
              className={"add-blog-editor"}
              quillRef={quillRef}
            />
          </div>

          <button
            className="add-blog-save-btn"
            onClick={() => clickAddButton()}
            disabled={buttonDisable}
          >
            ekle
          </button>

          {showCropper && (
            <ImageCrop
              uploadedImage={uploadedImage}
              onCrop={onCrop}
              cropperRef={cropperRef}
              setShowCropper={setShowCropper}
            />
          )}
        </div>
      </div>

      {showImageResizeModal && (
        <ImageResizeModal
          setShowImageResizeModal={setShowImageResizeModal}
          setImageWidth={setImageWidth}
        />
      )}
    </div>
  );
};

export default AddBlog;
