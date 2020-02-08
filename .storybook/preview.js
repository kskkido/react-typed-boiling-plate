import React from 'react';
import { addDecorator } from '@storybook/react';

addDecorator((storyFn) => (
  <div style={{ width: '100%', height: '100vh' }}>
    {storyFn()}
  </div>
));
