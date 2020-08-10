import React from 'react';
import { storiesOf } from '@storybook/react';
import Requirements from '../Requirements';
import Stats from '../Stats';
import DataGrid from './index';

storiesOf('4. react-data-grid', module).add('Grid', () => (
  <div style={{ margin: 10, maxHeight: '100%', height: '100%' }}>
    <h1>react-data-grid</h1>
    <p>
      Excel-like grid component built with React, with editors, keyboard
      navigation, copy & paste, and more
    </p>
    <hr />
    <Stats
      size={'250 kB'}
      weeklyDownloads={'52k'}
      license={'MIT'}
      stars={'4.1k'}
      forks={'1.8k'}
      usedBy={'3,100+'}
      contributors={'100+'}
    />
    <a target={'_blank'} href={'https://www.npmjs.com/package/react-data-grid'}>
      npm
    </a>
    <br />
    <a target={'_blank'} href={'https://github.com/adazzle/react-data-grid'}>
      Source Code
    </a>
    <br />
    <a
      target={'_blank'}
      href={'https://adazzle.github.io/react-data-grid/canary/'}
    >
      Demo
    </a>
    <Requirements missingRequirements={[]} pluginRequirements={[2]} />
    <br />
    <hr />
    <div style={{ height: '50%' }}>
      <DataGrid rowsCount={1000} columnsCount={20} selection={'multi'} />
    </div>
  </div>
));
