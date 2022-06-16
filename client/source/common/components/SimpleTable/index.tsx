import React, { FC } from 'react';

import { useStyles } from './styles';

export interface ITableRow {
  label: string;
  value: string | React.ReactElement;
}

interface ITableProps {
  rows: ITableRow[];
}

export const SimpleTable: FC<ITableProps> = ({ rows = [] }: ITableProps) => {
  const classes = useStyles();

  return (
    <table className={classes.table}>
      <tbody>
        {rows.map(({ label, value }, index) => (
          <tr key={index}>
            <th className={classes.header}>
              <strong>{label}</strong>
            </th>
            <td className={classes.data}>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
