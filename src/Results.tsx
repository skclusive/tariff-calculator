import { For, createMemo } from "solid-js";
import {
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  TableFooter,
} from "@suid/material";

import { calculate } from "./Tariff";

export function Results(props: { units: string; year: string }) {
  const result = createMemo(() =>
    calculate({
      year: parseInt(props.year),
      units: parseFloat(props.units?.trim() || "0"),
    })
  );
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell align="right">From</TableCell>
          <TableCell align="right">To</TableCell>
          <TableCell align="right">Units</TableCell>
          <TableCell align="right">Rate</TableCell>
          <TableCell align="right">Amount</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <For each={result().slabs}>
          {(slab) => (
            <TableRow>
              <TableCell align="right">{slab.from + 1}</TableCell>
              <TableCell align="right">{slab.to}</TableCell>
              <TableCell align="right">{slab.to - slab.from}</TableCell>
              <TableCell align="right">{slab.rate}</TableCell>
              <TableCell align="right">{slab.amount}</TableCell>
            </TableRow>
          )}
        </For>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3} align="center">
            For Year {props.year}
          </TableCell>
          <TableCell variant="head" align="right">
            Total
          </TableCell>
          <TableCell variant="head" align="right">
            {result().amount}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
