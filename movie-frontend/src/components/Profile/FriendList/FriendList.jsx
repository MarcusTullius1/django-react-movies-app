import React from "react";
import "./FriendList.css";

export default function FriendList({ friends }) {
  // friends — массив пользователей
  // [{ id, username, avatar }]

  if (!friends || friends.length === 0) {
    return <p className="friends-empty">Друзей пока нет</p>;
  }

  return (
    <div className="friend-list">
      <h3>Друзья</h3>

      <ul>
        {friends.map((friend) => (
          <li key={friend.id} className="friend-item">
            <img
              src={friend.avatar || "https://via.placeholder.com/40"}
              alt={friend.username}
              className="friend-avatar"
            />
            <span className="friend-name">{friend.username}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
