import React from 'react';
import { storiesOf } from '@storybook/react';
import Requirements from '../Requirements';
import VirtualizedGrid from './index';

storiesOf('react-virtualized', module).add('Grid', () => (
  <div style={{ margin: 10, maxHeight: '100%', height: '100%' }}>
    <h1>react-virtualized Grid</h1>
    <Requirements missingRequirements={[5]} />
    <br />
    <hr />
    <div style={{ height: '50%' }}>
      <VirtualizedGrid
        rowsCount={1000}
        columnsCount={13}
        selection={'single'}
      />
    </div>
  </div>
));
