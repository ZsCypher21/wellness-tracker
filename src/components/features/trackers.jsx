/**
 * Configuration for the four tracking modules rendered by TrackerPage.
 */
import { useActivities } from "../../context/ActivityContext";
import { useSleep } from "../../context/SleepContext";
import { useHydration } from "../../context/HydrationContext";
import { useMeditation } from "../../context/MeditationContext";
import { formatLiters } from "../../utils/format";

import ActivityForm from "./ActivityForm";
import SleepForm from "./SleepForm";
import HydrationForm from "./HydrationForm";
import MeditationForm from "./MeditationForm";
import EditActivityModal from "./EditActivityModal";
import EditSleepModal from "./EditSleepModal";
import EditHydrationModal from "./EditHydrationModal";
import EditMeditationModal from "./EditMeditationModal";

const value = (text) => <span className="pill">{text}</span>;

export const TRACKERS = {
  activity: {
    module: "activity",
    title: "Activities",
    subtitle: "Log workouts and movement to reach your weekly activity goal.",
    useStore: useActivities,
    itemsKey: "activities",
    weeklyKey: "weeklyActivityMinutes",
    goalKey: "activity_goal",
    apiPath: "activities",
    dateField: "activity_date",
    addLabel: "Add activity",
    emptyTitle: "No activities logged yet",
    totalLabel: "minutes of activity in the last 7 days",
    Form: ActivityForm,
    EditModal: EditActivityModal,
    editProp: "activity",
    primary: (item) => (
      <>
        {item.activity_type} {value(`${item.duration_minutes} mins`)}
      </>
    ),
  },
  sleep: {
    module: "sleep",
    title: "Sleep",
    subtitle: "Track how long you sleep each night.",
    useStore: useSleep,
    itemsKey: "sleepEntries",
    weeklyKey: "weeklySleepHours",
    goalKey: "sleep_goal",
    apiPath: "sleep",
    dateField: "sleep_date",
    addLabel: "Add sleep",
    emptyTitle: "No sleep logged yet",
    totalLabel: "hours slept in the last 7 days",
    Form: SleepForm,
    EditModal: EditSleepModal,
    editProp: "sleep",
    primary: (item) => <>{item.hours_slept} hours of sleep</>,
  },
  hydration: {
    module: "hydration",
    title: "Hydration",
    subtitle: "Record how much water you drink each day.",
    useStore: useHydration,
    itemsKey: "hydrationData",
    weeklyKey: "weeklyHydrationLiters",
    goalKey: "hydration_goal",
    apiPath: "hydration",
    dateField: "hydration_date",
    addLabel: "Add water",
    emptyTitle: "No water logged yet",
    totalLabel: "litres of water in the last 7 days",
    formatTotal: formatLiters,
    Form: HydrationForm,
    EditModal: EditHydrationModal,
    editProp: "hydration",
    primary: (item) => <>{formatLiters(item.liters)} litres of water</>,
  },
  meditation: {
    module: "meditation",
    title: "Meditation",
    subtitle: "Build a calm, consistent mindfulness habit.",
    useStore: useMeditation,
    itemsKey: "meditations",
    weeklyKey: "weeklyMeditationMinutes",
    goalKey: "meditation_goal",
    apiPath: "meditation",
    dateField: "meditation_date",
    addLabel: "Add session",
    emptyTitle: "No meditation sessions yet",
    totalLabel: "minutes of meditation in the last 7 days",
    Form: MeditationForm,
    EditModal: EditMeditationModal,
    editProp: "meditation",
    primary: (item) => <>Meditation {value(`${item.duration_minutes} mins`)}</>,
  },
};
