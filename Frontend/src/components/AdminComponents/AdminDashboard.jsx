import React from "react";
import DashboardBox from "./DashboardBox";
import { FaUser } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { FaShop } from "react-icons/fa6";
import { MdAttachMoney } from "react-icons/md";
import { MdOutlineCardMembership } from "react-icons/md";
import { IoBagCheckOutline } from "react-icons/io5";
const AdminDashboard = () => {
  return (
    <div>
      <div className="right-content w-100">
        <div className="row">
          <div className="col-12">
            <div className="dashboardBoxWrapper d-flex">
              <DashboardBox
                color={["#1da256", "#48d483"]}
                icon={<FaUser />}
                object={"Members"}
              />
              <DashboardBox
                color={["#00c2c2", "#98f5f5"]}
                icon={<FaShop />}
                object={"Shop"}
              />
              <DashboardBox
                color={["#B8860B", "#FFFACD"]}
                icon={<MdCategory />}
                object={"Categories"}
              />
              <DashboardBox
                color={["#1E90FF", "#87CEFA"]}
                icon={<MdAttachMoney />}
                value={"Last Month"}
                object={"Revenue"}
              />
              <DashboardBox
                color={["#D2691E", "#FFDEAD"]}
                icon={<MdOutlineCardMembership />}
                object={"Registration fee"}
                value={"Last Month"}
              />
              <DashboardBox
                color={["#606060", "#E8E8E8"]}
                icon={<IoBagCheckOutline />}
                object={"Commission fee"}
                value={"Last Month"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;
