import { useState } from "react";
import { useActivities } from "../../context/ActivityContext";
import Tabs from "../ui/Tabs";

export default function ActivityList() {
  const { activities } = useActivities();
  const [tab, setTab] = useState("current");

  const today = new Date();

  const current = activities.filter(a => new Date(a.date) >= today);
  const history = activities.filter(a => new Date(a.date) < today);

  return (
    <div>
      <h3>Activities</h3>

      <Tabs onChange={setTab} />

      <ul className="activity-list">
        {(tab === "current" ? current : history).map((a) => (
          <li key={a.id} className="activity-item">
            <div>
              <strong>{a.type}</strong> — {a.duration} mins
              <br />
              <small>{a.date}</small>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
