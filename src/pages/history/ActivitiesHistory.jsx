import TrackerPage from "../../components/features/TrackerPage";
import { TRACKERS } from "../../components/features/trackers";

export default function ActivitiesHistory() {
  return <TrackerPage config={TRACKERS.activity} history />;
}
