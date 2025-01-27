import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Userlist.css";

function UserList({ onAddUser, onEditUser }) {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Track loading state
  const [successMessage, setSuccessMessage] = useState(""); // Success message state

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => setUsers(response.data))
      .catch(() => setError("Failed to fetch users. Try again later."));
  }, []);

  const handleDelete = (id) => {
    setLoading(true);
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));
        setSuccessMessage("User successfully deleted!"); // Set success message
        setLoading(false); // Hide loader

        // Clear success message after a delay
        setTimeout(() => {
          setSuccessMessage(""); // Clear success message
        }, 3000);
      })
      .catch(() => {
        setError("Failed to delete user.");
        setLoading(false); // Hide loader
      });
  };

  return (
    <div>
      {/* Full-screen loader */}
      {loading && (
        <div className="loading-screen">
          <div className="spinner"></div>
          <p>Deleting User, please wait...</p>
        </div>
      )}

      {/* Success message */}
      {successMessage && (
        <p className="success">
          {successMessage}
        </p>
      )}

      {/* Error message */}
      {error && (
        <p className="error">
          {error}
        </p>
      )}

      {/* User table */}
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
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
                <button
                  onClick={() => onEditUser(user)}
                  className="actionButton"
                  disabled={loading} // Disable actions during loading
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="actionButton"
                  disabled={loading} // Disable actions during loading
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={onAddUser} className="addUser" disabled={loading}>
        Add User
      </button>
    </div>
  );
}

export default UserList;
