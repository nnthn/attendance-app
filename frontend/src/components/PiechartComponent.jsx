import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import ItemsCard from './ItemsCard.jsx';
const PieChartComponent = () => {
  const [subjectData, setSubjectData] = useState([]);

  useEffect(() => {
    fetchSubjectData();
  }, []);

  const fetchSubjectData = async () => {
    try {
      const response = await fetch('http://localhost:3001/subjectAverageMarks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      });
      const data = await response.json();
      setSubjectData(data);
    } catch (error) {
      console.error('Error fetching subject data:', error);
    }
  };

  return (
    <div className="dia-container">
      <div className="chart">
        <PieChart width={350} height={270}>
          <Pie
            data={subjectData.map(item => ({
                subject: item.subject,
                value: parseFloat(item.averageMark)
            }))}
            dataKey="value"
            nameKey="subject"
            cx="50%"
            cy="50%"
            outerRadius={100}
            innerRadius={50}
            fill="#8884d8"
            label
          >
            {
                subjectData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
                ))
            }
          </Pie>
          <Tooltip formatter={(value, name) => [name, value]} />
        </PieChart>
      </div>
      
      <div>
        <div className="items-heading">
          <h4>Subject</h4>
          <h4>Average Marks</h4>
        </div>
        <div className="item-list-container">{subjectData.map((items)=>(
            <ItemsCard
              key={items.index}
              subject={items.subject}
              mark={parseFloat(items.averageMark)}
            />
        ))}
        </div>
      </div>
    </div>
  );
};

export default PieChartComponent;
