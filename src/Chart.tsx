import { ApexChartProps, SolidApexCharts } from "solid-apexcharts";
import { SlabResult, calculate, tariffYears } from "./Tariff";
import { createEffect, createMemo } from "solid-js";
import { useTheme } from "@suid/material";

export function Chart(props: { units: string }) {
  const theme = useTheme();

  const toSummed = (slabs: SlabResult[], xaxis: number[]): number[][] => {
    let total = 0;
    const amountByTo = slabs.reduce(
      (amounts, slab) => Object.assign(amounts, { [slab.to]: slab.amount }),
      {} as { [key: string]: number }
    );
    const summed: number[][] = [];
    for (let i = 0; i < xaxis.length; i++) {
      const xaxi = xaxis[i];
      const item = amountByTo[xaxi];
      if (item !== undefined) {
        total += item;
        summed.push([xaxi, total]);
      }
    }
    return summed;
  };

  const results = createMemo(() =>
    tariffYears.map((year) =>
      calculate({
        year: parseInt(year),
        units: parseFloat(props.units?.trim() || "0"),
      })
    )
  );

  const xaxis = createMemo(() =>
    [
      ...new Set(
        results().flatMap((result) => result.slabs.map((slab) => slab.to))
      ),
    ].toSorted((a, b) => a - b)
  );

  const options = createMemo<ApexChartProps["options"]>(() => ({
    chart: {
      width: "100%",
      height: "400",
      type: "area" as const,
      toolbar: {
        tools: {
          zoom: false,
          zoomin: false,
          zoomout: false,
          download: false,
          pan: false,
          reset: false,
        },
      },
    },
    title: {
      text: "Differences over the Years",
      align: "left" as const,
      style: {
        color: theme.palette.text.primary,
      },
    },
    subtitle: {
      text: "Price Movements",
      align: "left" as const,
      style: {
        color: theme.palette.text.primary,
      },
    },
    legend: {
      labels: {
        colors: theme.palette.text.primary,
      },
    },
    dataLabels: {
      enabled: false,
      style: {
        colors: [theme.palette.text.primary],
      },
    },
    stroke: {
      curve: "smooth" as const,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.65,
        opacityTo: 0.35,
        stops: [20, 100, 100, 100],
      },
    },
    xaxis: {
      type: "numeric" as const,
      categories: xaxis(),
      labels: {
        style: {
          colors: theme.palette.text.primary,
        },
        offsetX: 0,
        formatter: (val) => `${val}`,
      },
    },
    yaxis: {
      opposite: true,
      labels: {
        style: {
          colors: theme.palette.text.primary,
        },
        offsetX: 0,
        formatter: (val) => `${val}`,
      },
    },
    tooltip: {
      enabled: false,
      //   x: {
      //     format: "dd/MM/yy HH:mm",
      //   },
    },
  }));

  const series = createMemo(() =>
    results().map((result) => {
      return {
        name: `${result.year}`,
        data: toSummed(result.slabs, xaxis()),
      };
    })
  );

  createEffect(() => {
    console.log(options());
    console.log(series());
  });

  return <SolidApexCharts type="bar" options={options()} series={series()} />;
}
