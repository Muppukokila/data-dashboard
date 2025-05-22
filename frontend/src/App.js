import React, { useState } from 'react';
import FileUpload from './FileUpload';
import ChartComponent from './ChartComponent';
import './styles.css';

function App() {
  const [data, setData] = useState([]);

  return (
    <div className="app">
      <h1>📈 Interactive Data Analytics Dashboard</h1>
      <FileUpload setData={setData} />
      {data.length > 0 && <ChartComponent data={data} />}
    </div>
  );
}

export default App;

