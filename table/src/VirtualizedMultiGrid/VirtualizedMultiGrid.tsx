import React, { useState, useEffect } from 'react';
import {
  MultiGrid,
  GridCellProps,
  AutoSizer,
  SortDirectionType,
  SortDirection,
} from 'react-virtualized';
import 'react-virtualized/styles.css';
import classnames from 'classnames';
import _ from 'lodash';
import { TableDataFaker, Column } from '../Faker';
import SortIcon from '../SortIcon';

type SelectionType = 'single' | 'multi';

type VirtualizedMultiGridProps = {
  rowsCount: number;
  columnsCount: number;
  selection?: SelectionType;
};

const VirtualizedMultiGrid = ({
  rowsCount: propsRowsCount,
  columnsCount: propsColumnsCount,
  selection = 'single',
}: VirtualizedMultiGridProps) => {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState<Column[]>([]);
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
    const tableData = new TableDataFaker(propsRowsCount, propsColumnsCount);

    setColumns(getColumns(tableData));
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

  const getSelectionColumn = (): Column => ({
    dataKey: 'selection',
    label: '',
    defaultWidth: 30,
  });

  const getColumns = (tableData: TableDataFaker) => {
    let newColumns = selection === 'single' ? [] : [getSelectionColumn()];

    return newColumns.concat(...tableData.columns);
  };

  const _onCellClick = (columnIndex: number, rowIndex: number) => {
    if (columns[columnIndex].editable) {
      setEditingCellPosition([rowIndex, columnIndex]);
    }

    _onRowClick(rowIndex);
  };

  const _onRowClick = (rowIndex: number) => {
    selection === 'single' && setSelectedIds([sortedList[rowIndex].id]);
  };

  const _toggleSelection = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((rowId) => rowId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const _headerCellRenderer = ({
    columnIndex,
    key,
    rowIndex,
    style,
  }: GridCellProps) => (
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

  const EditingCell = ({ columnIndex, rowIndex, style }: GridCellProps) => (
    <div
      onClick={() => _onCellClick(columnIndex, rowIndex)}
      onBlur={() => setEditingCellPosition(null)}
      style={style}
    >
      <input
        autoFocus
        defaultValue={sortedList[rowIndex][columns[columnIndex].dataKey]}
      />
    </div>
  );

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

  const _bodyCellRenderer = (props: GridCellProps) => {
    if (
      editingCellPosition &&
      props.rowIndex === editingCellPosition[0] &&
      props.columnIndex === editingCellPosition[1]
    ) {
      return <EditingCell {...props} />;
    }

    return <DisplayCell {...props} />;
  };
  // <div
  //   onClick={() => _onCellClick(columnIndex, rowIndex)}
  //   onBlur={() => setEditingCellPosition(null)}
  //   style={style}
  //   className={classnames('cell container', {
  //     selected: selectedIds.includes(sortedList[rowIndex].id),
  //   })}
  // >
  //   <span className={'cell text'}>
  //     {sortedList[rowIndex][columns[columnIndex].dataKey]}
  //   </span>
  // </div>
  // );

  const _cellRenderer = (props: GridCellProps) => {
    const isHeader = props.rowIndex === 0;
    const isSelectionColumn = selection === 'multi' && props.columnIndex === 0;

    if (isSelectionColumn) {
      if (isHeader) {
        return _selectionCellHeaderRenderer(props);
      }
      return _selectionCellRenderer(props);
    } else {
      if (isHeader) {
        return _headerCellRenderer(props);
      }

      return _bodyCellRenderer(props);
    }
  };

  const _selectionCellHeaderRenderer = ({
    columnIndex,
    key,
    rowIndex,
    style,
  }: GridCellProps) => (
    <div key={key} style={style} className={classnames('cell')}></div>
  );

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

  return (
    <AutoSizer>
      {({ height, width }) => (
        <MultiGrid
          cellRenderer={_cellRenderer}
          columnWidth={({ index }) => columns[index].defaultWidth}
          columnCount={columns.length}
          fixedRowCount={1}
          height={height}
          rowHeight={40}
          rowCount={sortedList.length}
          width={width}
        />
      )}
    </AutoSizer>
  );
};

export default VirtualizedMultiGrid;
