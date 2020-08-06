import React, { useState, useRef, useEffect } from 'react';
import { VariableSizeGrid, GridChildComponentProps } from 'react-window';
import { AutoSizer, SortDirectionType, SortDirection } from 'react-virtualized';
import _ from 'lodash';
import SortIcon from '../SortIcon';
import classnames from 'classnames';
import { TableDataFaker, Column } from '../Faker';
import scrollbarSize from 'dom-helpers/scrollbarSize';

type SelectionType = 'single' | 'multi';

type WindowVariableSizeGridProps = {
  rowsCount: number;
  columnsCount: number;
  selection?: SelectionType;
};

const WindowVariableSizeGrid = ({
  rowsCount: propsRowsCount,
  columnsCount: propsColumnsCount,
  selection = 'single',
}: WindowVariableSizeGridProps) => {
  const headerGrid = useRef<VariableSizeGrid>();
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
    const tableData = new TableDataFaker(propsRowsCount, propsColumnsCount);

    setColumns(getColumns(tableData));
    setSortBy(tableData.columns[0].dataKey);
    setRows(tableData.rows);
  }, []);

  const getSelectionColumn = (): Column => ({
    dataKey: 'selection',
    label: '',
    defaultWidth: 30,
  });

  const getColumns = (tableData: TableDataFaker) => {
    let newColumns = selection === 'single' ? [] : [getSelectionColumn()];

    return newColumns.concat(...tableData.columns);
  };

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

  const _selectionCellRenderer = ({
    rowIndex,
    style,
  }: GridChildComponentProps) => (
    <div
      // key={key}
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

  const DisplayCell = ({
    columnIndex,
    rowIndex,
    style,
  }: GridChildComponentProps) => (
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

  const Cell = ({
    columnIndex,
    rowIndex,
    style,
    data,
  }: GridChildComponentProps) => {
    if (selection === 'multi' && columnIndex === 0) {
      return _selectionCellRenderer({ columnIndex, rowIndex, style, data });
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
          // key={key}
        >
          <input
            autoFocus
            defaultValue={sortedList[rowIndex][columns[columnIndex].dataKey]}
          />
        </div>
      );
    }

    return <DisplayCell {...{ columnIndex, rowIndex, style, data }} />;
  };

  const _onRowClick = (rowIndex: number) => {
    selection === 'single' && setSelectedIds([sortedList[rowIndex].id]);
  };

  const HeaderCell = ({
    columnIndex,
    rowIndex,
    style,
  }: GridChildComponentProps) => (
    <div
      onClick={() => _sort(columns[columnIndex].dataKey)}
      // key={key}
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
    <AutoSizer>
      {({ height, width }) => (
        <div>
          <VariableSizeGrid
            columnCount={columns.length}
            columnWidth={(index) =>
              selection === 'multi' && index === 0 ? 30 : 200
            }
            height={35}
            rowCount={1}
            rowHeight={(index) => 35}
            width={width - scrollbarSize()}
            ref={headerGrid}
            className={'grid header'}
          >
            {HeaderCell}
          </VariableSizeGrid>
          <VariableSizeGrid
            columnCount={columns.length}
            columnWidth={(index) =>
              selection === 'multi' && index === 0 ? 30 : 200
            }
            height={height}
            rowCount={sortedList.length}
            rowHeight={(index) => 35}
            width={width}
            onScroll={({ scrollLeft, scrollTop }) =>
              headerGrid.current.scrollTo({ scrollLeft, scrollTop })
            }
          >
            {Cell}
          </VariableSizeGrid>
        </div>
      )}
    </AutoSizer>
  );
};

export default WindowVariableSizeGrid;
