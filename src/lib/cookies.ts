export const getCookie = (name: string) => {
  if (typeof document === "undefined") return null;
  const prefix = `${encodeURIComponent(name)}=`;
  const parts = document.cookie.split(";");
  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed.startsWith(prefix)) {
      return decodeURIComponent(trimmed.slice(prefix.length));
    }
  }
  return null;
};

export const setCookie = (name: string, value: string, options?: { path?: string; maxAgeSeconds?: number }) => {
  if (typeof document === "undefined") return;
  const path = options?.path ?? "/";
  const maxAge = options?.maxAgeSeconds;
  const maxAgePart = typeof maxAge === "number" ? `; Max-Age=${Math.floor(maxAge)}` : "";
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; Path=${path}${maxAgePart}`;
};

export const deleteCookie = (name: string, options?: { path?: string }) => {
  setCookie(name, "", { path: options?.path ?? "/", maxAgeSeconds: 0 });
};
