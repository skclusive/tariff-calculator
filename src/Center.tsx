import { Box } from "@suid/material";
import BoxProps from "@suid/material/Box/BoxProps";

export function Center(props: BoxProps) {
  return (
    <Box
      {...props}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        ...props.sx,
      }}
    >
      {props.children}
    </Box>
  );
}
