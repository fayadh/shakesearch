import { Card } from "@common/components/Card";
import { Pagination } from "@mui/material";
import React from "react";
import { useStyles } from "./styles";

export interface IParagraphResults {
  data?: any[];
  total?: number;
  isLoading?: boolean;
  page?: number;
  setPage?: (page: number) => void;
}

const getPagesCount = (total: number, rowsPerPage: number = 10) => {
  return Math.ceil(total / rowsPerPage);
};

export const ParagraphResults: React.FC<IParagraphResults> = ({
  data = [],
  total = 0,
  isLoading,
  page,
  setPage = (page: number) => {},
}) => {
  const classes = useStyles();

  if (isLoading) {
    return <div>Loading..</div>;
  }

  if (data.length === 0) {
    return <div>No Data</div>;
  }

  const cleanString = (str: string) => {
    return str && str.replace(/\[p\]/g, "");
  };

  const pages = getPagesCount(total);

  return (
    <div className={classes.root}>
      <Pagination
        count={pages}
        defaultPage={page}
        onChange={(_, page) => {
          setPage(page);
        }}
      />

      <div>Results found: {total}</div>
      {data?.map(({ _source }) => {
        return (
          <Card
            className={classes.result}
            title={
              <div>
                <span className={classes.character}>
                  {cleanString(_source.CharName)}
                </span>
                <span className={classes.in}>in</span>
                <span className={classes.work}>
                  {cleanString(_source.WorkTitle)}, Act {_source.Section} Scene{" "}
                  {_source.Chapter}
                </span>
              </div>
            }
          >
            <div className={classes.content}>
              <div className={classes.paragraphNumber}>
                {_source.ParagraphNum}
              </div>
              <div className={classes.paragraph}>
                {cleanString(_source.PlainText)}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
