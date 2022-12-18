import React, { CSSProperties, useState } from "react";

import { useDropzone } from "react-dropzone";

const Dropzone = ({ onDrop, accept }: any) => {
  // Handle hover over box
  const [isHover, setIsHover] = useState(false);
  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    // Passed callbacks to define behaviour
    onDrop,
    accept,
  });

  const dropzoneStyle: CSSProperties = {
    textAlign: 'center',
    fontSize: 'calc(5px + 2vmin)',
    padding: '20px',
    border: isHover? '3px lightblue dashed' : '3px purple dashed',
    width: '60%',
    margin: 'auto',
    borderRadius: '25px',
    MozUserSelect: "none",
    WebkitUserSelect: "none",
    msUserSelect: "none",
    fontWeight: "bold",
  };

  return (
    <div className="dropzone-div"
      {...getRootProps()}
      style={dropzoneStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <input className="dropzone-input" {...getInputProps()} />
      <div className="text-center">
        {isDragActive ? (
          <p className="dropzone-content">Drop images here</p>
        ) : (
          <p className="dropzone-content">
            Drop images here, or click to select files
          </p>
        )}
      </div>
    </div>
  );
};


export default Dropzone;
