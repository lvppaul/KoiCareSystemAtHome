import React, { useEffect, useState } from "react";
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
import { getDataRevenue } from "../../Config/RevenueApi";
import dayjs from "dayjs";

const RevenueChart = () => {
  const [dataType, setDataType] = useState("monthly"); // Default to monthly data
  const [revenue, setRevenue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatData = (data) => {
    const groupedData = {};

    data.forEach((item) => {
      // Xác định key nhóm theo dataType
      const key =
        dataType === "monthly"
          ? dayjs(item.createAt).format("MM/YYYY")
          : dataType === "quarterly"
          ? `Q${Math.ceil((dayjs(item.createAt).month() + 1) / 3)}-${dayjs(
              item.createAt
            ).year()}`
          : dayjs(item.createAt).format("YYYY");

      // Tính tổng revenue cho mỗi nhóm
      if (!groupedData[key]) {
        groupedData[key] = { date: key, revenue: 0 };
      }
      groupedData[key].revenue += item.income;
    });

    // Tạo các khoảng thời gian cho từng loại dữ liệu
    const year = dayjs().year();
    let filledData = [];

    if (dataType === "monthly") {
      filledData = Array.from({ length: 12 }, (_, i) => {
        const month = (i + 1).toString().padStart(2, "0");
        const dateKey = `${month}/${year}`;
        return {
          date: dateKey,
          revenue: groupedData[dateKey]?.revenue || 0,
        };
      });
    } else if (dataType === "quarterly") {
      filledData = Array.from({ length: 4 }, (_, i) => {
        const quarter = `Q${i + 1}-${year}`;
        return {
          date: quarter,
          revenue: groupedData[quarter]?.revenue || 0,
        };
      });
    } else if (dataType === "yearly") {
      // Giả định là hiển thị dữ liệu trong 5 năm gần nhất
      filledData = Array.from({ length: 5 }, (_, i) => {
        const pastYear = year - (4 - i);
        return {
          date: pastYear.toString(),
          revenue: groupedData[pastYear]?.revenue || 0,
        };
      });
    }

    return filledData;
  };

  const fetchRevenue = async () => {
    try {
      const response = await getDataRevenue();
      setRevenue(formatData(response));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRevenue();
  }, [dataType]); // refetch data when dataType changes

  if (loading) return <p>Loading ...</p>;
  if (error != null) return <p>Error: {error}</p>;

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
        <BarChart data={revenue}>
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="revenue" fill="#9FE2BF" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
