import React, { useCallback } from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import cuid from "cuid";

import Dropzone from "../components/Dropzone";
import { WallImageData, Wall } from "../components/Wall";

import d1 from '../resources/images/dummy/d1.jpg';
import d2 from '../resources/images/dummy/d2.jpg';
import d3 from '../resources/images/dummy/d3.jpg';
import d4 from '../resources/images/dummy/d4.jpg';


const dummy_images: WallImageData[] = [
  { id: cuid(), src: d1 },
  { id: cuid(), src: d2 },
  { id: cuid(), src: d3 },
  { id: cuid(), src: d4 },
  { id: cuid(), src: d4 },
  { id: cuid(), src: d4 },
  { id: cuid(), src: d3 },
  { id: cuid(), src: d3 },
  { id: cuid(), src: d4 },
  { id: cuid(), src: d4 },
]

const Homepage = () => {
  const onDrop = useCallback((acceptedFiles: any): void => {
    // Implement this: https://blog.logrocket.com/drag-and-drop-react-dnd/
    console.log(acceptedFiles);
  }, []);

  return (
    <main className="homepage" >
      <Dropzone onDrop={onDrop} accept={{
        'image/png': ['.png'],
        'image/jpeg': ['.jpg', '.jpeg']
      }}></Dropzone>
      <DndProvider backend={HTML5Backend}>
        <Wall images={dummy_images} />
      </DndProvider>
    </main>
  )
}

export default Homepage;
