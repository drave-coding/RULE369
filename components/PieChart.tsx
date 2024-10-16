"use client";

import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const data = {
    labels: ['Technology', 'Healthcare', 'Finance', 'Education'],
    datasets: [
      {
        label: 'Production by Domain',
        data: [300, 150, 100, 200], // Example data
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  const options = {
    maintainAspectRatio: false, // Ensures chart fits the container
    responsive: true,
    plugins: {
      legend: {
        display: false, // Disable the default legend rendering within the chart
      },
    },
  };

  return (
    <div className="flex h-full">
      {/* Legends on the left */}
      <div className="flex flex-col justify-center pr-4">
        {data.labels.map((label, index) => (
          <div key={index} className="flex items-center mb-2">
            <span
              className="inline-block w-4 h-4 mr-2"
              style={{ backgroundColor: data.datasets[0].backgroundColor[index] }}
            ></span>
            <span>{label}</span>
          </div>
        ))}
      </div>

      {/* Pie chart on the right */}
      <div className="flex-grow">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default PieChart;
