import React, { useEffect, useState } from 'react';
import {
  Column,
  Table,
  SortDirection,
  SortDirectionType,
  AutoSizer,
  defaultTableRowRenderer,
  defaultTableCellRenderer,
  TableCellProps,
} from 'react-virtualized';
import 'react-virtualized/styles.css';
import _ from 'lodash';
import classnames from 'classnames';
import { TableDataFaker } from '../Faker';

type SelectionType = 'single' | 'multi';

type VirtualizedTableProps = {
  rowsCount: number;
  columnsCount: number;
  supportHorizontalScroll?: boolean;
  selection?: SelectionType;
};

const VirtualizedTable = ({
  rowsCount,
  columnsCount,
  supportHorizontalScroll,
  selection = 'single',
}: VirtualizedTableProps) => {
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

  const _sort = ({
    sortBy: newSortBy,
    sortDirection: newSortDirection,
  }: {
    sortBy: string;
    sortDirection: SortDirectionType;
  }) => {
    setSortBy(newSortBy);
    setSortDirection(newSortDirection);
  };

  const _onRowClick = ({
    event,
    index,
    rowData,
  }: {
    event: React.MouseEvent<any>;
    index: number;
    rowData: any;
  }) => {
    selection === 'single' && setSelectedIds([rowData.id]);
  };

  const _rowRenderer = (props) =>
    defaultTableRowRenderer({
      ...props,
      className: classnames(props.className, {
        selected: selectedIds.includes(props.rowData.id),
      }),
    });

  const _toggleSelection = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((rowId) => rowId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const _selectionCellRenderer = (props: TableCellProps) => (
    <div>
      {defaultTableCellRenderer(props)}{' '}
      <input
        type={'checkbox'}
        checked={selectedIds.includes(props.rowData.id)}
        onChange={() => _toggleSelection(props.rowData.id)}
      />
    </div>
  );

  const DisplayCell = (props: TableCellProps) => (
    <div
      onClick={() =>
        columns[props.columnIndex].editable &&
        setEditingCellPosition([props.rowIndex, props.columnIndex])
      }
      onBlur={() => setEditingCellPosition(null)}
    >
      {defaultTableCellRenderer(props)}
    </div>
  );

  const _cellRenderer = (props: TableCellProps) => {
    if (
      editingCellPosition &&
      props.rowIndex === editingCellPosition[0] &&
      props.columnIndex === editingCellPosition[1]
    ) {
      return (
        <div
          onClick={() =>
            columns[props.columnIndex].editable &&
            setEditingCellPosition([props.rowIndex, props.columnIndex])
          }
          onBlur={() => setEditingCellPosition(null)}
        >
          <input autoFocus defaultValue={props.columnData} />
        </div>
      );
    }

    return <DisplayCell {...props} />;
  };

  return (
    <div
      style={{
        height: '100%',
        width: supportHorizontalScroll ? columnsCount * 160 : '100%',
      }}
    >
      <AutoSizer>
        {({ height, width }) => (
          <Table
            width={width}
            height={height}
            headerHeight={30}
            rowHeight={30}
            sort={_sort}
            sortBy={sortBy}
            sortDirection={sortDirection}
            rowCount={sortedList.length}
            rowGetter={({ index }) => sortedList[index]}
            onRowClick={_onRowClick}
            rowRenderer={_rowRenderer}
          >
            {selection === 'multi' && (
              <Column
                disableSort
                label={''}
                width={20}
                maxWidth={20}
                minWidth={20}
                dataKey={'selection'}
                cellRenderer={_selectionCellRenderer}
              />
            )}
            {columns.map(({ dataKey, label }) =>
              supportHorizontalScroll ? (
                <Column
                  key={dataKey}
                  label={label}
                  dataKey={dataKey}
                  minWidth={150}
                  width={150}
                  cellRenderer={_cellRenderer}
                />
              ) : (
                <Column
                  key={dataKey}
                  label={label}
                  dataKey={dataKey}
                  width={150}
                  cellRenderer={_cellRenderer}
                />
              ),
            )}
          </Table>
        )}
      </AutoSizer>
    </div>
  );
};

export default VirtualizedTable;
