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
    //... data for all months
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
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="revenue" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
