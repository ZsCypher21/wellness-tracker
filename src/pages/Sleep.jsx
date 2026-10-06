import TrackerPage from "../components/features/TrackerPage";
import { TRACKERS } from "../components/features/trackers";

export default function Sleep() {
  return <TrackerPage config={TRACKERS.sleep} />;
}
