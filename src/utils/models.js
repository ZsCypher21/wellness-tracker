export const ActivityModel = {
  id: Number,
  type: String,
  duration: Number,
  date: String,
  notes: String
};

export const SleepModel = {
  id: Number,
  sleepTime: String,
  wakeTime: String,
  totalHours: Number,
  date: String
};

export const MeditationModel = {
  id: Number,
  duration: Number,
  type: String,
  date: String,
  notes: String
};

export const HydrationModel = {
  id: Number,
  liters: Number,
  date: String,
  notes: String
};

export const AppointmentModel = {
  id: Number,
  type: String,
  description: String,
  date: String,
  time: String,
  location: String,
  notes: String,
  completed: Boolean
};
