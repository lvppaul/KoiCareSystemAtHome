import React from "react";

import { GrStatusUnknown } from "react-icons/gr";
const DashboardBox = (props) => {
  const colors = props.color || ["#cccccc", "#ffffff"];
  const icons = props.icon || <GrStatusUnknown />;
  const values = props.value || "";
  const objects = props.object || "";
  const numbers = props.number || 0;
  return (
    <div
      className="dashboardBox"
      style={{
        backgroundImage: `linear-gradient(to right, ${colors[0]} ,${colors[1]})`,
      }}
    >
      <div className="d-flex w-100 box-content">
        <div className="col1">
          <h4 className="text-white">{objects}</h4>
          <span className="text-white">{numbers}</span>
        </div>

        <div style={{ marginLeft: "auto" }}>
          <span className="icon">{icons}</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardBox;
