import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const data = {
  monthly: [
    { name: "Jan", revenue: 1000 },
    { name: "Feb", revenue: 1200 },
    { name: "Mar", revenue: 1500 },
    { name: "Apr", revenue: 1400 },
    { name: "May", revenue: 1600 },
    { name: "Jun", revenue: 1800 },
    { name: "Jul", revenue: 1700 },
    { name: "Aug", revenue: 1900 },
    { name: "Sep", revenue: 2000 },
    { name: "Oct", revenue: 2200 },
    { name: "Nov", revenue: 2100 },
    { name: "Dec", revenue: 2300 },
  ],
  quarterly: [
    { name: "Q1", revenue: 3700 },
    { name: "Q2", revenue: 4700 },
    { name: "Q3", revenue: 5800 },
    { name: "Q4", revenue: 7200 },
  ],
  yearly: [
    { name: "2022", revenue: 21400 },
    { name: "2023", revenue: 23000 },
  ],
};

const RevenueChart = () => {
  const [dataType, setDataType] = useState("monthly"); // Default to monthly data

  return (
    <div style={{ width: `100%` }}>
      <Stack className="chartOptions" direction="row" spacing={2}>
        <Button variant="outlined" onClick={() => setDataType("monthly")}>
          Monthly
        </Button>
        <Button variant="outlined" onClick={() => setDataType("quarterly")}>
          Quarterly
        </Button>
        <Button variant="outlined" onClick={() => setDataType("yearly")}>
          Yearly
        </Button>
      </Stack>

      <ResponsiveContainer width="100%" height={500}>
        <BarChart data={data[dataType]}>
          <CartesianGrid strokeDasharray="3 2" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="revenue" fill="#9FE2BF" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
