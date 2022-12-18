import React, { CSSProperties } from 'react';

export type WallImageData = {
  id: string,
  src: string,
}

export type WallProps = {
  images: WallImageData[]
}

// Complete wall render
export const Wall = ({ images }: WallProps) => {
  const renderImage = (image: WallImageData) => {
    return (
      <Image
        id={image.id}
        src={image.src}
        key={`${image.id}-image`}
      />
    );
  }

  return (
    <div className={"wall"} style={wallStyle}>
      <section
        className="image-list"
        style={imageListStyle}>
        {images.map(renderImage)}
      </section>
    </div>
  )
}

// Individual image render
const Image = ({ id, src }: WallImageData) => {
  return (
    <div className="file-item" style={imageItemStyle}>
      <img className="file-img" src={src} alt={`img-${id}`} style={imageStyle} />
    </div>
  );
};

const wallStyle: CSSProperties = {
  justifyContent: "center",
  display: 'flex',
  flexWrap: 'wrap',
  paddingTop: "1em",
  // border: "3px dotted orange",
}

const imageListStyle: CSSProperties = {
  width: "70%",
  margin: "1px",
  padding: "1px",
  // border: "3px dotted red",
}

const imageItemStyle: CSSProperties = {
}

const imageStyle: CSSProperties = {
  float: "left",
  display: "inline",
  width: "33.333%",
  maxHeight: "auto",
  padding: "1px",
}

