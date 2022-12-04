import React from "react";

import { useDropzone } from "react-dropzone";

const Dropzone = ({ onDrop, accept }: any) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    // Passed callbacks to define behaviour
    onDrop,
    accept,
  });

  return (
    <div className="dropzone-div" {...getRootProps()}>
      <input className="dropzone-input" {...getInputProps()} />
      <div className="text-center">
        {isDragActive ? (
          <p className="dropzone-content">Drop images here</p>
        ) : (
          <p className="dropzone-content">
            Drag 'n' drop images here, or click to select files
          </p>
        )}
      </div>
    </div>
  );
};

export default Dropzone;
