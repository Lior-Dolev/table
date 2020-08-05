import React from 'react';
import { storiesOf } from '@storybook/react';
import Requirements from '../Requirements';
import MultiGrid from './index';

storiesOf('react-virtualized', module).add('Multi Grid', () => (
  <div style={{ margin: 10, maxHeight: '100%', height: '100%' }}>
    <h1>react-virtualized MultiGrid</h1>
    <Requirements missingRequirements={[5]} pluginRequirements={[1, 2, 3]} />
    <br />
    <hr />
    <div style={{ height: '50%' }}>
      <MultiGrid rowsCount={100} columnsCount={16} selection={'single'} />
    </div>
  </div>
));