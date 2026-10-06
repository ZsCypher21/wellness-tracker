import TrackerPage from "../../components/features/TrackerPage";
import { TRACKERS } from "../../components/features/trackers";

export default function MeditationHistory() {
  return <TrackerPage config={TRACKERS.meditation} history />;
}
