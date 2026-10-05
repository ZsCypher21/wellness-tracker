// src/context/ProfileContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { getJson, postJson } from "../services/api";
import { useAuth } from "./AuthContext";

const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const { token, user } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ---------------------------------------------------------
  // LOAD PROFILE
  // ---------------------------------------------------------
  async function loadProfile() {
    if (!token) return;

    try {
      setLoading(true);
      setError(null);

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
    } catch (err) {
      setError(err.message || "Failed to load profile.");
    } finally {
      setLoading(false);
    }
  }

  // ---------------------------------------------------------
  // UPDATE PROFILE
  // ---------------------------------------------------------
  async function updateProfile(updatedFields) {
    if (!token) return;

    try {
      setLoading(true);
      setError(null);

      await postJson("/profile/update", updatedFields, token);

      await loadProfile();
    } catch (err) {
      setError(err.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  }

  // ---------------------------------------------------------
  // AUTO LOAD PROFILE ON LOGIN
  // ---------------------------------------------------------
  useEffect(() => {
    if (token) loadProfile();
  }, [token]);

  return (
    <ProfileContext.Provider
      value={{
        profile,
        loading,
        error,
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
