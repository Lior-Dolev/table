import React from 'react';
import { storiesOf } from '@storybook/react';
import Requirements from '../Requirements';
import VirtualizedGrid from './index';

storiesOf('react-virtualized', module).add('Grid', () => (
  <div style={{ margin: 10, maxHeight: '100%', height: '100%' }}>
    <h1>react-virtualized Grid</h1>
    <Requirements missingRequirements={[5]} pluginRequirements={[1, 2, 3]} />
    <br />
    <hr />
    <p>
      This implementation is using 2 grids - one for the header and one for the
      body.
    </p>
    <p>
      The scroll-y between the grids is synced using ScrollSync from
      react-virtualized.
    </p>
    <p>ScrollSync has a noticable delay.</p>
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
