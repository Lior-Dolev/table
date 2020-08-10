import React, { useState, useEffect, useCallback } from 'react';
import ReactDataGrid, {
  Column,
  SortDirection,
  SelectColumn,
} from 'react-data-grid';
import 'react-data-grid/dist/react-data-grid.css';
import {
  TableDataFaker,
  Column as FakerColumn,
  Row as FakerRow,
} from '../Faker';
import _ from 'lodash';

type SelectionType = 'single' | 'multi';

type DataGridProps = {
  rowsCount: number;
  columnsCount: number;
  selection?: SelectionType;
};

const convertColumns = (columns: FakerColumn[] = []): Column<FakerRow>[] =>
  columns.map((col) => ({
    key: col.dataKey,
    name: col.label,
    resizable: true,
    width: col.defaultWidth,
    editable: col.editable,
    sortable: true,
  }));

const DataGrid = ({
  rowsCount,
  columnsCount,
  selection = 'single',
}: DataGridProps) => {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [[sortColumn, sortDirection], setSort] = useState<
    [string, SortDirection]
  >(['id', 'ASC']);
  const [sortedList, setSortedList] = useState([]);
  const [selectedRows, setSelectedRows] = useState<Set<string>>();

  useEffect(() => {
    const fakeData = new TableDataFaker(rowsCount, columnsCount);

    setRows(fakeData.rows);

    const convertedColumns = convertColumns(fakeData.columns);
    if (selection === 'multi') {
      setColumns([SelectColumn, ...convertedColumns]);
    } else {
      setColumns(convertedColumns);
    }
  }, []);

  useEffect(() => {
    const newSortedList = _.sortBy(rows, [sortColumn]);

    setSortedList(
      sortDirection === 'DESC' ? newSortedList.reverse() : newSortedList,
    );
  }, [rows, sortDirection, sortColumn]);

  const _sort = (columnKey: string, direction: SortDirection) => {
    setSort([columnKey, direction]);
  };

  const _onRowClick = (rowIdx: number, row: FakerRow) => {
    if (selection === 'single') {
      setSelectedRows(new Set([row.id]));
    }
  };

  return (
    <ReactDataGrid
      rowKey={'id'}
      columns={columns}
      rows={sortedList}
      selectedRows={selectedRows}
      onSelectedRowsChange={setSelectedRows}
      onRowClick={_onRowClick}
      sortColumn={sortColumn}
      sortDirection={sortDirection}
      onSort={_sort}
    />
  );
};

export default DataGrid;
