import axios from "axios";
import React, { useState } from "react";

function ChangePassword() {
  const [oldPassword, SetOldPassword] = useState("");
  const [newPassword, SetNewPassword] = useState("");

  const ChangePassword = () => {
    axios
      .put(
        "http://localhost:3001/auth/change-password",
        { oldPassword: oldPassword, newPassword: newPassword },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        if(response.data.error) {
            alert(response.data.error)
        }
      });
  };
  return (
    <div>
      <h1>Change Your Password</h1>
      <input
        type="text"
        placeholder="Old Password"
        onChange={(e) => SetOldPassword(e.target.value)}
        value={oldPassword}
      />
      <input
        type="text"
        placeholder="New Password"
        onChange={(e) => SetNewPassword(e.target.value)}
        value={newPassword}
      />
      <button onClick={ChangePassword}>Save Cahnges</button>
    </div>
  );
}

export default ChangePassword;
