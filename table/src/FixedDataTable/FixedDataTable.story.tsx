import React from 'react';
import { storiesOf } from '@storybook/react';
import Requirements from '../Requirements';
import FixedDataTable from './index';

storiesOf('3. fixed-data-table-2', module).add('Table', () => (
  <div style={{ margin: 10, maxHeight: '100%', height: '100%' }}>
    <h1>fixed-data-table-2</h1>
    <Requirements missingRequirements={[]} pluginRequirements={[1, 2, 3]} />
    <br />
    <hr />
    <div style={{ height: '50%' }}>
      <FixedDataTable rowsCount={1000} columnsCount={20} selection={'multi'} />
    </div>
  </div>
));
