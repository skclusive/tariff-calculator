import { Box, TextField } from "@suid/material";

export const UnitsInput = (props: {
  units: string;
  setUnits: (unit: string) => void;
}) => {
  return (
    <Box sx={{ px: 2 }}>
      <TextField
        autoFocus
        fullWidth
        label="UNITS"
        type="number"
        placeholder="Enter the total consumed units ..."
        value={props.units}
        onChange={(e) => props.setUnits(e.currentTarget.value)}
        inputProps={{
          style: {
            height: "50px",
            "font-size": props.units ? "22px" : undefined,
          },
        }}
      />
    </Box>
  );
};
