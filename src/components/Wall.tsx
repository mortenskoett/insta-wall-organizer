import React, { CSSProperties, useState } from 'react';
import { ItemTypes } from "../dnd/types"
import { DragPreviewImage, ConnectableElement, useDrag, useDrop } from 'react-dnd'


export type WallImageData = {
  id: string
  src: string
}

type WallProps = {
  images: WallImageData[]
}

type ImageProps = {
  image: WallImageData
  onDrop: Function
}

// Swap two images in the array
const swap = (idx1: number, idx2: number, images: WallImageData[]): WallImageData[] => {
  const arr = [...images];
  [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
  return arr
}

// Complete wall render
export const Wall = ({ images }: WallProps) => {
  const [wallImages, setWallimages] = useState(images);

  const updateImageState = () => {
    console.log("hello image drop function was called");
  }

  const renderImage = (wallImageData: WallImageData, onImageDrop: Function) => {
    return (
      <Image
        image={wallImageData}
        onDrop={onImageDrop}
        key={`${wallImageData.id}-image`}
      />
    );
  }

  return (
    <div className={"wall"} style={wallStyle}>
      <section
        className="image-list"
        style={imageListStyle}>
        {images.map((img) => renderImage(img, updateImageState))}
      </section>
    </div>
  )
}

interface DropResult {
  id: string
}

// Individual image render
const Image = ({ image, onDrop }: ImageProps) => {
  const { id, src } = image;

  // Handle image drag
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: ItemTypes.IMAGE,
    item: { id },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>()
      if (item && dropResult) {
        console.log(`You dropped ${item.id} into ${dropResult.id}!`)
        onDrop();
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  // Handle image drop
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.IMAGE,
    drop: () => console.log("drop called"), // here the logic to move the thing should be
    collect: monitor => ({
      isOver: monitor.isOver()
    })
  }),
  )

  // Necessary to attach both drag and drop as ref to each image
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
    opacity: isOver || isDragging ? 0.4 : 1,
    cursor: 'grab',
  }

  return (
    <>
      <DragPreviewImage connect={preview} src={src} />
      <div className="file-item" >
        <img className="file-img"
          ref={attachRef}
          src={src}
          alt={`img-${id}`}
          style={imageStyle}
        />
      </div>
    </>
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

