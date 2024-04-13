import { Paper, Grid, Box } from "@mui/material";
import { Square } from "./Square";

const ROWS = 3;
const COLS = 3;

export const GameBoard = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {[...Array(ROWS)].map((item, y) => {
          return [...Array(COLS)].map((item, x) => (
            <Grid item xs={4} className={`row-${y}-col-${x}`}>
              <Square />
            </Grid>
          ));
        })}
      </Grid>
    </Box>
  );
};
