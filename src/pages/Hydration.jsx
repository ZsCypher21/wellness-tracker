import TrackerPage from "../components/features/TrackerPage";
import { TRACKERS } from "../components/features/trackers";

export default function Hydration() {
  return <TrackerPage config={TRACKERS.hydration} />;
}
