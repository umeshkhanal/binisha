// src/components/SmartImage.jsx
import React from "react";

const SmartImage = ({
  src,
  alt,
  className = "",
  width,
  height,
  sizes,
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      sizes={sizes}
      loading="lazy"
      decoding="async"
      style={{ objectFit: "cover" }}
    />
  );
};

export default SmartImage;
