"use client";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export function ChartBar({ type = "bar", labels, data, dataSets, options }) {
  const canvasRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = canvasRef.current.getContext("2d");

    const datasets = dataSets
      ? dataSets
      : [
        {
          label: options?.label || "Data",
          backgroundColor: options?.backgroundColor || "#129990",
          borderColor: options?.borderColor || "#129990",
          data,
          barThickness: options?.barThickness || 30,       
          maxBarThickness: options?.maxBarThickness || 30, 
          borderRadius: options?.borderRadius || 4,        
        },
      ];


    chartInstance.current = new Chart(ctx, {
      type,
      data: {
        labels,
        datasets,
      },
      options: options || {},
    });

    return () => {
      chartInstance.current.destroy();
    };
  }, [type, labels, data, dataSets, options]);

  return <canvas ref={canvasRef} height="130"></canvas>;
}

export function ChartPie({ labels, data, options }) {
  const canvasRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = canvasRef.current.getContext("2d");

    chartInstance.current = new Chart(ctx, {
      type: "pie",
      data: {
        labels,
        datasets: [
          {
            label: options?.label || "Data",
            data,
            backgroundColor:
              options?.backgroundColor || [
                "#129990",
                "#34d399",
                "#fbbf24",
                "#6366f1",
                "#ef4444",
                "#10b981",
              ],
          },
        ],
      },
      options: options || {},
    });

    return () => {
      chartInstance.current.destroy();
    };
  }, [labels, data, options]);

  return <canvas ref={canvasRef} height="300"></canvas>;
}
