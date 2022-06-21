import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles((theme) => ({
  content: {
    display: "flex",
    columnGap: "10px",
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
    whiteSpace: "pre-line",
  },
  paragraphNumber: {
    color: "silver",
    whiteSpace: "pre-line",
  },
  result: {
    borderColor: "silver",
    border: "solid 1px",
    borderRadius: "4px",
  },
  root: {
    display: "flex",
    flexDirection: "column",
    rowGap: "10px",
  },
}));
