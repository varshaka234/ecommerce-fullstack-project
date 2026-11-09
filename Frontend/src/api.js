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

export const getCart = () => request("/cart/");
export const saveCart = (items) => request("/cart/", "PUT", items);
export const getOrders = () => request("/orders/");
export const createOrder = (details) => request("/orders/", "POST", details);
// Admin product management
export const getAdminProducts = () =>
  request("/admin/products/");

export const addProduct = (product) =>
  request("/admin/products/", "POST", product);

export const updateProduct = (id, product) =>
  request(`/admin/products/${id}/`, "PUT", product);

export const deleteProduct = (id) =>
  request(`/admin/products/${id}/`, "DELETE");

export const getAdminOrders = () =>
  request("/admin/orders/");

export const updateAdminOrderStatus = (id, status) =>
  request(`/admin/orders/${id}/status/`, "PATCH", { status });