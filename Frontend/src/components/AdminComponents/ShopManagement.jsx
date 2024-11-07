import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { FaPen } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
import SearchBar from "./SearchBar";
import { getShop } from "../../Config/ShopApi";
import { lockUser, unLockUser } from "../../Config/UserApi";
const AdminShops = () => {
  const [shops, setShops] = useState([]);
  const fetchUserinfo = async () => {
    //ham lay thong tin user
    try {
      const response = await getShop();
      setShops(response);
    } catch (err) {
      console.log(err);
    }
  };
  const toggleUserLockStatus = async (userId, isCurrentlyLocked) => {
    try {
      if (isCurrentlyLocked) {
        await unLockUser(userId);
      } else {
        await lockUser(userId);
      }

      // cập nhật lại trạng thái lockoutEnabled

      setShops((prevMembers) =>
        prevMembers.map((member) =>
          member.userId === userId
            ? { ...member, lockoutEnabled: !isCurrentlyLocked }
            : member
        )
      );
    } catch (error) {
      console.error("Error at toggleUserLockStatus ");
    }
  };
  useEffect(() => {
    fetchUserinfo(); //chay moi khi trang load len
  }, []);
  return (
    <>
      <div className="right-content">
        <div className="members-content shadow border-0 p-3 mt-4">
          <div className="member-content-header d-flex ">
            <h3 className="hd">Shop Management</h3>
          </div>
          <div className="table-response">
            <table className="table table-sm  ">
              <thead>
                <tr>
                  <th>Shop ID</th>
                  <th>Shop Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Rating</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {shops.map((shop) => (
                  <tr>
                    <td>{shop.shopId}</td>
                    <td>{shop.shopName}</td>
                    <td>{shop.email}</td>
                    <td>{shop.phone}</td>
                    <td>{shop.rating}</td>
                    <td>
                      <Button
                        onClick={() =>
                          toggleUserLockStatus(shop.shopId, shop.lockoutEnabled)
                        }
                      >
                        <div className="icon">
                          {shop.lockoutEnabled ? <FaLock /> : <FaLockOpen />}
                        </div>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminShops;
