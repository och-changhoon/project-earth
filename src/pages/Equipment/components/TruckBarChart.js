import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
} from 'recharts';

export default function TruckBarChart({ truckData }) {
  const isData = truckData.length !== 0;
  if (!isData) return <div>로딩중입니다.</div>;

  const renderCustomizedLabel = props => {
    const { x, y, width, value } = props;
    const radius = 10;

    return (
      <g>
        <text
          x={x + width / 2}
          y={y - radius}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {value}회
        </text>
      </g>
    );
  };

  return (
    <ResponsiveContainer width="95%" height={300}>
      <BarChart
        data={truckData}
        margin={{
          top: 30,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid fill="#FFFFFF" />
        <XAxis dataKey="name" />
        <YAxis type="number" domain={[0, 10]} />
        <Bar dataKey="pv" fill="#FFC506" minPointSize={0} barSize={70}>
          <LabelList dataKey="pv" content={renderCustomizedLabel} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}