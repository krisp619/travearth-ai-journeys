export type UserRole = "guest" | "user" | "admin";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

const USER_KEY = "travearth_user";

const createId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `user_${Date.now()}_${Math.random().toString(16).slice(2)}`;

const saveUser = (user: AuthUser) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  return user;
};

export const getCurrentUser = () => {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem(USER_KEY);
};

export const signup = (name: string, email: string) => {
  const user: AuthUser = {
    id: createId(),
    name,
    email,
    role: email.endsWith("@travearth.ai") ? "admin" : "user",
    createdAt: new Date().toISOString(),
  };
  return saveUser(user);
};

export const login = (email: string) => {
  const existing = getCurrentUser();
  if (existing && existing.email === email) return existing;

  const user: AuthUser = {
    id: createId(),
    name: email.split("@")[0] || "Traveler",
    email,
    role: email.endsWith("@travearth.ai") ? "admin" : "user",
    createdAt: new Date().toISOString(),
  };
  return saveUser(user);
};

export const loginWithGoogle = (email: string, name: string) => {
  const user: AuthUser = {
    id: createId(),
    name,
    email,
    role: "user",
    createdAt: new Date().toISOString(),
  };
  return saveUser(user);
};

export const loginAsGuest = () => {
  const user: AuthUser = {
    id: createId(),
    name: "Guest",
    email: "guest@travearth.ai",
    role: "guest",
    createdAt: new Date().toISOString(),
  };
  return saveUser(user);
};
