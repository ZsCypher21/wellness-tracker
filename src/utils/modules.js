// Shared metadata for each wellness module: label, route, icon and colour.
// Colours were checked for colour-blind separation and contrast, and each
// module keeps the same colour everywhere (cards, icons, charts).
export const MODULES = {
  activity: { label: "Activity", path: "/activities", icon: "activity", color: "#D9690A", unit: "mins" },
  sleep: { label: "Sleep", path: "/sleep", icon: "sleep", color: "#7B4FD8", unit: "hrs" },
  hydration: { label: "Hydration", path: "/hydration", icon: "hydration", color: "#0A8FCF", unit: "L" },
  meditation: { label: "Meditation", path: "/meditation", icon: "meditation", color: "#1E9E5A", unit: "mins" },
  appointments: { label: "Appointments", path: "/appointments", icon: "appointments", color: "#C2417A" },
};

// Round to one decimal place and drop a trailing ".0"
export function round1(n) {
  return Math.round(Number(n || 0) * 10) / 10;
}
