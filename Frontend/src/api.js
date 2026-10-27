const API = "/api";

async function request(path, method = "GET", body) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Token ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const first = data.error || data.detail || Object.values(data)[0];
    throw new Error((Array.isArray(first) ? first[0] : first) || "Something went wrong.");
  }
  return data;
}

export const registerUser = (name, email, password) =>
  request("/register/", "POST", { name, email, password });
export const loginUser = (email, password) =>
  request("/login/", "POST", { email, password });
export const getMe = () => request("/me/");
export const logoutUser = () => request("/logout/", "POST");