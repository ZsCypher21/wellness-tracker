import TrackerPage from "../components/features/TrackerPage";
import { TRACKERS } from "../components/features/trackers";

export default function Meditation() {
  return <TrackerPage config={TRACKERS.meditation} />;
}
