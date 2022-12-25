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
  console.log("before:", images[0], images[1]);
  const arr = [...images];
  [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
  console.log("after:", arr[0], arr[1]);
  return arr
}

// Complete wall render
export const Wall = ({ images }: WallProps) => {
  const [wallImages, setWallimages] = useState(images);

  const handleImageReordering = (imageId1: string, imageId2: string) => {
    console.log("Image ondrop function was called with: ", imageId1, imageId2);
    const idx1 = wallImages.findIndex(img => img.id === imageId1);
    const idx2 = wallImages.findIndex(img => img.id === imageId2);
    const reordered = swap(idx1, idx2, wallImages);
    setWallimages(reordered);
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
        {wallImages.map((img) => renderImage(img, handleImageReordering))}
      </section>
    </div>
  )
}

// The image on which another was dropped
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
      const dropResult = monitor.getDropResult<DropResult>() // Get DropResult from dnd
      if (item && dropResult) {
        // console.log(`You dropped ${item.id} into ${dropResult.id}!`)
        onDrop(item.id, dropResult.id);
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  // Handle image drop
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.IMAGE,
    drop: () => ({ id: id }), // Put image id in dnd DropResult
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

