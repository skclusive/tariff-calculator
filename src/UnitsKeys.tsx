import { For } from "solid-js";
import { Grid, Button, Typography, Box } from "@suid/material";
import { Center } from "./Center";

export function UnitsKeys(props: {
  units: string;
  setUnits: (unit: string) => void;
}) {
  const currentUnits = () => props.units;

  const setCurrentUnits = (unit: string) => props.setUnits(unit);

  function enterUnit(unit: string) {
    if (unit === "C") {
      setCurrentUnits("");
    } else if (currentUnits() === "0" && unit === ".") {
      setCurrentUnits("0" + unit);
    } else if (currentUnits() === "0") {
      setCurrentUnits("" + unit);
    } else if (unit === "." && currentUnits().includes(".")) {
      //Nothing
    } else if (unit === "." && !currentUnits().includes(".")) {
      setCurrentUnits(currentUnits() + unit);
    } else {
      setCurrentUnits(currentUnits() + unit);
    }
  }

  return (
    <Box>
      <Grid container>
        <Grid item container direction={"row"} spacing={2}>
          <For each={[7, 8, 9, 4, 5, 6, 1, 2, 3, 0, ".", "C"]}>
            {(unit) => (
              <Grid item xs={4}>
                <Center>
                  <Button
                    color="primary"
                    onClick={() => enterUnit(unit.toString())}
                  >
                    <Typography variant="h6" sx={{ color: "inherit" }}>
                      {unit}
                    </Typography>
                  </Button>
                </Center>
              </Grid>
            )}
          </For>
        </Grid>
      </Grid>
    </Box>
  );
}
