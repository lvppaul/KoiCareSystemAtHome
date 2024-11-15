import React from "react";
import { Button, Dropdown, Space } from "antd";
const items = [
  {
    key: "1",
    label: <a target="_blank"> the past days</a>,
  },
  {
    key: "2",
    label: <a target="_blank">the past week</a>,
  },
  {
    key: "3",
    label: <a target="_blank">the past month</a>,
  },
];
const AdminDropMenuGetOrderByDayWeekMonth = () => (
  <Space direction="vertical">
    <Space wrap>
      <Dropdown
        menu={{
          items,
        }}
        placement="bottomLeft"
      >
        <Button>bottomLeft</Button>
      </Dropdown>
    </Space>
  </Space>
);
export default AdminDropMenuGetOrderByDayWeekMonth;
