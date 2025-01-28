import React, {useState } from "react";
import axios from "axios";
import "./UserForm.css";

function UserForm({ user, onClose }) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    zipcode: user?.address.zipcode || "",
    phone: user?.phone || "",
    city: user?.address.city || "",
    company: user?.company.name || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const apiCall = user
      ? axios.put(`https://jsonplaceholder.typicode.com/users/${user.id}`, formData)
      : axios.post("https://jsonplaceholder.typicode.com/users", formData);

    apiCall
      .then((response) => {
        console.log("Success:", response.data);
        setLoading(false);
        onClose();
      })
      .catch(() => {
        alert("Failed to save user. Try again.");
        setLoading(false);
      });
  };

  return (
    <>  
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
              placeholder="Enter Name"
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
              placeholder="Enter Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Zipcode:
            <input
              type="text"
              name="zipcode"
              placeholder="Enter ZipCode"
              value={formData.zipcode}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Phone:
            <input
              type="text"
              name="phone"
              placeholder="Enter Phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            City:
            <input
              type="text"
              name="city"
              placeholder="Enter City name"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Company Name:
            <input
              type="text"
              name="company"
              placeholder="Enter Compeny Name"
              value={formData.company}
              onChange={handleChange}
              required
            />
          </label>

          <div className="button-container">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      )}
    </>
  );
}

export default UserForm;
