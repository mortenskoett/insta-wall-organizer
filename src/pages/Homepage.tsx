import React, { useCallback, useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
import cuid from "cuid";

import Dropzone from "../components/Dropzone";
import { WallImageData, Wall } from "../components/Wall";

import d1 from '../resources/images/dummy/d1.jpg';
import d2 from '../resources/images/dummy/d2.jpg';
import d3 from '../resources/images/dummy/d3.jpg';
import d4 from '../resources/images/dummy/d4.jpg';

// FIXME: Change when dropzone works
const dummy_images: WallImageData[] = [
  { id: "0", src: d1 },
  { id: "1", src: d2 },
  { id: "2", src: d3 },
  { id: "3", src: d4 },
]

const isTouchDevice = () => {
  return (('ontouchstart' in window) ||
    (navigator.maxTouchPoints > 0) ||
    (navigator.maxTouchPoints > 0));
}

const Homepage = () => {
  const [images, setImages] = useState(dummy_images);

  const onDropzoneDrop = useCallback((acceptedFiles: any): void => {
    const uploadedImages: WallImageData[] =
      acceptedFiles.map((file: Blob | MediaSource) => {
        return {
          id: cuid(),
          src: URL.createObjectURL(file),
        }
      });

    console.log("Uploaded files:", uploadedImages);
    setImages(uploadedImages);
  }, [])

  // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
  useEffect(() => {
    images.forEach(img => URL.revokeObjectURL(img.src));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="homepage" >
      <Dropzone onDrop={onDropzoneDrop} accept={{
        'image/png': ['.png'],
        'image/jpeg': ['.jpg', '.jpeg']
      }}></Dropzone>
      <DndProvider backend={isTouchDevice() ? TouchBackend : HTML5Backend}>
        <Wall images={images} key={cuid()} />
      </DndProvider>
    </main>
  )
}

export default Homepage;
