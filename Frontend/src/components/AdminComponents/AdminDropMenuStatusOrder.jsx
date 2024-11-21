import React, { useState } from "react";
import { Button, Dropdown, Space } from "antd";

const AdminDropMenuGetOrderStatus = ({ option, contextOption }) => {
  const items = [
    {
      key: "1",
      label: <a onClick={() => option("Success")}>Success</a>,
    },
    {
      key: "2",
      label: (
        <a
          onClick={() => {
            option("Fail");
          }}
        >
          Fail
        </a>
      ),
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

export default AdminDropMenuGetOrderStatus;
