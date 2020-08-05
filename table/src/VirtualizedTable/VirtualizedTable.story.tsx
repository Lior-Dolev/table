import React from 'react';
import { storiesOf } from '@storybook/react';
import Requirements from '../Requirements';
import VirtualizedTable from './index';

storiesOf('react-virtualized', module).add('Table', () => (
  <div style={{ margin: 10, maxHeight: '100%', height: '100%' }}>
    <h1>react-virtualized Table</h1>
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
