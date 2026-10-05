// Base URL of the backend. Accepts VITE_API_URL with or without a trailing
// "/api" (e.g. https://wellness-tracker-htx7.onrender.com or .../api).
const API_URL = (() => {
  const base = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/+$/, "");
  return base.endsWith("/api") ? base : `${base}/api`;
})();

/**
 * Shared fetch wrapper.
 * - Attaches the JWT when a token is passed
 * - Throws an Error (with the server's message) when the response isn't 2xx,
 *   so callers' try/catch blocks actually see failures
 * - On 401 with a token (expired/invalid), tells AuthContext to log out
 */
async function request(method, path, body, token) {
  let res;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    });
  } catch {
    throw new Error("Can't reach the server. It may be waking up - please try again in a moment.");
  }

  let data;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    if (res.status === 401 && token) {
      window.dispatchEvent(new Event("auth:logout"));
    }
    const err = new Error(data?.message || `Request failed (${res.status})`);
    err.status = res.status;
    throw err;
  }

  return data ?? {};
}

export function getJson(path, token = null) {
  return request("GET", path, undefined, token);
}

export function postJson(path, body, token = null) {
  return request("POST", path, body, token);
}

export function putJson(path, body, token = null) {
  return request("PUT", path, body, token);
}

export function deleteJson(path, token = null) {
  return request("DELETE", path, undefined, token);
}
