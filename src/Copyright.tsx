import { AppBar, Box, Link, Typography } from "@suid/material";

export function Copyright() {
  return (
    <AppBar position="static">
      <Box
        sx={{
          py: 0.5,
          marginTop: 1,
          marginBottom: 1,
        }}
      >
        <Typography variant="body2" align="center">
          {"Copyright "}
          {new Date().getFullYear()}
          <Link
            href="https://x.com/skclusive"
            target="_blank"
            sx={{ color: "inherit" }}
          >
            {" "}
            @skclusive
          </Link>
          {". All Rights Reserved."}
        </Typography>
      </Box>
    </AppBar>
  );
}
