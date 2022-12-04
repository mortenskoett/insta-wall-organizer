import React, { useCallback } from 'react';

import './App.css';
import Dropzone from './components/Dropzone';

function App() {
  const onDrop = useCallback((acceptedFiles: any): void => {
    console.log(acceptedFiles);
  }, []);

  return (
    <main className="App">
      <Dropzone onDrop={onDrop} accept={{
        'image/png': ['.png'],
        'image/jpeg': ['.jpg', '.jpeg']
      }}></Dropzone>
    </main>
  );
}

export default App;
