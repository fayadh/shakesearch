import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    rowGap: "10px",
    flexDirection: "column",
  },
  result: {
    borderColor: "silver",
    border: "solid 1px",
    borderRadius: "4px",
    padding: theme.spacing(1),
  },
  context: {
    padding: `0 ${theme.spacing(1)}`,
  },
  character: {
    color: "brown",
  },
  in: {
    margin: "4px",
  },
  work: {
    color: "rosybrown",
  },
  paragraph: {
    padding: theme.spacing(1),
    whiteSpace: "pre-line",
  },
}));
