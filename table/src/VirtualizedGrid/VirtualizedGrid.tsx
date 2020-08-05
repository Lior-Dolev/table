import React, { useEffect, useState } from 'react';
import {
  Grid,
  AutoSizer,
  ScrollSync,
  SortDirectionType,
  SortDirection,
} from 'react-virtualized';
import 'react-virtualized/styles.css';
import classnames from 'classnames';
import { TableDataFaker } from '../Faker';
import scrollbarSize from 'dom-helpers/scrollbarSize';
import _ from 'lodash';
import SortIcon from '../SortIcon';

type SelectionType = 'single' | 'multi';

type VirtualizedGridProps = {
  rowsCount: number;
  columnsCount: number;
  selection?: SelectionType;
};

const VirtualizedGrid = ({
  rowsCount,
  columnsCount,
  selection = 'single',
}: VirtualizedGridProps) => {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [sortDirection, setSortDirection] = useState<SortDirectionType>(
    SortDirection.ASC,
  );
  const [sortedList, setSortedList] = useState([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [editingCellPosition, setEditingCellPosition] = useState<
    [number, number]
  >();

  useEffect(() => {
    const tableData = new TableDataFaker(rowsCount, columnsCount);

    setColumns(tableData.columns);
    setSortBy(tableData.columns[0].dataKey);
    setRows(tableData.rows);
  }, []);

  useEffect(() => {
    let newList = _.sortBy(rows, [sortBy]);

    if (sortDirection === SortDirection.DESC) {
      newList.reverse();
    }

    setSortedList(newList);
  }, [sortBy, sortDirection, rows]);

  const toggleSortDirection = () => {
    const oppositeDirection =
      sortDirection === SortDirection.ASC
        ? SortDirection.DESC
        : SortDirection.ASC;
    setSortDirection(oppositeDirection);
  };

  const _sort = (columnDataKey: string) => {
    setSortBy(columnDataKey);

    if (sortBy === columnDataKey) {
      toggleSortDirection();
    } else {
      setSortDirection(SortDirection.ASC);
    }
  };

  const _toggleSelection = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((rowId) => rowId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const _selectionCellRenderer = ({ key, rowIndex, style }) => (
    <div
      key={key}
      style={style}
      className={classnames('cell container', {
        selected: selectedIds.includes(sortedList[rowIndex].id),
      })}
    >
      <input
        type={'checkbox'}
        checked={selectedIds.includes(sortedList[rowIndex].id)}
        onChange={() => _toggleSelection(sortedList[rowIndex].id)}
      />
    </div>
  );

  const _onCellClick = (columnIndex: number, rowIndex: number) => {
    if (columns[columnIndex].editable) {
      setEditingCellPosition([rowIndex, columnIndex]);
    }

    _onRowClick(rowIndex);
  };

  const DisplayCell = ({ columnIndex, rowIndex, style }) => (
    <div
      onClick={() => _onCellClick(columnIndex, rowIndex)}
      onBlur={() => setEditingCellPosition(null)}
      style={style}
      className={classnames('cell container', {
        selected: selectedIds.includes(sortedList[rowIndex].id),
      })}
    >
      <span className={'cell text'}>
        {sortedList[rowIndex][columns[columnIndex].dataKey]}
      </span>
    </div>
  );

  const cellRenderer = ({ columnIndex, key, rowIndex, style }) => {
    if (selection === 'multi' && columnIndex === 0) {
      return _selectionCellRenderer({ key, rowIndex, style });
    }

    if (
      editingCellPosition &&
      rowIndex === editingCellPosition[0] &&
      columnIndex === editingCellPosition[1]
    ) {
      return (
        <div
          onClick={() => _onCellClick(columnIndex, rowIndex)}
          onBlur={() => setEditingCellPosition(null)}
          style={style}
          key={key}
        >
          <input
            autoFocus
            defaultValue={sortedList[rowIndex][columns[columnIndex].dataKey]}
          />
        </div>
      );
    }

    return <DisplayCell {...{ columnIndex, key, rowIndex, style }} />;
  };

  const _onRowClick = (rowIndex: number) => {
    selection === 'single' && setSelectedIds([sortedList[rowIndex].id]);
  };

  const _renderHeaderCell = ({ columnIndex, key, rowIndex, style }) => (
    <div
      onClick={() => _sort(columns[columnIndex].dataKey)}
      key={key}
      style={style}
      className={classnames('cell header')}
    >
      <span className={'cell text'}>{columns[columnIndex].label}</span>
      {columns[columnIndex].dataKey === sortBy && (
        <SortIcon isDown={sortDirection === SortDirection.ASC} />
      )}
    </div>
  );

  !editingCellPosition && console.log('no editing cell');
  editingCellPosition &&
    console.log(
      `Editing row number: ${editingCellPosition[0]}, cell: ${
        columns[editingCellPosition[1]].dataKey
      }`,
    );

  return (
    <ScrollSync>
      {({
        clientHeight,
        clientWidth,
        onScroll,
        scrollHeight,
        scrollLeft,
        scrollTop,
        scrollWidth,
      }) => {
        const x = scrollLeft / (scrollWidth - clientWidth);
        const y = scrollTop / (scrollHeight - clientHeight);

        return (
          <AutoSizer>
            {({ height, width }) => (
              <div>
                <Grid
                  className={'grid header'}
                  columnCount={
                    selection === 'single' ? columns.length : columns.length + 1
                  }
                  columnWidth={({ index }) =>
                    selection === 'multi' && index === 0 ? 30 : 200
                  }
                  height={30}
                  cellRenderer={_renderHeaderCell}
                  rowHeight={30}
                  rowCount={1}
                  scrollLeft={scrollLeft}
                  width={width - scrollbarSize()}
                  overscanColumnCount={
                    selection === 'single' ? columns.length : columns.length + 1
                  }
                />
                <Grid
                  cellRenderer={cellRenderer}
                  columnCount={
                    selection === 'single' ? columns.length : columns.length + 1
                  }
                  columnWidth={({ index }) =>
                    selection === 'multi' && index === 0 ? 30 : 200
                  }
                  height={height}
                  onScroll={onScroll}
                  rowCount={sortedList.length}
                  rowHeight={30}
                  width={width}
                  overscanColumnCount={
                    selection === 'single' ? columns.length : columns.length + 1
                  }
                />
              </div>
            )}
          </AutoSizer>
        );
      }}
    </ScrollSync>
  );
};

export default VirtualizedGrid;
