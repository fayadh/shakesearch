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
    marginBottom: theme.spacing(4),
  },
}));
