import React from 'react';
import { storiesOf } from '@storybook/react';
import Requirements from '../Requirements';
import Stats from '../Stats';
import FixedDataTable from './index';

storiesOf('3. fixed-data-table-2', module).add('Table', () => (
  <div style={{ margin: 10, maxHeight: '100%', height: '100%' }}>
    <h1>fixed-data-table-2</h1>
    <p>
      Fixed-Data-Table-2 is a continuation of facebook/fixed-data-table. The
      original repo is no longer maintained and has many pull requests awaiting
      response.
    </p>
    <p>
      FixedDataTable is a React component for building and presenting data in a
      flexible, powerful way. It supports standard table features, like headers,
      columns, rows, header groupings, and both fixed-position and scrolling
      columns.
    </p>
    <hr />
    <Stats
      size={'2.04 MB'}
      weeklyDownloads={'27k'}
      license={'BSD-3-Clause'}
      stars={'1k'}
      forks={'268'}
      usedBy={'816'}
      contributors={'91'}
    />
    <a
      target={'_blank'}
      href={'https://www.npmjs.com/package/fixed-data-table-2'}
    >
      npm
    </a>
    <br />
    <a
      target={'_blank'}
      href={'https://github.com/schrodinger/fixed-data-table-2'}
    >
      Source Code
    </a>
    <br />
    <a
      target={'_blank'}
      href={
        'http://schrodinger.github.io/fixed-data-table-2/example-object-data.html'
      }
    >
      Demo
    </a>
    <Requirements missingRequirements={[]} pluginRequirements={[1, 2, 3]} />
    <br />
    <hr />
    <div style={{ height: '50%' }}>
      <FixedDataTable rowsCount={1000} columnsCount={20} selection={'multi'} />
    </div>
  </div>
));
