const { useEffect, useState } = require("react");

export default function useImageDimensions(imageUrl) {
  // const [image, setImage] = useState(null);
  const [dimensions, setDimensions] = useState(null);
  useEffect(() => {
    let img = new Image();
    function handleImageLoad(){
      setDimensions({
        height: img.height,
        width: img.width,
        naturalHeight: img.naturalHeight,
        naturalWidth: img.naturalWidth,
      });
      img.removeEventListener('load', handleImageLoad);
      img.remove();
      img = null;
    }
    img.addEventListener('load', handleImageLoad);
    img.src = imageUrl;

    return () => {
      if (img !== null) {
        img.removeEventListener('load', handleImageLoad);
        img.remove();
      }
    };
  }, [imageUrl]);

  return dimensions;
}
