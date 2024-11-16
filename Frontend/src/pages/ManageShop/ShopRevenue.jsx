import React, { useEffect, useState } from "react";
import { MdAttachMoney } from "react-icons/md";
import { IoBagCheckOutline } from "react-icons/io5";
import DashboardBox from "../../components/AdminComponents/DashboardBox";
import RevenueChart from "../../components/AdminComponents/RevenueChart";
import { getAmountCommissionCurrentYear, getAmountRevenueCurrentYear } from "../../Config/RevenueApi";
import { Container, Nav } from "react-bootstrap";

const ShopRevenue = () => {
  const [amountRevenue, setAmountRevenue] = useState([0]);

  const [amountCommission, setAmountCommission] = useState([0]);

  const fetchAmountRevenue = async () => {
    try {
      const total = await getAmountRevenueCurrentYear();
      setAmountRevenue(total);
    } catch (error) {
      console.error("Error fetching amount Revenue:", error);
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
    fetchAmountRevenue();
    fetchAmountCommission();
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
                  number={amountRevenue.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                />

                <DashboardBox
                  color={["#606060", "#E8E8E8"]}
                  icon={<IoBagCheckOutline />}
                  object={"Commission fee"}
                  number={amountCommission.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                />
              </div>
              <div className="dashboardChart  shadow border-0  ">
                <div className="mainRevenueChart">
                  <div className="chartContainer">
                    <RevenueChart />
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
