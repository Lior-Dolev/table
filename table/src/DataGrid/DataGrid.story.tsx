import React from 'react';
import { storiesOf } from '@storybook/react';
import Requirements from '../Requirements';
import DataGrid from './index';

storiesOf('react-data-grid', module).add('Grid', () => (
  <div style={{ margin: 10, maxHeight: '100%', height: '100%' }}>
    <h1>react-data-grid</h1>
    <Requirements missingRequirements={[]} pluginRequirements={[2]} />
    <br />
    <hr />
    <div style={{ height: '50%' }}>
      <DataGrid rowsCount={1000} columnsCount={20} selection={'multi'} />
    </div>
  </div>
));
