import React, { useState, useEffect } from "react";
import DashboardBox from "./DashboardBox";
import { FaUser } from "react-icons/fa";
import { RiVipLine } from "react-icons/ri";
import { FaShop } from "react-icons/fa6";
import { MdAttachMoney } from "react-icons/md";
import { MdOutlineCardMembership } from "react-icons/md";
import { IoBagCheckOutline } from "react-icons/io5";
import RevenueChart from "./RevenueChart";
import {
  getTotalMembers,
  getTotalVips,
  getTotalShops,
} from "../../Config/UserApi";
const AdminDashboard = () => {
  const [totalMembers, setTotalMembers] = useState([0]);
  const [totalVips, setTotalVips] = useState([0]);
  const [totalShops, setTotalShops] = useState([0]);
  const fetchTotalMembers = async () => {
    try {
      const total = await getTotalMembers();
      setTotalMembers(total);
    } catch (error) {
      console.error("Error fetching total members:", error);
      throw error;
    }
  };

  const fetchTotalShops = async () => {
    try {
      const total = await getTotalShops();
      setTotalShops(total);
    } catch (error) {
      console.error("Error fetching total shops:", error);
      throw error;
    }
  };

  const fetchTotalVips = async () => {
    try {
      const total = await getTotalVips();
      setTotalVips(total);
    } catch (error) {
      console.error("Error fetching total vips:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchTotalMembers();
    fetchTotalShops();
    fetchTotalVips();
  }, []);
  return (
    <div>
      <div className="right-content w-100">
        <div className="row">
          <div className="col-12">
            <div className="dashboardBoxWrapper d-flex shadow border-0">
              <DashboardBox
                color={["#1da256", "#48d483"]}
                icon={<FaUser />}
                object={"Members"}
                number={totalMembers}
              />
              <DashboardBox
                color={["#B8860B", "#FFFACD"]}
                icon={<RiVipLine />}
                object={"Vip Members"}
                number={totalVips}
              />
              <DashboardBox
                color={["#00c2c2", "#98f5f5"]}
                icon={<FaShop />}
                object={"Shop"}
                number={totalShops}
              />
              <DashboardBox
                color={["#1E90FF", "#87CEFA"]}
                icon={<MdAttachMoney />}
                object={"Revenue"}
              />
              <DashboardBox
                color={["#D2691E", "#FFDEAD"]}
                icon={<MdOutlineCardMembership />}
                object={"Registration fee"}
              />
              <DashboardBox
                color={["#606060", "#E8E8E8"]}
                icon={<IoBagCheckOutline />}
                object={"Commission fee"}
              />
            </div>
            <div className="dashboardChart  shadow border-0  ">
              <div className="mainRevenueChart">
                <div className="chartContainer">
                  <RevenueChart />
                  <p className="chartTitle"> Main Revenue</p>
                </div>
              </div>
              <div className="subRevenueChart">
                <div className="chartContainer">
                  <RevenueChart />
                  <p className="chartTitle"> Sub Revenue</p>
                </div>
                <div className="chartContainer">
                  <RevenueChart />
                  <p className="chartTitle"> Sub Revenue</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;
