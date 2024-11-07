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
import {
  getAmountRevenueCurrentYear,
  getAmountVipPackageCurrentYear,
  getAmountCommissionCurrentYear,
} from "../../Config/RevenueApi";
const AdminDashboard = () => {
  const [totalMembers, setTotalMembers] = useState([0]);
  const [totalVips, setTotalVips] = useState([0]);
  const [totalShops, setTotalShops] = useState([0]);
  const [amountRevenue, setAmountRevenue] = useState([0]);
  const [amountVipPackage, setAmountVipPackage] = useState([0]);
  const [amountCommission, setAmountCommission] = useState([0]);
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

  const fetchAmountRevenue = async () => {
    try {
      const total = await getAmountRevenueCurrentYear();
      setAmountRevenue(total);
    } catch (error) {
      console.error("Error fetching amount Revenue:", error);
      throw error;
    }
  };

  const fetchAmountVipPackage = async () => {
    try {
      const total = await getAmountVipPackageCurrentYear();
      setAmountVipPackage(total);
    } catch (error) {
      console.error("Error fetching amount Vip Package:", error);
      throw error;
    }
  };

  const fetchAmountCommission = async () => {
    try {
      const total = await getAmountCommissionCurrentYear();
      setAmountCommission(total);
    } catch (error) {
      console.error("Error fetching amount Commission fee:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchTotalMembers();
    fetchTotalShops();
    fetchTotalVips();
    fetchAmountRevenue();
    fetchAmountVipPackage();
    fetchAmountCommission();
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
                object={"Revenue-CurrentYear"}
                number={amountRevenue + " đ"}
              />
              <DashboardBox
                color={["#D2691E", "#FFDEAD"]}
                icon={<MdOutlineCardMembership />}
                object={"Registration fee-CurrentYear"}
                number={amountVipPackage + " đ"}
              />
              <DashboardBox
                color={["#606060", "#E8E8E8"]}
                icon={<IoBagCheckOutline />}
                object={"Commission fee-CurrentYear"}
                number={amountCommission + " đ"}
              />
            </div>
            <div className="dashboardChart  shadow border-0  ">
              <div className="mainRevenueChart">
                <div className="chartContainer">
                  <RevenueChart />
                  <p className="chartTitle">
                    {" "}
                    The Revenue from Vip Package and Commission fee
                  </p>
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
