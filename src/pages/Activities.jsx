import TrackerPage from "../components/features/TrackerPage";
import { TRACKERS } from "../components/features/trackers";

export default function Activities() {
  return <TrackerPage config={TRACKERS.activity} />;
}
