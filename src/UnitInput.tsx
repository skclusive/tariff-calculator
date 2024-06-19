import { Box, TextField } from "@suid/material";

export const UnitInput = (props: {
  unit: string;
  setUnit: (unit: string) => void;
}) => {
  return (
    <Box sx={{ px: 2 }}>
      <TextField
        autoFocus
        fullWidth
        label="UNITS"
        type="number"
        placeholder="Enter the total consumed units ..."
        value={props.unit}
        onChange={(e) => props.setUnit(e.currentTarget.value)}
        inputProps={{
          style: {
            height: "50px",
            "font-size": props.unit ? "22px" : undefined,
          },
        }}
      />
    </Box>
  );
};
