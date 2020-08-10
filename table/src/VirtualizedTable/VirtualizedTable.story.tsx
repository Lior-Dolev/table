import React from 'react';
import { storiesOf } from '@storybook/react';
import Requirements from '../Requirements';
import Stats from '../Stats';
import VirtualizedTable from './index';

storiesOf('1. react-virtualized', module).add('1. Table', () => (
  <div style={{ margin: 10, maxHeight: '100%', height: '100%' }}>
    <h1>react-virtualized Table</h1>
    <p>
      React components for efficiently rendering large lists and tabular data.
    </p>
    <p>
      Table component with fixed headers and windowed rows for improved
      performance with large data sets. This component expects explicit width
      and height parameters. Table content can scroll vertically but it is not
      meant to scroll horizontally.
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
      href={'https://bvaughn.github.io/react-virtualized/#/components/Table'}
    >
      Demo
    </a>
    <Requirements missingRequirements={[5, 7]} pluginRequirements={[2, 3, 7]} />
    <br />
    <hr />
    <p>
      <a
        href={
          'https://github.com/bvaughn/react-virtualized/blob/master/docs/Table.md#table'
        }
      >
        Horizontal Scroll:
      </a>{' '}
      <q style={{ fontStyle: 'italic' }}>
        Table content can scroll vertically but it is{' '}
        <strong>not meant to scroll horizontally.</strong>
      </q>
    </p>
    <hr />
    <h3>Default:</h3>
    <div style={{ height: '70%' }}>
      <VirtualizedTable
        rowsCount={1000}
        columnsCount={20}
        selection={'multi'}
      />
    </div>
    <br />
    <hr />
    <h3>Horizontal scroll hack:</h3>
    <div
      style={{
        overflowX: 'scroll',
        overflowY: 'hidden',
        height: '70%',
      }}
    >
      <VirtualizedTable
        supportHorizontalScroll
        rowsCount={1000}
        columnsCount={20}
      />
    </div>
  </div>
));
