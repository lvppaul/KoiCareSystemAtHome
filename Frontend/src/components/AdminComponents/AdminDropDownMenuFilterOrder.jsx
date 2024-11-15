import React, { useState } from "react";
import { Button, Dropdown, Space } from "antd";

const AdminDropMenuGetOrderByDays = ({ option }) => {
  const items = [
    {
      key: "1",
      label: <a onClick={() => option(7)}>The past 7 days</a>,
    },
    {
      key: "2",
      label: <a onClick={() => option(14)}>The past 14 days</a>,
    },
    {
      key: "3",
      label: <a onClick={() => option(30)}>The past 30 days</a>,
    },
    {
      key: "4",
      label: <a onClick={() => option(365)}>All</a>,
    },
  ];

  return (
    <Space direction="vertical">
      <Space wrap>
        <Dropdown
          menu={{
            items,
          }}
          placement="bottomLeft"
        >
          <Button>Days </Button>
        </Dropdown>
      </Space>
    </Space>
  );
};

export default AdminDropMenuGetOrderByDays;
