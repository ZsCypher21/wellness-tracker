import { useState } from "react";
import { useSleep } from "../../context/SleepContext";
import Tabs from "../ui/Tabs";

export default function SleepList() {
  const { sleep, deleteSleep } = useSleep();
  const [tab, setTab] = useState("current");

  const today = new Date();

  const current = sleep.filter(s => new Date(s.date) >= today);
  const history = sleep.filter(s => new Date(s.date) < today);

  return (
    <div>
      <h3>Sleep</h3>

      <Tabs onChange={setTab} />

      <ul className="sleep-list">
        {(tab === "current" ? current : history).map((s) => (
          <li key={s.id} className="sleep-item">
            <div>
              <strong>{s.totalHours} hours slept</strong>
              <br />
              <small>{s.date}</small>

              {s.notes && (
                <p style={{ marginTop: "0.5rem" }}>
                  Notes: {s.notes}
                </p>
              )}
            </div>

            <button
              className="delete-btn"
              onClick={() => deleteSleep(s.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
