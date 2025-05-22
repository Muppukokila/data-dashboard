import React from 'react';
import axios from 'axios';

function FileUpload({ setData }) {
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    const res = await axios.post('http://localhost:5000/upload', formData);
    setData(res.data.data);
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleUpload} />
    </div>
  );
}

export default FileUpload;

