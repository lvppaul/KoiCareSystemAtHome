import { useStat, useEffect } from "react";

const AdminOrderManagement = () => {
  return (
    <div className="right-content">
      <div className="members-content shadow border-0 p-3 mt-4">
        <div className="member-content-header d-flex ">
          <h3 className="hd">Order Management</h3>
        </div>
        <div className="table-response">
          <table className="table table-sm">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Shop Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Rating</th>
                <th>Status</th>
              </tr>
            </thead>
            {/* <tbody>
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
            </tbody> */}
          </table>
        </div>
      </div>
    </div>
  );
};
export default AdminOrderManagement;
