import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import '../../styles/emissionsTracker.css';

const EmissionsTracker = () => {
  const [trips, setTrips] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{ label: 'CO₂ Emissions (kg)', data: [] }],
  });
  const [viewMode, setViewMode] = useState('monthly'); // Options: yearly, monthly, weekly, daily

  // Hardcoded historical data example
  const historicalData = [
    { date: '2023-01', emissions: 120 },
    { date: '2023-02', emissions: 90 },
    { date: '2023-03', emissions: 100 },
    { date: '2024-01', emissions: 130 },
    { date: '2024-02', emissions: 80 },
  ];

  useEffect(() => {
    const savedTrips = JSON.parse(localStorage.getItem('trips')) || [];
    setTrips(savedTrips);
  }, []);

  useEffect(() => {
    updateChartData(trips);
  }, [viewMode, trips]); // Trigger updateChartData when viewMode or trips changes

  const updateChartData = () => {
    let hardcodedData;
  
    switch (viewMode) {
      case 'yearly':
        hardcodedData = [
          { date: '2023', emissions: 360 },
          { date: '2024', emissions: 420 },
        ];
        break;
  
      case 'monthly':
        hardcodedData = [
          { date: '2024-01', emissions: 130 },
          { date: '2024-02', emissions: 80 },
          { date: '2024-03', emissions: 110 },
          { date: '2024-04', emissions: 95 },
        ];
        break;
  
      case 'weekly':
        hardcodedData = [
          { date: '2024-W01', emissions: 30 },
          { date: '2024-W02', emissions: 25 },
          { date: '2024-W03', emissions: 27 },
          { date: '2024-W04', emissions: 23 },
        ];
        break;
  
      case 'daily':
        hardcodedData = [
          { date: '2024-01-01', emissions: 5 },
          { date: '2024-01-02', emissions: 7 },
          { date: '2024-01-03', emissions: 6 },
          { date: '2024-01-04', emissions: 4 },
        ];
        break;
  
      default:
        hardcodedData = [];
    }
  
    const labels = hardcodedData.map((entry) => entry.date);
    const data = hardcodedData.map((entry) => entry.emissions);
  
    setChartData({
      labels,
      datasets: [
        {
          label: 'CO₂ Emissions (kg)',
          data,
          borderColor: 'rgba(75,192,192,1)',
          backgroundColor: 'rgba(75,192,192,0.2)',
          fill: true,
        },
      ],
    });
  
    console.log("Chart data updated:", { labels, datasets: [{ label: 'CO₂ Emissions (kg)', data }] });
  };
  
  
  

  const getWeekOfYear = (date) => {
    const start = new Date(date.getFullYear(), 0, 1);
    const diff =
      (date - start + (start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000) /
      86400000;
    return `${date.getFullYear()}-W${Math.ceil((diff + start.getDay() + 1) / 7)}`;
  };

  const handleViewModeChange = (e) => {
    setViewMode(e.target.value);
    console.log("View mode changed to:", e.target.value);
  };

  return (
    <div className="emissions-tracker">
      <h2>Emissions Tracker</h2>
      <div>
        <label>View by: </label>
        <select value={viewMode} onChange={handleViewModeChange}>
          <option value="yearly">Yearly</option>
          <option value="monthly">Monthly</option>
          <option value="weekly">Weekly</option>
          <option value="daily">Daily</option>
        </select>
      </div>
      <Line data={chartData} />
      <table>
        <thead>
          <tr>
            <th>Start Place</th>
            <th>Destination</th>
            <th>CO₂ Emissions (kg)</th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip, index) => (
            <tr key={index}>
              <td>{trip.start}</td>
              <td>{trip.destination}</td>
              <td>{trip.emissions.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmissionsTracker;
