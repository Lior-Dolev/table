import React, { useEffect, useState, useRef } from 'react';
import {
  Grid,
  AutoSizer,
  ScrollSync,
  SortDirectionType,
  SortDirection,
} from 'react-virtualized';
import Draggable, { DraggableEvent, DraggableData } from 'react-draggable';
import 'react-virtualized/styles.css';
import classnames from 'classnames';
import { TableDataFaker } from '../Faker';
import scrollbarSize from 'dom-helpers/scrollbarSize';
import _ from 'lodash';
import SortIcon from '../SortIcon';
import DragIcon from '../DragIcon';

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
  const [columnsWidth, setColumnsWidth] = useState({});
  const headerRef = useRef<Grid>();
  const bodyRef = useRef<Grid>();

  useEffect(() => {
    const tableData = new TableDataFaker(rowsCount, columnsCount);

    setColumns(tableData.columns);
    initWidths(tableData.columns);
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

  const initWidths = (columnsArr) => {
    let initWidths = {};

    columnsArr.forEach(({ dataKey }) => {
      initWidths[dataKey] = 200;
    });

    setColumnsWidth(initWidths);
  };

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

  const cellRenderer = ({ columnIndex, key, rowIndex, style: propsStyle }) => {
    const style = {
      ...propsStyle,
      width: _columnWidth({ index: columnIndex }),
    };

    if (selection === 'multi' && columnIndex === 0) {
      return _selectionCellRenderer({ key, rowIndex, style });
    }

    const realColumnIndex =
      selection === 'multi' ? columnIndex - 1 : columnIndex;

    if (
      editingCellPosition &&
      rowIndex === editingCellPosition[0] &&
      realColumnIndex === editingCellPosition[1]
    ) {
      return (
        <div
          onClick={() => _onCellClick(realColumnIndex, rowIndex)}
          onBlur={() => setEditingCellPosition(null)}
          style={style}
          key={key}
        >
          <input
            autoFocus
            defaultValue={
              sortedList[rowIndex][columns[realColumnIndex].dataKey]
            }
          />
        </div>
      );
    }

    return (
      <DisplayCell
        {...{ columnIndex: realColumnIndex, key, rowIndex, style }}
      />
    );
  };

  const _onRowClick = (rowIndex: number) => {
    selection === 'single' && setSelectedIds([sortedList[rowIndex].id]);
  };

  const _onDrag = (
    columnIndex: number,
    e: DraggableEvent,
    data: DraggableData,
  ) => {
    const dataKey = columns[columnIndex].dataKey;
    const width = columnsWidth[dataKey];
    setColumnsWidth({ ...columnsWidth, [dataKey]: width + data.deltaX });
  };

  const _renderHeaderCell = ({
    columnIndex,
    key,
    rowIndex,
    style: propsStyle,
  }) => {
    // const style = {
    //   ...propsStyle,
    //   width: _columnWidth({ index: columnIndex }),
    //   left:
    // };
    const style = propsStyle;

    if (selection === 'multi' && columnIndex === 0) {
      return <div key={key} style={style} />;
    }

    const realColumnIndex =
      selection === 'multi' ? columnIndex - 1 : columnIndex;
    const realColumnsCount =
      selection === 'multi' ? columns.length + 1 : columns.length;
    const isLastColumn = realColumnsCount - 1 === columnIndex;

    return (
      <div key={key} style={style} className={classnames('cell header')}>
        <div onClick={() => _sort(columns[realColumnIndex].dataKey)}>
          <span className={'cell text'}>{columns[realColumnIndex].label}</span>
          {columns[realColumnIndex].dataKey === sortBy && (
            <SortIcon isDown={sortDirection === SortDirection.ASC} />
          )}
        </div>
        {!isLastColumn && (
          <Draggable
            axis={'x'}
            onDrag={(e, d) => _onDrag(realColumnIndex, e, d)}
          >
            <div className={'drag-handle'}>
              <DragIcon />
            </div>
          </Draggable>
        )}
      </div>
    );
  };

  const _columnWidth = ({ index }: { index: number }) => {
    if (selection === 'multi') {
      if (index === 0) {
        return 30;
      }

      return columnsWidth[columns[index - 1].dataKey];
    } else {
      return columnsWidth[columns[index].dataKey];
    }
  };

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
                  columnWidth={_columnWidth}
                  height={30}
                  cellRenderer={_renderHeaderCell}
                  rowHeight={30}
                  rowCount={1}
                  scrollLeft={scrollLeft}
                  width={width - scrollbarSize()}
                  // ref={headerRef}
                />
                <Grid
                  cellRenderer={cellRenderer}
                  columnCount={
                    selection === 'single' ? columns.length : columns.length + 1
                  }
                  columnWidth={_columnWidth}
                  height={height}
                  onScroll={onScroll}
                  rowCount={sortedList.length}
                  rowHeight={30}
                  width={width}
                  // ref={bodyRef}
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
