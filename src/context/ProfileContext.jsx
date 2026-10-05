// src/context/ProfileContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getJson, postJson } from "../services/api";
import { useAuth } from "./AuthContext";

const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const { token, updateUser } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ---------------------------------------------------------
  // LOAD PROFILE
  // ---------------------------------------------------------
  const loadProfile = useCallback(async () => {
    if (!token) return;

    try {
      setLoading(true);
      setError(null);

      const data = await getJson("/profile", token);

      setProfile({
        name: data.name || "",
        email: data.email || "",
        bio: data.bio || "",
        sleep_goal: Number(data.sleep_goal) || 0,
        hydration_goal: Number(data.hydration_goal) || 0,
        meditation_goal: Number(data.meditation_goal) || 0,
        activity_goal: Number(data.activity_goal) || 0,
      });
    } catch (err) {
      setError(err.message || "Failed to load profile.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  // ---------------------------------------------------------
  // UPDATE PROFILE (returns true on success)
  // ---------------------------------------------------------
  async function updateProfile(updatedFields) {
    if (!token) return false;

    try {
      setLoading(true);
      setError(null);

      await postJson("/profile/update", updatedFields, token);

      // keep the name in the navbar in sync
      if (updatedFields.name && updatedFields.name.trim()) {
        updateUser({ name: updatedFields.name.trim() });
      }

      await loadProfile();
      return true;
    } catch (err) {
      setError(err.message || "Failed to update profile.");
      return false;
    } finally {
      setLoading(false);
    }
  }

  // ---------------------------------------------------------
  // AUTO LOAD ON LOGIN / CLEAR ON LOGOUT
  // ---------------------------------------------------------
  // Fetching data when the user logs in is a legitimate effect.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (token) {
      loadProfile();
    } else {
      setProfile(null);
      setError(null);
    }
  }, [token, loadProfile]);
  /* eslint-enable react-hooks/set-state-in-effect */

  return (
    <ProfileContext.Provider
      value={{
        profile,
        loading,
        error,
        clearError: () => setError(null),
        loadProfile,
        updateProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useProfile() {
  return useContext(ProfileContext);
}
