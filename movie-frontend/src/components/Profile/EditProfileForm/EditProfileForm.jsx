import { useState } from "react";
import "./EditProfileForm.css";

export default function EditProfileForm({ user, onSave }) {
  const [username, setUsername] = useState(user.username || "");
  const [email, setEmail] = useState(user.email || "");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await onSave({ username, email });
      alert("Профиль обновлён");
    } catch (err) {
      console.error(err);
      alert("Ошибка обновления профиля");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="edit-profile-form" onSubmit={handleSubmit}>
      <h3>Редактировать профиль</h3>

      <label>
        Username
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>

      <label>
        Email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>

      <button type="submit" disabled={loading}>
        {loading ? "Сохранение..." : "Сохранить"}
      </button>
    </form>
  );
}
