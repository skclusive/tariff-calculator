import { AppBar, Box, Typography } from "@suid/material";

export function Copyright() {
  return (
    <AppBar position="static">
      <Box
        sx={{
          py: 0.5,
          bottom: 0,
          marginTop: 1,
          marginBottom: 1,
        }}
      >
        <Typography variant="body2" align="center">
          {"Copyright "}
          {new Date().getFullYear()}
          {" @skclusive. All Rights Reserved."}
        </Typography>
      </Box>
    </AppBar>
  );
}
