import { CreateUserData, UpdateUserData, User } from "./api.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

const fetcher = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json", Accept: "application/json", ...options.headers },
    mode: "cors",
    ...options,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP ${response.status}: ${errorText}`);
  }
  return response.json();
};

export const api = {
  get: <T>(endpoint: string) => fetcher<T>(endpoint),
  post: <T>(endpoint: string, data: unknown) => fetcher<T>(endpoint, { method: "POST", body: JSON.stringify(data) }),
  patch: <T>(endpoint: string, data: unknown) => fetcher<T>(endpoint, { method: "PATCH", body: JSON.stringify(data) }),
  delete: <T>(endpoint: string) => fetcher<T>(endpoint, { method: "DELETE" }),
};

export const userApi = {
  getAll: () => api.get<User[]>("/user"),
  getById: (id: string) => api.get<User>(`/user/${id}`),
  create: (data: CreateUserData) => api.post<User>("/user", data),
  update: (id: string, data: UpdateUserData) => api.patch<User>(`/user/${id}`, data),
  updateWithFormData: (id: string, formData: FormData) =>
    fetch(`${API_URL}/user/${id}`, {
      method: "PATCH",
      body: formData,
      mode: "cors",
    }).then(async (res) => {
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    }),
  delete: (id: string) => api.delete<void>(`/user/${id}`),
};

export default api;
