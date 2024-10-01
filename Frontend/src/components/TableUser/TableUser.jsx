import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import api from '../../API/AxiosConfig';
import UserCard from '../UserCard/UserCard';

const TableUser = () => {
  const [users, setUsers] = useState([]);
  const fetchUserinfo = async () => {
    //ham lay thong tin user
    try{
      const response = await api.get("user");
      setUsers(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchUserinfo();//chay moi khi trang load len
  }, []);

  return (
    <>
    <div>
      <h1>Table User</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User ID</th>
            <th>User Name</th>
            <th>Full Name</th>
            <th>Password</th>
            <th>Phone</th>
            <th>Sex</th>
            <th>Email</th>
            <th>Street</th>
            <th>District</th>
            <th>City</th>
            <th>Country</th>
            <th>Role</th>
            <th>isActive</th>
          </tr>
        </thead>
          {users.map((users) => (
            <UserCard user={users}/>
          ))}
      </Table>
    </div>
    </>
  )
}

export default TableUser