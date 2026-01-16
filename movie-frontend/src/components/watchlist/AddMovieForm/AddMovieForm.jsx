import { useState } from "react";
import "./AddMovieForm.css";

export default function AddMovieForm({ onAdd }) {
  const [title, setTitle] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title);
    setTitle("");
  }

  return (
    <form className="add-movie-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Название фильма"
      />
      <button type="submit">Добавить</button>
    </form>
  );
}
