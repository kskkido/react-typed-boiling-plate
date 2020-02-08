import React from 'react';
import Pie from '../';

export default {
  title: 'components/Pie',
  component: Pie
};

const data = [
  {
    label: 1,
    fill: '#ffc7c7',
  },
  {
    label: 2,
    fill: '#ff80b0',
  },
  {
    label: 3,
    fill: '#9399ff',
  },
  {
    label: 4,
    fill: '#a9fffd',
  },
]

export const Default = () => (
  <Pie outerRadius={100} innerRadius={50}>
    {data.map((entry, i) => <Pie.Slice key={i} value={1} {...entry} />)}
  </Pie>
);
