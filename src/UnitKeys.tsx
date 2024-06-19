import { For } from "solid-js";
import { Grid, Button, Typography } from "@suid/material";
import { Center } from "./Center";

export function UnitKeys(props: {
  unit: string;
  setUnit: (unit: string) => void;
}) {
  const currentUnit = () => props.unit;

  const setCurrentUnit = (unit: string) => props.setUnit(unit);

  function enterUnit(unit: string) {
    if (unit === "C") {
      setCurrentUnit("");
    } else if (currentUnit() === "0" && unit === ".") {
      setCurrentUnit("0" + unit);
    } else if (currentUnit() === "0") {
      setCurrentUnit("" + unit);
    } else if (unit === "." && currentUnit().includes(".")) {
      //Nothing
    } else if (unit === "." && !currentUnit().includes(".")) {
      setCurrentUnit(currentUnit() + unit);
    } else {
      setCurrentUnit(currentUnit() + unit);
    }
  }

  return (
    <Grid container>
      <Grid item container direction={"row"} spacing={2}>
        <For each={[7, 8, 9, 4, 5, 6, 1, 2, 3, 0, ".", "C"]}>
          {(unit) => (
            <Grid item xs={4}>
              <Center>
                <Button onClick={() => enterUnit(unit.toString())}>
                  <Typography variant="h6" color={"text.secondary"}>
                    {unit}
                  </Typography>
                </Button>
              </Center>
            </Grid>
          )}
        </For>
      </Grid>
    </Grid>
  );
}
