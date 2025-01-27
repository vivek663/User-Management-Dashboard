import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Userlist.css";

function UserList({ onAddUser, onEditUser }) {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => setUsers(response.data))
      .catch(() => setError("Failed to fetch users. Try again later."));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => setUsers(users.filter((user) => user.id !== id)))
      .catch(() => setError("Failed to delete user."));
  };
  console.log(users)

  return (
    <div>
      {error && <p className="error">{error}</p>}
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Adress</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.address.city}</td>
              <td>
                <button onClick={() => onEditUser(user)} className="actionButton">Edit</button>
                <button onClick={() => handleDelete(user.id)} className="actionButton">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={onAddUser} className="addUser">Add User</button>
    </div>
  );
}

export default UserList;
