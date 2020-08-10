import React, { useState, useEffect } from 'react';
import { storiesOf } from '@storybook/react';
import ReactDataGrid, {
  Column,
  SortDirection,
  SelectColumn,
} from 'react-data-grid';
import 'react-data-grid/dist/react-data-grid.css';
import _ from 'lodash';

type Row = {
  id: number;
  name: string;
  missingRequirements: string;
  size?: number;
  weeklyDownloads?: number;
  license?: string;
  stars?: number;
  forks?: number;
  usedBy?: number;
  contributors?: number;
};

const rows: Row[] = [
  {
    id: 1,
    name: 'react-virtualized Table',
    missingRequirements: 'Scroll Y, Resize columns',
    size: 1130,
    weeklyDownloads: 719000,
    license: 'MIT',
    stars: 19700,
    forks: 2400,
    usedBy: 5000,
    contributors: 192,
  },
  {
    id: 2,
    name: 'react-virtualized Grid',
    missingRequirements: 'Resize columns',
    size: 1130,
    weeklyDownloads: 719000,
    license: 'MIT',
    stars: 19700,
    forks: 2400,
    usedBy: 5000,
    contributors: 192,
  },
  {
    id: 3,
    name: 'react-virtualized MultiGrid',
    missingRequirements: 'Resize columns',
    size: 1130,
    weeklyDownloads: 719000,
    license: 'MIT',
    stars: 19700,
    forks: 2400,
    usedBy: 5000,
    contributors: 192,
  },
  {
    id: 4,
    name: 'react-window FixedSizedGrid',
    missingRequirements: 'Resize columns',
    size: 865,
    weeklyDownloads: 376000,
    license: 'MIT',
    stars: 17700,
    forks: 438,
    usedBy: 5000,
    contributors: 31,
  },
  {
    id: 5,
    name: 'fixed-data-table-2',
    missingRequirements: '',
    size: 2040,
    weeklyDownloads: 27000,
    license: 'BSD-3-Clause',
    stars: 1000,
    forks: 268,
    usedBy: 816,
    contributors: 91,
  },
  {
    id: 6,
    name: 'fixed-data-grid',
    missingRequirements: '',
    size: 250,
    weeklyDownloads: 52000,
    license: 'MIT',
    stars: 4100,
    forks: 1800,
    usedBy: 3127,
    contributors: 102,
  },
];
const columns = [
  {
    key: 'name',
    name: 'Name',
    resizable: true,
    sortable: true,
    width: 150,
  },
  {
    key: 'missingRequirements',
    name: 'Missing Requirements',
    resizable: true,
    sortable: true,
    width: 200,
  },
  {
    key: 'size',
    name: 'Size (kb)',
    resizable: true,
    sortable: true,
    width: 150,
  },
  {
    key: 'weeklyDownloads',
    name: 'Weekly Downloads',
    resizable: true,
    sortable: true,
    width: 200,
  },
  {
    key: 'license',
    name: 'License',
    resizable: true,
    sortable: true,
    width: 150,
  },
  {
    key: 'stars',
    name: 'Stars',
    resizable: true,
    sortable: true,
    width: 150,
  },
  {
    key: 'forks',
    name: 'Forks',
    resizable: true,
    sortable: true,
    width: 150,
  },
  {
    key: 'usedBy',
    name: 'Used By',
    resizable: true,
    sortable: true,
    width: 150,
  },
  {
    key: 'contributors',
    name: 'Contributors',
    resizable: true,
    sortable: true,
    width: 150,
  },
];

storiesOf('Summary', module).add('Summary', () => {
  const [sortedList, setSortedList] = useState([]);
  const [[sortColumn, sortDirection], setSort] = useState<
    [string, SortDirection]
  >(['id', 'ASC']);

  useEffect(() => {
    const newSortedList = _.sortBy(rows, [sortColumn]);

    setSortedList(
      sortDirection === 'DESC' ? newSortedList.reverse() : newSortedList,
    );
  }, [rows, sortDirection, sortColumn]);

  const _sort = (columnKey: string, direction: SortDirection) => {
    setSort([columnKey, direction]);
  };

  return (
    <div>
      <ReactDataGrid
        rowKey={'id'}
        columns={columns}
        rows={sortedList}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSort={_sort}
      />
    </div>
  );
});
