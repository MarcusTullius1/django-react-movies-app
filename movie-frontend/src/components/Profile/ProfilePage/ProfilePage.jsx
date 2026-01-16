import React, { useEffect, useState } from "react"; 
import "./ProfilePage.css";
import ProfileCard from "../ProfileCard/ProfileCard";
import EditProfileForm from "../EditProfileForm/EditProfileForm";
import FriendList from "../FriendList/FriendList";
import UserActivity from "../UserActivity/UserActivity";
import getMyProfile from "../../../api/profileApi"; // default импорт

// Заглушки для друзей
const fetchFriends = async () => [
  { id: 1, username: "Karen", avatar: "https://i.pravatar.cc/50?img=3" },
  { id: 2, username: "John", avatar: "https://i.pravatar.cc/50?img=4" },
  { id: 3, username: "Alice", avatar: "https://i.pravatar.cc/50?img=5" },
];

const fetchActivity = async () => [
  { id: 1, action: "Добавил фильм 'Inception' в Watchlist" },
  { id: 2, action: "Поставил лайк фильму 'Matrix'" },
  { id: 3, action: "Добавил фильм 'Interstellar' в Watchlist" },
];

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [friends, setFriends] = useState([]);
  const [activity, setActivity] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const token = localStorage.getItem("access");
        if (!token) throw new Error("Пользователь не авторизован");

        const userData = await getMyProfile(token);
        const friendsData = await fetchFriends();
        const activityData = await fetchActivity();

        setUser(userData);
        setFriends(friendsData);
        setActivity(activityData);
      } catch (err) {
        console.error("Ошибка загрузки профиля:", err);
        setError(err.message);
      }
    };

    loadData();
  }, []);

  if (error) return <div className="profile-error">Ошибка: {error}</div>;
  if (!user) return <div className="profile-loading">Загрузка профиля...</div>;

  return (
    <div className="profile-page">
      <div className="profile-header">
        <ProfileCard user={user} />
        <EditProfileForm user={user} />
      </div>

      <div className="profile-main">
        <div className="profile-activity">
          <h3>Последняя активность</h3>
          <UserActivity activity={activity} />
        </div>
        <div className="profile-friends">
          <h3>Друзья</h3>
          <FriendList friends={friends} />
        </div>
      </div>
    </div>
  );
}
