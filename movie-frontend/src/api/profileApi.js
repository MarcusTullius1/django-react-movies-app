const PROFILE_BASE = "http://127.0.0.1:8000/api/profile";

// Вспомогательная функция: безопасно получить JSON из ответа
async function safeJson(res) {
  const text = await res.text();      // читаем тело один раз
  try {
    return JSON.parse(text);          // пробуем распарсить JSON
  } catch {
    return text;                      // если не JSON, возвращаем текст
  }
}

// Получить данные текущего пользователя
export default async function getMyProfile(token) {
  if (!token) throw new Error("Токен не предоставлен");

  const res = await fetch(`${PROFILE_BASE}/me/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  const data = await safeJson(res);

  if (!res.ok) {
    console.error("Ошибка API /me:", res.status, data);
    throw new Error(data.detail || "Не удалось получить профиль");
  }

  return data;
}

// Редактировать профиль пользователя
export async function updateMyProfile(token, profileData) {
  if (!token) throw new Error("Токен не предоставлен");

  const res = await fetch(`${PROFILE_BASE}/me/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),
  });

  const data = await safeJson(res);

  if (!res.ok) {
    console.error("Ошибка API /me PUT:", res.status, data);
    throw new Error(data.detail || "Не удалось обновить профиль");
  }

  return data;
}

// Получить профиль любого пользователя по ID
export async function getProfileById(id, token) {
  if (!token) throw new Error("Токен не предоставлен");

  const res = await fetch(`${PROFILE_BASE}/${id}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  const data = await safeJson(res);

  if (!res.ok) {
    console.error(`Ошибка API /${id}:`, res.status, data);
    throw new Error(data.detail || "Не удалось получить профиль пользователя");
  }

  return data;
}
