import React, { useState, useEffect } from 'react';
import { Table, Column, Cell } from 'fixed-data-table-2';
import { AutoSizer } from 'react-virtualized';
import 'fixed-data-table-2/dist/fixed-data-table.css';
import classnames from 'classnames';
import _ from 'lodash';
import { TableDataFaker } from '../Faker';
import SortIcon from '../SortIcon';

enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

type SortDirectionType = SortDirection.ASC | SortDirection.DESC;

const reverseSortDirection = (sortDirection: SortDirectionType) =>
  sortDirection === SortDirection.DESC ? SortDirection.ASC : SortDirection.DESC;

type Selection = 'single' | 'multi';

type FixedDataTableProps = {
  rowsCount: number;
  columnsCount: number;
  selection?: Selection;
};

const FixedDataTable = ({
  rowsCount,
  columnsCount,
  selection = 'single',
}: FixedDataTableProps) => {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [columnWidths, setColumnWidths] = useState({});
  const [highlightedRowIds, setHighlightedRowIds] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [sortDirection, setSortDirection] = useState<SortDirectionType>(
    SortDirection.ASC,
  );
  const [sortedList, setSortedList] = useState([]);

  useEffect(() => {
    const fakeData = new TableDataFaker(rowsCount, columnsCount);

    setRows(fakeData.rows);
    setColumns(fakeData.columns);
    setSortBy(fakeData.columns[0].dataKey);

    let initWidths = {};

    fakeData.columns.forEach(({ dataKey, defaultWidth }) => {
      initWidths[dataKey] = defaultWidth;
    });

    setColumnWidths(initWidths);
  }, []);

  useEffect(() => {
    let newList = _.sortBy(rows, [sortBy]);

    if (sortDirection === SortDirection.DESC) {
      newList.reverse();
    }

    setSortedList(newList);
  }, [sortBy, sortDirection]);

  const _onColumnResizeEndCallback = (
    newColumnWidth: number,
    columnKey: string,
  ) => {
    setColumnWidths({
      ...columnWidths,
      [columnKey]: newColumnWidth,
    });
  };

  const _onRowClick = (
    event: React.SyntheticEvent<Table>,
    rowIndex: number,
  ) => {
    if (selection === 'single') {
      setHighlightedRowIds([rowIndex]);
    }
  };

  const SelectionHeaderCell = () => (
    <Cell>
      <input type={'checkbox'} />
    </Cell>
  );

  const toggleSelection = (rowIndex) => {
    if (highlightedRowIds.includes(rowIndex)) {
      setHighlightedRowIds(
        highlightedRowIds.filter((rowId) => rowId !== rowIndex),
      );
    } else {
      setHighlightedRowIds([...highlightedRowIds, rowIndex]);
    }
  };

  const SelectionCell = ({ rowIndex }) => (
    <Cell>
      <input
        type={'checkbox'}
        checked={highlightedRowIds.includes(rowIndex)}
        onChange={() => toggleSelection(rowIndex)}
      />
    </Cell>
  );

  const _sort = (columnDataKey: string) => {
    const newSortDirection =
      sortBy === columnDataKey
        ? reverseSortDirection(sortDirection)
        : SortDirection.ASC;

    setSortDirection(newSortDirection);
    setSortBy(columnDataKey);
  };

  return (
    <AutoSizer>
      {({ height, width }) => (
        <Table
          rowHeight={30}
          rowsCount={sortedList.length}
          width={width}
          height={height}
          headerHeight={50}
          onColumnResizeEndCallback={_onColumnResizeEndCallback}
          isColumnResizing={false}
          touchScrollEnabled={true}
          onRowClick={_onRowClick}
        >
          {selection === 'multi' && (
            <Column
              header={<SelectionHeaderCell />}
              cell={({ rowIndex, ...props }) => (
                <SelectionCell rowIndex={rowIndex} />
              )}
              width={40}
            />
          )}
          {columns.map(({ label, dataKey }) => (
            <Column
              header={
                <Cell onClick={() => _sort(dataKey)}>
                  {label}
                  {dataKey === sortBy && (
                    <SortIcon isDown={sortDirection === SortDirection.ASC} />
                  )}
                </Cell>
              }
              cell={({ rowIndex, ...props }) => (
                <Cell
                  {...props}
                  className={classnames('cell', {
                    selected: highlightedRowIds.includes(rowIndex),
                  })}
                >
                  {sortedList[rowIndex][dataKey]}
                </Cell>
              )}
              width={columnWidths[dataKey]}
              columnKey={dataKey}
              isResizable={true}
            />
          ))}
        </Table>
      )}
    </AutoSizer>
  );
};

export default FixedDataTable;
