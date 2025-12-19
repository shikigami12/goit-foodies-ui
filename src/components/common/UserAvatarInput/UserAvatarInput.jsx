import React, { useEffect, useState } from 'react';
import { Icon } from '../Icon/Icon';
import { useWindowWidth } from '../../../hooks';

export default function UserAvatarInput() {
  const isCurrentUser = true; //TODO: need to take from storage
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const windowWidth = useWindowWidth();

  const inputRef = React.useRef();
  console.log(inputRef);
  useEffect(() => {
    console.log(selectedFile);

    previewImage && URL.revokeObjectURL(previewImage);
    selectedFile && setPreviewImage(URL.createObjectURL(selectedFile));
  }, [selectedFile]);

  const handleAddButton = () => {
    inputRef.current.click();
  };

  const handleFileChange = event => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div className="relative rounded-[90%] bg-borders w-20 h-20 md:w-[120px] md:h-[120px] mx-auto">
      {previewImage && <img className="w-full h-full rounded-[90%]" src={previewImage} />}
      {isCurrentUser && (
        <>
          {' '}
          <button
            type="button"
            className="absolute bottom-0 left-1/2 bg-brand -translate-x-1/2 translate-y-1/2 rounded-[90%] w-7 h-7 md:w-[38px] md:h-[38px] flex justify-center items-center leading-none text-white border-none"
            onClick={handleAddButton}
          >
            <Icon
              name="plus"
              size={windowWidth < 768 ? 16 : 18}
              stroke="white"
            />
          </button>
          <input
            className="hidden"
            type="file"
            ref={inputRef}
            accept="image/*"
            onChange={handleFileChange}
          />
        </>
      )}
    </div>
  );
}
