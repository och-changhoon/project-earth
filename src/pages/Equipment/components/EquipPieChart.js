import { PieChart, Pie, Cell } from 'recharts';
import React from 'react';

const EquipPieChart = ({ equipData, sort }) => {
  const isData = equipData.length !== 0;
  if (!isData) return <div>로딩중입니다.</div>;

  const data = [
    {
      name: 'Idle',
      value: equipData[sort].idle,
    },
    {
      name: 'Travel',
      value: equipData[sort].travel,
    },
    {
      name: 'Load',
      value: equipData[sort].load,
    },
    {
      name: 'Unload',
      value: equipData[sort].unload,
    },
  ];
  const COLORS = ['#FF4C65', '#FFC506', '#1CDFBB', '#47BEFF'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    x,
    y,
    name,
    value,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.31;
    const xx = cx + radius * Math.cos(-midAngle * RADIAN) * 0.8;
    const yy = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={xx}
        y={yy}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize={16}
      >
        {value === 0 ? null : name}
      </text>
    );
  };

  return (
    <PieChart width={220} height={230}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={40}
        outerRadius={110}
        labelLine={false}
        label={renderCustomizedLabel}
        fill="#8884d8"
        dataKey="value"
        paddingAngle={0}
        nameKey="name"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index]} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default EquipPieChart;
