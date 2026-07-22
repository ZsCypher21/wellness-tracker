import { useState } from "react";
import { useHydration } from "../../context/HydrationContext";
import Tabs from "../ui/Tabs";

export default function HydrationList() {
  const { hydration, deleteHydration } = useHydration();
  const [tab, setTab] = useState("current");

  const today = new Date();

  const current = hydration.filter(h => new Date(h.date) >= today);
  const history = hydration.filter(h => new Date(h.date) < today);

  return (
    <div>
      <h3>Hydration</h3>

      <Tabs onChange={setTab} />

      <ul className="hydration-list">
        {(tab === "current" ? current : history).map((h) => (
          <li key={h.id} className="hydration-item">
            <div>
              <strong>{h.liters} L consumed</strong>
              <br />
              <small>{h.date}</small>
              {h.notes && (
                <p style={{ marginTop: "0.5rem" }}>
                  Notes: {h.notes}
                </p>
              )}
            </div>

            <button
              className="delete-btn"
              onClick={() => deleteHydration(h.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
