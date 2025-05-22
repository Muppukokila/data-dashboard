import React, { useState } from 'react';
import { Bar, Line, Pie, Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, LineElement, PointElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, LineElement, PointElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend);

function ChartComponent({ data }) {
  const columns = Object.keys(data[0]);
  const [xKey, setXKey] = useState(columns[0]);
  const [yKey, setYKey] = useState(columns[1]);
  const [chartType, setChartType] = useState("Bar");

  const chartData = {
    labels: data.map(row => row[xKey]),
    datasets: [
      {
        label: `${yKey} by ${xKey}`,
        data: data.map(row => +row[yKey]),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true }
    }
  };

  return (
    <div>
      <div className="controls">
        <label>X-Axis:</label>
        <select value={xKey} onChange={e => setXKey(e.target.value)}>
          {columns.map(col => <option key={col}>{col}</option>)}
        </select>

        <label>Y-Axis:</label>
        <select value={yKey} onChange={e => setYKey(e.target.value)}>
          {columns.map(col => <option key={col}>{col}</option>)}
        </select>

        <label>Chart Type:</label>
        <select value={chartType} onChange={e => setChartType(e.target.value)}>
          <option>Bar</option>
          <option>Line</option>
          <option>Pie</option>
          <option>Scatter</option>
        </select>
      </div>

      {chartType === "Bar" && <Bar data={chartData} options={chartOptions} />}
      {chartType === "Line" && <Line data={chartData} options={chartOptions} />}
      {chartType === "Pie" && <Pie data={chartData} />}
      {chartType === "Scatter" && <Scatter data={{
        datasets: [{
          label: `${yKey} vs ${xKey}`,
          data: data.map(row => ({ x: +row[xKey], y: +row[yKey] })),
          backgroundColor: 'rgba(54, 162, 235, 0.6)'
        }]
      }} options={chartOptions} />}
    </div>
  );
}

export default ChartComponent;

