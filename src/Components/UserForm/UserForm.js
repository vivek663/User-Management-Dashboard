import React, { useState } from "react";
import axios from "axios";
import "./UserForm.css";

function UserForm({ user, onClose }) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    department: user?.department || "",
    phone: user?.phone || "",
    city: user?.city || "",
    company: user?.company || "",
  });

  const [loading, setLoading] = useState(false); // Track loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Show loading spinner

    const apiCall = user
      ? axios.put(`https://jsonplaceholder.typicode.com/users/${user.id}`, formData)
      : axios.post("https://jsonplaceholder.typicode.com/users", formData);

    apiCall
      .then((response) => {
        console.log("Success:", response.data);
        setLoading(false); // Hide loading spinner
        onClose();
      })
      .catch(() => {
        alert("Failed to save user. Try again.");
        setLoading(false); // Hide loading spinner
      });
  };

  return (
    <>  {/*Loading */}
      {loading && (
        <div className="loading-screen">
          <div className="spinner"></div>
          <p>Saving, please wait...</p>
        </div>
      )}

      {/* Form */}
      {!loading && (
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

          <label>
            Phone:
            <input
              type="text"
              name="phone" // Fixed casing for consistency
              value={formData.phone}
              onChange={handleChange}
            />
          </label>

          <label>
            City:
            <input
              type="text"
              name="city" // Fixed casing for consistency
              value={formData.city}
              onChange={handleChange}
            />
          </label>

          <label>
            Company Name:
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
            />
          </label>

          <div className="button-container">
            <button type="submit" className="buttonSave">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      )}
    </>
  );
}

export default UserForm;
