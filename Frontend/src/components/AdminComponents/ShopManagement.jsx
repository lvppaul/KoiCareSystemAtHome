import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { FaPen } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
import SearchBar from "./SearchBar";
import { getShop } from "../../Config/ShopApi";
const AdminShops = () => {
  const [isLocked, setIsLocked] = useState(false);
  const [shops, setShops] = useState([]);
  const fetchUserinfo = async () => {
    //ham lay thong tin user
    try{
      const response = await getShop();
      setShops(response);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    fetchUserinfo();//chay moi khi trang load len
  }, []);
  return (
    <>
      <div className="right-content">
        <div className="members-content card shadow border-0 p-3 mt-4">
          <div className="member-content-header d-flex ">
            <h3 className="hd">Shop Management</h3>
            <SearchBar />
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
                  <td onClick={() => setIsLocked(!isLocked)}>
                    <div className="actions">
                      {isLocked === false ? (
                        <Button>
                          <div className="icon">
                            <FaLockOpen />
                          </div>
                        </Button>
                      ) : (
                        <Button>
                          <div className="icon">
                            <FaLock />
                          </div>
                        </Button>
                      )}
                    </div>
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
