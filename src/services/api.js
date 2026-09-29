// src/services/api.js

const API_URL = "http://localhost:5000/api";

/**
 * Generic GET request
 * Automatically attaches JWT if provided
 */
export async function getJson(path, token = null) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  });

  return res.json();
}

/**
 * Generic POST request
 * Automatically attaches JWT if provided
 */
export async function postJson(path, body, token = null) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: JSON.stringify(body)
  });

  return res.json();
}
