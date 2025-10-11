// Lightweight HTTP client using fetch with refresh-token retry
// Consumes the backend at http://localhost:3000 (configurable via VITE_API_BASE_URL)

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const ACCESS_TOKEN_KEY = "accessToken";

export function setAccessToken(token: string | null) {
  if (token) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  } else {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }
}

export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

function isAuthEndpoint(url: string) {
  return (
    url.includes("/api/auth/login") ||
    url.includes("/api/auth/register") ||
    url.includes("/api/auth/refresh") ||
    url.includes("/api/auth/logout")
  );
}

async function refreshAccessToken(): Promise<string | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) return null;
    const data = await res.json();
    const newToken = data?.data?.accessToken || data?.accessToken;
    if (newToken) setAccessToken(newToken);
    return newToken ?? null;
  } catch {
    return null;
  }
}

export type RequestOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
  signal?: AbortSignal;
  // internal
  _retry?: boolean;
};

async function request<T = any>(path: string, options: RequestOptions = {}): Promise<T> {
  const url = path.startsWith("http") ? path : `${API_BASE_URL}${path}`;
  const token = getAccessToken();
  const isAuth = isAuthEndpoint(path);

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  if (token && !isAuth) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(url, {
    method: options.method || "GET",
    credentials: "include",
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
    signal: options.signal,
  });

  // If unauthorized, attempt refresh once (unless the request itself is refresh)
  if (res.status === 401 && !options._retry && !path.includes("/api/auth/refresh")) {
    const newToken = await refreshAccessToken();
    if (newToken) {
      return request<T>(path, { ...options, _retry: true });
    } else {
      setAccessToken(null);
      // Let caller handle redirect UX
      throw new Error("Sessão expirada. Faça login novamente.");
    }
  }

  let data: any = null;
  const text = await res.text();
  try { data = text ? JSON.parse(text) : null; } catch { data = text as any; }

  if (!res.ok) {
    const message = data?.message || data?.error || `Erro na requisição (${res.status})`;
    const err: any = new Error(message);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data as T;
}

export const api = {
  get: <T = any>(path: string, options?: Omit<RequestOptions, "method" | "body">) =>
    request<T>(path, { ...(options || {}), method: "GET" }),
  post: <T = any>(path: string, body?: any, options?: Omit<RequestOptions, "method">) =>
    request<T>(path, { ...(options || {}), method: "POST", body }),
  put: <T = any>(path: string, body?: any, options?: Omit<RequestOptions, "method">) =>
    request<T>(path, { ...(options || {}), method: "PUT", body }),
  patch: <T = any>(path: string, body?: any, options?: Omit<RequestOptions, "method">) =>
    request<T>(path, { ...(options || {}), method: "PATCH", body }),
  delete: <T = any>(path: string, options?: Omit<RequestOptions, "method" | "body">) =>
    request<T>(path, { ...(options || {}), method: "DELETE" }),
};

export default api;
