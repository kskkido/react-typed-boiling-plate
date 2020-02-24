import React from 'react';
import { action } from '@storybook/addon-actions';
import Swiper from '..';

export default {
  title: 'components/Swiper',
  component: Swiper,
}

export const Default = () => (
  <Swiper onChange={action('swiped')}>poo</Swiper>
);
