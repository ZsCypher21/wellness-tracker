import { useState } from "react";
import { useMeditations } from "../../context/MeditationContext";
import Tabs from "../ui/Tabs";

export default function MeditationList() {
  const { meditations } = useMeditations();
  const [tab, setTab] = useState("current");

  const today = new Date();

  const current = meditations.filter(m => new Date(m.date) >= today);
  const history = meditations.filter(m => new Date(m.date) < today);

  return (
    <div>
      <h3>Meditation</h3>

      <Tabs onChange={setTab} />

      <ul className="meditation-list">
        {(tab === "current" ? current : history).map((m) => (
          <li key={m.id} className="meditation-item">
            <div>
              <strong>{m.type}</strong> — {m.duration} mins
              <br />
              <small>{m.date}</small>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
