import React, { useState } from "react";
import UserList from "./Components/UserList/Userlist";
import UserForm from "./Components/UserForm/UserForm";
import ErrorBoundary from "./Components/ErrorBoundary/ErrorBoundary";
import "./App.css";

function App() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const handleAddUser = () => {
    setEditUser(null);
    setIsFormVisible(true);
  };

  const handleEditUser = (user) => {
    setEditUser(user);
    setIsFormVisible(true);
  };

  const handleCloseForm = () => setIsFormVisible(false);

  return (
    <ErrorBoundary>
      <div className="App">
        <h1>User Management App</h1>
        {isFormVisible ? (
          <UserForm user={editUser} onClose={handleCloseForm} />
        ) : (
          <UserList onAddUser={handleAddUser} onEditUser={handleEditUser} />
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;
