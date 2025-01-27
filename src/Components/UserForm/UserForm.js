import React, { useState } from "react";
import axios from "axios";
import "./UserForm.css";

function UserForm({ user, onClose }) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    department: user?.department || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const apiCall = user
      ? axios.put(`https://jsonplaceholder.typicode.com/users/${user.id}`, formData)
      : axios.post("https://jsonplaceholder.typicode.com/users", formData);

    apiCall
      .then((response) => {
        console.log("Success:", response.data);
        onClose();
      })
      .catch(() => alert("Failed to save user. Try again."));
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Department:
        <input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleChange}
        />
      </label>
      <div className="button-container">
        <button type="submit" className="buttonSave">Save</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default UserForm;
