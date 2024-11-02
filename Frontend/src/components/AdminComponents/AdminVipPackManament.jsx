import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { getVipPackages, updateVipPackage } from "../../Config/VipPackageApi";
import AddVipPackage from "../VipPackage/AddVipPackage";
import UpdateVipPackage from "../VipPackage/UpdateVipPackage";
import DeleteVipPackage from "../VipPackage/DeleteVipPackage";
import { BiEdit } from 'react-icons/bi';
import { Button } from 'react-bootstrap';

const AdminVipPackManagement = () => {
  const [vipPackages, setVipPackages] = useState([]);  
  const [editingVipPack, setEditingVipPack] = useState(null); 
  const [showModalAddVipPack, setShowModalAddVipPack] = useState(false);
  const [showModalUpdateVipPack, setShowModalUpdateVipPack] = useState(false);
  console.log('select', editingVipPack);
  const formatPrice = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  // Fetch VIP packages from API
  const fetchVipPackages = async () => {
    try {
      const packages = await getVipPackages();
      setVipPackages(packages);
    } catch (error) {
      console.error("Error fetching VIP packages:", error);
    }
  };

  // Fetch data initially
  useEffect(() => {
    fetchVipPackages();
  }, []);

  // Function to handle updates in the VIP package list
  const handleUpdateVipPack = async () => {
    try {
      await fetchVipPackages();
    } catch (error) {
      console.error("Error updating vip package list:", error);
    }
  };

  return (
    <>
      <div className="right-content">
        <div className="members-content shadow border-0 p-3 mt-4 ">
          <div className="member-content-header d-flex ">
            <h3 className="hd">VIP Packages Management</h3>
            <SearchBar />
          </div>

          <div className="table-responsive">
            <AddVipPackage
              show={showModalAddVipPack}
              setShow={setShowModalAddVipPack}
              updateAddVipPack={fetchVipPackages}
            />

            <table className="table table-sm ">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Duration (Month)</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {vipPackages.map((vip) => (
                  <tr key={vip.vipId}>
                    <td>{vip.vipId}</td>
                    <td>{vip.name}</td>
                    <td>{formatPrice(vip.price)} VND</td>
                    <td>{vip.options}</td>
                    <td style={{ maxWidth: '250px', wordWrap: 'break-word' }}>{vip.description}</td>
                    <td>
                      <Button
                        style={{ backgroundColor: '#FFCC00' }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = 'orange'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#FFCC00'}
                        onClick={() => {setEditingVipPack(vip);
                          setShowModalUpdateVipPack(true);}  
                        } 
                      >
                        <BiEdit size={30} color='black' />
                      </Button>
                      <DeleteVipPackage
                        vipPack={vip}
                        updateDeleteVipPack={fetchVipPackages}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {editingVipPack && (
        <UpdateVipPackage
          show={showModalUpdateVipPack}
          setShow={setShowModalUpdateVipPack}
          vipPackData={editingVipPack} 
          fetchVipPackages={fetchVipPackages} 
        />
      )}
    </>
  );
};

export default AdminVipPackManagement;
