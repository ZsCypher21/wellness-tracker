import activities from '../mock/activities.json';
import sleep from '../mock/sleep.json';
import meditation from '../mock/meditation.json';
import hydration from '../mock/hydration.json';
import appointments from '../mock/appointments.json';

export function simulateAsync(data) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), 300);
  });
}

export const api = {
  getActivities: () => simulateAsync(activities),
  getSleep: () => simulateAsync(sleep),
  getMeditation: () => simulateAsync(meditation),
  getHydration: () => simulateAsync(hydration),
  getAppointments: () => simulateAsync(appointments)
};
