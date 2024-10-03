import React from 'react'
import { Button } from 'react-bootstrap'
import './UserCard.css'
function UserCard({ user }) {
  const handleEditUser = (userId) => {
    console.log('Edit user ' + userId)
  }
  const handleDeleteUser = (userId) => {
    console.log('Delete user ' + userId)
  }
  return (
    <tbody className='user-table'>
      <tr>
        <td>{user.userId}</td>
        <td>{user.userName}</td>
        <td>{user.fullName}</td>
        <td>{user.pass}</td>
        <td>{user.phone}</td>
        <td>{user.sex}</td>
        <td>{user.email}</td>
        <td>{user.street}</td>
        <td>{user.district}</td>
        <td>{user.city}</td>
        <td>{user.country}</td>
        <td>
          {user.role === 1 ? 'Admin' : user.role === 2 ? 'Shop' : 'User'}
        </td>
        <td>{user.isActive ? 'Active' : 'Inactive'}</td>
        <Button variant="info" onClick={() => handleEditUser(user.userId)}>Edit</Button>
        <Button variant="danger" onClick={() => handleDeleteUser(user.userId)}>Delete</Button>
      </tr>
    </tbody>
  );
}

export default UserCard