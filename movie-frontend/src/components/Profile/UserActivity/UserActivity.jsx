import React from "react";
import "./UserActivity.css";

export default function UserActivity({ activity }) {
  // activity — массив действий пользователя
  // пример: [{ id, type, text, created_at }]

  if (!activity || activity.length === 0) {
    return <p className="activity-empty">Активности пока нет</p>;
  }

  return (
    <div className="user-activity">
      <h3>Активность</h3>

      <ul className="activity-list">
        {activity.map((item) => (
          <li key={item.id} className="activity-item">
            <span className="activity-text">{item.text}</span>
            <span className="activity-date">
              {new Date(item.created_at).toLocaleDateString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
