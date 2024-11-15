import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { getShop } from "../../Config/ShopApi";
import { lockUser, unLockUser, getAccountByUserId } from "../../Config/UserApi";

const AdminShops = () => {
  const [shops, setShops] = useState([]);
  const [accounts, setAccounts] = useState({}); // State để lưu trữ account của mỗi userId
  const [loading, setLoading] = useState(true);
  const fetchUserinfo = async () => {
    try {
      const response = await getShop();
      setShops(response);

      // Lấy account cho mỗi shop.userId và lưu vào accounts state
      const accountData = await Promise.all(
        response.map(async (shop) => {
          const acc = await getAccountByUserId(shop.userId);
          return { userId: shop.userId, lockoutEnabled: acc.lockoutEnabled };
        })
      );

      // Chuyển dữ liệu accountData thành object để dễ truy cập hơn
      const accountMap = accountData.reduce((acc, account) => {
        acc[account.userId] = account.lockoutEnabled;
        return acc;
      }, {});

      setAccounts(accountMap);
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

      // Cập nhật trạng thái lockoutEnabled trong accounts state
      setAccounts((prevAccounts) => ({
        ...prevAccounts,
        [userId]: !isCurrentlyLocked,
      }));
    } catch (error) {
      console.error("Error at toggleUserLockStatus ", error);
    }
  };

  useEffect(() => {
    fetchUserinfo();
  }, []);
  console.log("shop", shops);
  console.log("account", accounts);
  return (
    <div className="right-content">
      <div className="members-content shadow border-0 p-3 mt-4">
        <div className="member-content-header d-flex ">
          <h3 className="hd">Shop Management</h3>
        </div>
        <div className="table-response">
          <table className="table table-sm">
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
                <tr key={shop.id}>
                  <td>{shop.shopId}</td>
                  <td>{shop.shopName}</td>
                  <td>{shop.email}</td>
                  <td>{shop.phone}</td>
                  <td>{shop.rating}</td>
                  <td>
                    <Button
                      onClick={() =>
                        toggleUserLockStatus(
                          shop.userId,
                          accounts[shop.userId] // Sử dụng trạng thái từ accounts state
                        )
                      }
                    >
                      <div className="icon">
                        {accounts[shop.userId] ? <FaLock /> : <FaLockOpen />}
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
  );
};

export default AdminShops;
