import React from 'react';
import { storiesOf } from '@storybook/react';
import Requirements from '../Requirements';
import Window from './index';

storiesOf('react-window', module).add('Grid', () => (
  <div style={{ margin: 10, maxHeight: '100%', height: '100%' }}>
    <h1>react-window Grid</h1>
    <Requirements missingRequirements={[1, 2, 3, 4, 5, 6]} />
    <br />
    <hr />
    <Window />
  </div>
));
