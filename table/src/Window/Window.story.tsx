import React from 'react';
import { storiesOf } from '@storybook/react';
import Requirements from '../Requirements';
import Window from './index';

storiesOf('react-window', module).add('Fixed Size Grid', () => (
  <div style={{ margin: 10, maxHeight: '100%', height: '100%' }}>
    <h1>react-window Grid</h1>
    <Requirements missingRequirements={[5]} pluginRequirements={[1, 2, 3]} />
    <br />
    <hr />
    <p>
      This implementation is using 2 grids - one for the header and one for the
      body.
    </p>
    <p>
      The scroll-y between the grids is synced using React-ref and sync it
      between the grids.
    </p>
    <p>Still has a noticable delay.</p>
    <hr />
    <div style={{ height: '50%' }}>
      <Window rowsCount={1000} columnsCount={20} selection={'multi'} />
    </div>
  </div>
));
