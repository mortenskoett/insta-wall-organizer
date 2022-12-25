import React, { CSSProperties, useState } from 'react';
import { ItemTypes } from "../dnd/types"
import { DragPreviewImage, ConnectableElement, useDrag, useDrop } from 'react-dnd'
import cuid from 'cuid';


export type WallImageData = {
  id: string
  src: string
}

type WallProps = {
  images: WallImageData[]
}

type ImageProps = {
  index: number
  image: WallImageData
  onDrop: Function
}

// Swap two images in the array
const swap = (idx1: number, idx2: number, images: WallImageData[]): WallImageData[] => {
  const arr = Array.from(images);
  // console.log("before:", arr.map((e, i) => i + ":" + e.id)); // DEBUGGING
  const temp = arr[idx1];
  arr[idx1] = arr[idx2];
  arr[idx2] = temp;
  // console.log("after:", arr.map((e, i) => i + ":" + e.id)); // DEBUGGING
  return arr;
}

// Complete wall render
export const Wall = ({ images }: WallProps) => {
  const [wallImages, setWallimages] = useState(images);

  const handleImageReordering = (idx1: number, idx2: number) => {
    const reordered = swap(idx1, idx2, wallImages);
    setWallimages(reordered);
  }

  const renderImage = (index: number, wallImageData: WallImageData, onImageDrop: Function) => {
    return (
      <Image
        index={index}
        image={wallImageData}
        onDrop={onImageDrop}
        key={`${cuid()}-image`} // New key everytime to force rerender of whole array
      />
    );
  }

  return (
    <div className={"wall"} style={wallStyle}>
      <section
        className="image-list"
        style={imageListStyle}>
        {wallImages.map((img, i) => renderImage(i, img, handleImageReordering))}
      </section>
    </div>
  )
}

// The image on which another was dropped
interface DropResult {
  dropIndex: number
}

// Individual image render
const Image = ({ index, image, onDrop }: ImageProps) => {
  const { id, src } = image;

  // Handle image drag
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: ItemTypes.IMAGE,
    item: { index },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>() // Get DropResult from dnd
      if (item && dropResult) {
        console.log(`You dropped ${item.index} into ${dropResult.dropIndex}!`)
        onDrop(item.index, dropResult.dropIndex);
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  // Handle image drop
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.IMAGE,
    drop: () => ({ dropIndex: index }), // Put image index in dnd DropResult
    collect: monitor => ({
      isOver: monitor.isOver(),
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

