import { createMemo, createSignal } from "solid-js";
import { Container, Grid, Stack } from "@suid/material";
import { Center } from "./Center";
import { UnitsInput } from "./UnitsInput";
import { UnitsKeys } from "./UnitsKeys";
import { Results } from "./Results";
import { Header } from "./Header";
import { Copyright } from "./Copyright";
import { calculate, tariffYears } from "./Tariff";
import { Chart } from "./Chart";

export const Main = () => {
  const [currentYear, setCurrentYear] = createSignal(tariffYears[0]);
  const [currentUnits, setCurrentUnits] = createSignal("");

  function toUnits() {
    const unit = currentUnits();
    return unit.endsWith(".") ? `${unit}0` : unit;
  }

  const result = createMemo(() =>
    calculate({
      year: currentYear(),
      units: parseFloat(toUnits() || "0"),
    })
  );

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
              <UnitsInput units={toUnits()} setUnits={setCurrentUnits} />
              <UnitsKeys units={toUnits()} setUnits={setCurrentUnits} />
              <Results units={toUnits()} year={currentYear()} />
              <Chart units={toUnits()} />
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
