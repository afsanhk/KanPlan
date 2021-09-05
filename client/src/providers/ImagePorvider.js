import { createContext, useState } from 'react';

export default function ImageProvider(props) {
  const [imageSrc, setImageSrc] = useState(false);
  const [imageUserID, setImageUserID] = useState(0);

  const setImage = (src, id) => {
    setImageSrc(src);
    setImageUserID(id);
  };

  const imageData = { imageSrc, imageUserID, setImage };

  // We can use this component to wrap any content we want to share this context
  return <imageContext.Provider value={imageData}>{props.children}</imageContext.Provider>;
}

export const imageContext = createContext();
