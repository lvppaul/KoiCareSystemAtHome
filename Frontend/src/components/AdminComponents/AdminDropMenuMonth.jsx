import React, { useState } from "react";
import { Button, Dropdown, Space } from "antd";

const AdminDropMenuGetOrderAtMonth = ({ option, contextOption }) => {
  const items = [
    {
      key: "1",
      label: <a onClick={() => option(1, "January")}>January</a>,
    },
    {
      key: "2",
      label: <a onClick={() => option(2, "February")}>February</a>,
    },
    {
      key: "3",
      label: <a onClick={() => option(3, "March")}>March</a>,
    },
    {
      key: "4",
      label: <a onClick={() => option(4, "April")}>April</a>,
    },
    {
      key: "5",
      label: <a onClick={() => option(5, "May")}>May</a>,
    },
    {
      key: "6",
      label: <a onClick={() => option(6, "June")}>June</a>,
    },
    {
      key: "7",
      label: <a onClick={() => option(7, "July")}>July</a>,
    },
    {
      key: "8",
      label: <a onClick={() => option(8, "August")}>August</a>,
    },
    {
      key: "9",
      label: <a onClick={() => option(9, "September")}>September</a>,
    },
    {
      key: "10",
      label: <a onClick={() => option(10, "October")}>October</a>,
    },
    {
      key: "11",
      label: <a onClick={() => option(11, "November")}>November</a>,
    },
    {
      key: "12",
      label: <a onClick={() => option(12, "December")}>December</a>,
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
          <Button>{contextOption} </Button>
        </Dropdown>
      </Space>
    </Space>
  );
};

export default AdminDropMenuGetOrderAtMonth;
