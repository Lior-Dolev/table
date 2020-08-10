import React from 'react';
import { storiesOf } from '@storybook/react';
import Requirements from '../Requirements';
import Stats from '../Stats';
import VirtualizedGrid from './index';

storiesOf('1. react-virtualized', module).add('2. Grid', () => (
  <div style={{ margin: 10, maxHeight: '100%', height: '100%' }}>
    <h1>react-virtualized Grid</h1>
    <p>
      React components for efficiently rendering large lists and tabular data.
    </p>
    <p>
      A windowed grid of elements. Grid only renders cells necessary to fill
      itself based on the current horizontal and vertical scroll position.
    </p>
    <hr />
    <Stats
      size={'1.13 MB'}
      weeklyDownloads={'719k'}
      license={'MIT'}
      stars={'19.7k'}
      forks={'2.4k'}
      usedBy={'5,000+'}
      contributors={'192'}
    />
    <a
      target={'_blank'}
      href={'https://www.npmjs.com/package/react-virtualized'}
    >
      npm
    </a>
    <br />
    <a target={'_blank'} href={'https://github.com/bvaughn/react-virtualized'}>
      Source Code
    </a>
    <br />
    <a
      target={'_blank'}
      href={'https://bvaughn.github.io/react-virtualized/#/components/Grid'}
    >
      Demo
    </a>
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
