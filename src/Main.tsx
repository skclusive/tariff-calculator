import { createSignal } from "solid-js";
import { Container, Grid, Stack } from "@suid/material";
import { Center } from "./Center";
import { UnitInput } from "./UnitInput";
import { UnitKeys } from "./UnitKeys";
import { Results } from "./Results";
import { Header } from "./Header";
import { Copyright } from "./Copyright";

export const Main = () => {
  const [currentYear, setCurrentYear] = createSignal("2024");
  const [currentUnit, setCurrentUnit] = createSignal("");

  function toUnit() {
    const unit = currentUnit();
    return unit.endsWith(".") ? `${unit}0` : unit;
  }

  return (
    <Grid
      container
      direction="column"
      wrap="nowrap"
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        width: "100%",
        height: "100%",
      }}
    >
      <Grid item>
        <Container maxWidth={"sm"} sx={{ px: 0 }}>
          <Header year={currentYear()} setYear={setCurrentYear} />
        </Container>
      </Grid>
      <Grid
        item
        sx={{
          display: "flex",
          flexGrow: 1,
          width: "100%",
          height: "100%",
          overflow: "auto",
        }}
      >
        <Container maxWidth={"sm"}>
          <Center sx={{ py: 2 }}>
            <Stack spacing={2}>
              <UnitInput unit={toUnit()} setUnit={setCurrentUnit} />
              <UnitKeys unit={toUnit()} setUnit={setCurrentUnit} />
              <Results year={currentYear()} unit={toUnit()} />
            </Stack>
          </Center>
        </Container>
      </Grid>
      <Grid item>
        <Container maxWidth={"sm"} sx={{ px: 0 }}>
          <Copyright />
        </Container>
      </Grid>
    </Grid>
  );
};
