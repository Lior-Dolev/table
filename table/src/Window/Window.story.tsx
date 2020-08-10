import React from 'react';
import { storiesOf } from '@storybook/react';
import Requirements from '../Requirements';
import Stats from '../Stats';
import Window from './index';

storiesOf('2. react-window', module).add('Fixed Size Grid', () => (
  <div style={{ margin: 10, maxHeight: '100%', height: '100%' }}>
    <h1>react-window Grid</h1>
    <p>
      React components for efficiently rendering large lists and tabular data.
    </p>
    <hr />
    <Stats
      size={'865 kB'}
      weeklyDownloads={'376k'}
      license={'MIT'}
      stars={'8.7k'}
      forks={'438'}
      usedBy={'5,000+'}
      contributors={'31'}
    />
    <a target={'_blank'} href={'https://www.npmjs.com/package/react-window'}>
      npm
    </a>
    <br />
    <a target={'_blank'} href={'https://github.com/bvaughn/react-window'}>
      Source Code
    </a>
    <br />
    <a
      target={'_blank'}
      href={'https://react-window.now.sh/#/examples/list/fixed-size'}
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
