// src/context/ProfileContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { getJson, postJson } from "../services/api";
import { useAuth } from "./AuthContext";

const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const { token, user } = useAuth(); // user contains id + email from login
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  // ----------------------------
  // LOAD PROFILE (GET /api/profile)
  // ----------------------------
  async function loadProfile() {
    if (!token) return;

    setLoading(true);
    const data = await getJson("/profile", token);

    setProfile({
      name: data.name || "",
      email: data.email || "",
      bio: data.bio || "",
      sleep_goal: data.sleep_goal || 0,
      hydration_goal: data.hydration_goal || 0,
      meditation_goal: data.meditation_goal || 0,
      activity_goal: data.activity_goal || 0,
    });

    setLoading(false);
  }

  // ----------------------------
  // UPDATE PROFILE (POST /api/profile/update)
  // ----------------------------
  async function updateProfile(updatedFields) {
    if (!token) return;

    await postJson("/profile/update", updatedFields, token);

    // Refresh profile after update
    await loadProfile();
  }

  // Load profile on login
  useEffect(() => {
    if (token) loadProfile();
  }, [token]);

  return (
    <ProfileContext.Provider
      value={{
        profile,
        loading,
        loadProfile,
        updateProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(ProfileContext);
}
