import React from 'react';

import { Skeleton } from '@mui/lab';
import {
  Table as MaterialTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';

export interface IPagination {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void;
  onChangeRowsPerPage?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
}
type Datum = Record<string, string>;
type Data = Datum[];
export interface IColumn {
  key: string;
  title: string;
  render?(value: string): React.ReactNode;
}
export interface ITableProps {
  columns: IColumn[];
  data: Data; // TODO: correct
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
  isDense?: boolean;
  isLoading: boolean;
  pagination: IPagination;
  title?: string;
}

export type TInnerProps = ITableProps;

export type THeaderProps = Pick<ITableProps, 'columns'>;
export type TCreateHeaderCells = THeaderProps;

export type TBody = Pick<ITableProps, 'columns' | 'data' | 'error' | 'isLoading'>;
export type TRowsProps = Omit<TBody, 'error'>;

export type TNoDataProps = Pick<ITableProps, 'columns'>;

export const createHeaderCells = ({ columns }: TCreateHeaderCells) => {
  const width = `${(1 / columns.length) * 100}%`;

  return columns.map(({ title }, index) => (
    <TableCell key={index} width={width}>
      {title}
    </TableCell>
  ));
};
export const Header = ({ columns }: THeaderProps) => (
  <TableHead>
    <TableRow>{createHeaderCells({ columns })}</TableRow>
  </TableHead>
);

export const Rows = ({ columns, data, isLoading }: TRowsProps) => (
  <>
    {data.map((item, index) => (
      <TableRow key={index}>
        {isLoading ? (
          <TableCell>
            <Skeleton></Skeleton>
          </TableCell>
        ) : (
          columns.map((column, columnIndex) => {
            const { key, render } = column;
            const { [key]: value } = item;

            return <TableCell key={columnIndex}>{render ? render(value) : value}</TableCell>;
          })
        )}
      </TableRow>
    ))}
  </>
);

export const NoData = ({ columns }: TNoDataProps) => (
  <TableCell
    colSpan={columns.length}
    style={{
      fontWeight: 'bold',
      textAlign: 'center',
      textTransform: 'uppercase',
    }}
  >
    No data
  </TableCell>
);

export const Body = ({ columns, data, isLoading }: TBody) => (
  <TableBody>
    {data.length > 0 ? (
      <Rows columns={columns} data={data} isLoading={isLoading} />
    ) : (
      <NoData columns={columns} />
    )}
  </TableBody>
);

/**
 * Create an array of page sizes depending on how many total results will be paginated through.
 * Possible page sizes are 5, 10, 25.
 *
 * @param totalRowCount - Total number of results that will be paginated through.
 */
export const createRowsPerPageOptions = (totalRowCount: number): number[] => {
  if (totalRowCount >= 50) {
    return [5, 10, 25];
  }

  return [5, 10];
};

export const Pagination = (props: IPagination) => {
  const rowsPerPageOptions = createRowsPerPageOptions(props.count);
  const page = props.page - 1;

  return (
    <TablePagination
      rowsPerPageOptions={rowsPerPageOptions}
      {...props}
      page={page < 0 ? 0 : page}
    />
  );
};

export const Inner = ({ columns, data, error, isDense, isLoading, pagination }: ITableProps) => (
  <MaterialTable size={isDense ? 'small' : 'medium'}>
    <Header columns={columns} />
    <Body columns={columns} data={data ?? []} error={error} isLoading={isLoading} />
    <Pagination {...pagination} />
  </MaterialTable>
);

export const Table = (props: ITableProps) => (
  <TableContainer>
    <Inner {...props} />
  </TableContainer>
);
