import React from 'react';
import { storiesOf } from '@storybook/react';
import Requirements from '../Requirements';
import Stats from '../Stats';
import MultiGrid from './index';

storiesOf('1. react-virtualized', module).add('3. Multi Grid', () => (
  <div style={{ margin: 10, maxHeight: '100%', height: '100%' }}>
    <h1>react-virtualized MultiGrid</h1>
    <p>
      React components for efficiently rendering large lists and tabular data.
    </p>
    <p>
      This component stitches together several grids to provide a fixed
      column/row interface.
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
      href={
        'https://bvaughn.github.io/react-virtualized/#/components/MultiGrid'
      }
    >
      Demo
    </a>
    <Requirements missingRequirements={[5]} pluginRequirements={[1, 2, 3]} />
    <br />
    <hr />
    <p>
      ScrollSync is built inside the components so we didn't need to add extra
      code for it.
    </p>
    <p>ScrollSync has a noticable delay.</p>
    <hr />
    <div style={{ height: '50%' }}>
      <MultiGrid rowsCount={100} columnsCount={16} selection={'single'} />
    </div>
  </div>
));
