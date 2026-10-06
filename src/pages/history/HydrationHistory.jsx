import TrackerPage from "../../components/features/TrackerPage";
import { TRACKERS } from "../../components/features/trackers";

export default function HydrationHistory() {
  return <TrackerPage config={TRACKERS.hydration} history />;
}
