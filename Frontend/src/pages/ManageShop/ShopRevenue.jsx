import React, { useEffect, useState } from "react";
import { MdAttachMoney, MdOutlineCardMembership } from "react-icons/md";
import { IoBagCheckOutline } from "react-icons/io5";
import DashboardBox from "../../components/AdminComponents/DashboardBox";
import ShopRevenueChart from "./ShopRevenueChart";
import {
  getCommissionFeeByShopFromOrders,
  getTotalRevenueByShopFromOrders,
  getTotalRevenueNoCommissionByShopFromOrders,
} from "../../Config/RevenueApi";
import { useAuth } from "../Login/AuthProvider";
import { getShopByUserId } from "../../Config/ShopApi";
import { Container, Nav } from "react-bootstrap";

const ShopRevenue = () => {
  const [revenue, setRevenue] = useState([0]);
  const [commissionFee, setCommissionFee] = useState([0]);
  const [totalSale, setTotalSale] = useState([0]);

  const { user } = useAuth();
  const userId = user?.userId;

  const fetchAmountRevenue = async () => {
    try {
      const shop = await getShopByUserId(userId);
      const revenue = await getTotalRevenueByShopFromOrders(shop.shopId);
      const fee = await getCommissionFeeByShopFromOrders(shop.shopId);
      const total = await getTotalRevenueNoCommissionByShopFromOrders(shop.shopId);
      setRevenue(revenue);
      setCommissionFee(fee);
      setTotalSale(total);
    } catch (error) {
      console.error("Error fetching amount Revenue:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchAmountRevenue();
  }, []);
  return (
    <Container className="p-3">
      <Nav className="nav-tabs-login" variant="tabs" defaultActiveKey="/shopRevenue">
        <Nav.Item>
          <Nav.Link eventKey="manageShop" href="/manageShop">
            Manage Shop
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="shopOrder" href="/shopOrder">
            Orders
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/shopRevenue">Revenue</Nav.Link>
        </Nav.Item>
      </Nav>
      <Container style={{ borderTop: "1px solid gray" }}>
        <div className="right-content w-100">
          <div className="row">
            <div className="col-12">
              <div className="dashboardBoxWrapper d-flex shadow border-0 mt-0">
                <DashboardBox
                  color={["#1E90FF", "#87CEFA"]}
                  icon={<MdAttachMoney />}
                  object={"Revenue"}
                  number={
                    revenue
                      ? revenue.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })
                      : 0
                  }
                />

                <DashboardBox
                  color={["#606060", "#E8E8E8"]}
                  icon={<IoBagCheckOutline />}
                  object={"Commission fee"}
                  number={
                    commissionFee
                      ? commissionFee.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })
                      : 0
                  }
                />

                <DashboardBox
                  color={["#D2691E", "#FFDEAD"]}
                  icon={<MdOutlineCardMembership />}
                  object={"Total Sale"}
                  number={
                    totalSale
                      ? totalSale.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })
                      : 0
                  }
                />
              </div>
              <div className="dashboardChart  shadow border-0  ">
                <div className="mainRevenueChart">
                  <div className="chartContainer">
                    <ShopRevenueChart />
                    <p className="chartTitle"> The Revenue from products sale</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Container>
  );
};
export default ShopRevenue;
