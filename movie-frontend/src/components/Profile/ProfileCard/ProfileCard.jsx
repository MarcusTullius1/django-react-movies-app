import React from "react";
import "./ProfileCard.css";

export default function ProfileCard({ user }) {

  return (
    <div className="profile-card">
      <div className="profile-avatar">
        <img
          src={user?.avatar || "https://via.placeholder.com/100"}
          alt={user?.username}
        />
      </div>
      <div className="profile-info">
        <h2>{user?.username || "Username"}</h2>
        <p>{user?.email || "user@example.com"}</p>
      </div>
    </div>
  );
}
