import React, { CSSProperties } from 'react';
import { ItemTypes } from "../dnd/types"
import { ConnectableElement, useDrag, useDrop } from 'react-dnd'


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

  // Handle image drag and drop
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.IMAGE,
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.IMAGE,
    drop: () => console.log("drop called"),
    collect: monitor => ({
      isOver: monitor.isOver()
    })
  }),
  )

  function attachRef(el: ConnectableElement) {
    drag(el)
    drop(el)
  }

  const imageStyle: CSSProperties = {
    float: "left",
    display: "inline",
    width: "33.333%",
    maxHeight: "auto",
    padding: "1px",
    opacity: isDragging ? 0.3 : 1,
    cursor: 'grabbing',
  }

  return (
    <div className="file-item" >
      <img className="file-img"
        ref={attachRef} // image drag
        src={src}
        alt={`img-${id}`}
        style={imageStyle}
      />
    </div>
  );
};

const wallStyle: CSSProperties = {
  justifyContent: "center",
  display: 'flex',
  flexWrap: 'wrap',
  paddingTop: "1em",
  // border: "3px dotted orange", // debugging
}

const imageListStyle: CSSProperties = {
  width: "70%",
  margin: "1px",
  padding: "1px",
  // border: "3px dotted red",  // debugging
}

