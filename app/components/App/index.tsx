import React from 'react';
import Pie from '../Pie';

const App = () => (
  <div>
    <Pie title={<div>I CANT BELIEVE THIS IS HAPPENING</div>} outerRadius={200} innerRadius={150}>
      <Pie.Slice value={1} label="poop" fill="#ddd" />
    </Pie>
    DUDE
  </div>
)
export default App;
