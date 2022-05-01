import React, { useState } from "react";
import Image from "next/image";
const ImageWithFallback = (props: any) => {
  const { src, fallbackSrc, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...rest}
      src={imgSrc}
      alt="lala"
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
      height="50"
      width="50"
    />
  );
};

export default ImageWithFallback;
