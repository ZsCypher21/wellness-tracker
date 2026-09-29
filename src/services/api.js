<<<<<<< HEAD
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
=======
/**
 * Centralized mock API layer for the Wellness Tracker app.
 *
 * Purpose:
 * - Simulates asynchronous API calls using local JSON files.
 * - Provides a consistent interface for fetching mock data.
 * - Allows components and context providers to behave as if
 *   they are communicating with a real backend service.
 *
 * This abstraction makes the app easier to scale later if
 * real API endpoints are introduced.
 */

// Import mock JSON datasets for each wellness module
import activities from '../mock/activities.json';
import sleep from '../mock/sleep.json';
import meditation from '../mock/meditation.json';
import hydration from '../mock/hydration.json';
import appointments from '../mock/appointments.json';

/**
 * simulateAsync()
 * ---------------------------------------------------------
 * Utility function that wraps data in a Promise and resolves
 * it after a short delay. This mimics real network latency.
 *
 * @param {any} data - The mock data to return
 * @returns {Promise<any>} - Resolves with the provided data
 */
export function simulateAsync(data) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), 300); // 300ms artificial delay
  });
}

/**
 * api
 * ---------------------------------------------------------
 * Collection of mock API endpoints.
 *
 * Each function returns a Promise that resolves with the
 * corresponding JSON dataset. This structure mirrors how
 * real API services are typically organized.
 *
 * Example usage:
 *   const items = await api.getActivities();
 */
export const api = {
  getActivities: () => simulateAsync(activities),
  getSleep: () => simulateAsync(sleep),
  getMeditation: () => simulateAsync(meditation),
  getHydration: () => simulateAsync(hydration),
  getAppointments: () => simulateAsync(appointments)
};
>>>>>>> c2d5a7186b0cd3d7657a3ffe8873d7665b9f319d
