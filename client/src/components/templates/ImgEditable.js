import React, { useState } from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';

const ImgEditable = ({ isOpen, newItem, setNewItem }) => {
  const [picturePreview, setPicturePreview] = useState('');

  const handleChangePicture = async (e) => {
    if (!e.target.files[0]) return;
    const pictureFile = await e.target.files[0];

    setNewItem({ ...newItem, picture: pictureFile });
    const picturePreviewURL = await URL.createObjectURL(pictureFile);
    setPicturePreview(picturePreviewURL);
  };
  
  return (
    <label
      className={`input__image ${
          picturePreview ? '' : 'no-preview'
      }`}
      htmlFor="input_image"
      style={{ backgroundImage: `url(${picturePreview})` }}>
      <div className={`${picturePreview ? 'preview-background' : ''}`}>
          <IoIosAddCircleOutline
              className={`input__image__icon ${
                  picturePreview ? 'preview-active' : ''
              }`}
          />
      </div>
      <input
          type="file"
          id="input_image"
          onChange={handleChangePicture}
          accept=".png , .jpg , .jpeg"
          //disabled={(isOpen) ? "" : "disabled"}
          hidden
      />
    </label>
  )
}

export default ImgEditable;