# 🌿 Wellness Tracker  
A modern wellness tracking application built with React.  
Track your daily sleep, hydration, meditation, activities, and appointments — all in one clean, intuitive interface.

---

## 📌 Project Overview  
The Wellness Tracker is a personal health dashboard designed to help users build consistent wellness habits.  
It provides simple forms for logging daily activities, weekly summaries, progress dashboards, and personalized recommendations based on user data.

The app focuses on clarity, speed, and ease of use — ideal for everyday tracking without complexity.

---

## 🛠️ Technology Stack  

**Frontend:**  
- React (Functional Components + Hooks)  
- Context API for global state management  
- Vite for fast development and bundling  
- Custom CSS for styling  
- LocalStorage persistence  

**Other Tools:**  
- ESLint (React rules)  
- GitHub for version control  
- Vercel for deployment  

---

## 📥 Installation Instructions  

### 1. Clone the repository  
```bash
git clone https://github.com/ZsCypher21/wellness-tracker.git
cd wellness-tracker
```

### 2. Install dependencies  
```bash
npm install
```

### 3. Start the development server  
```bash
npm run dev
```

### 4. Build for production  
```bash
npm run build
```

---

## ⭐ Key Features  

### 💤 Sleep Tracking  
Log total hours slept and view weekly averages.

### 💧 Hydration Tracking  
Track daily water intake with optional notes.

### 🧘 Meditation Tracking  
Record meditation duration and type.

### 🏃 Activity Tracking  
Log physical activities with duration and category breakdowns.

### 📅 Appointment Tracking  
Track upcoming and past appointments with date/time filtering.

### 📊 Weekly Progress Dashboard  
- Average sleep  
- Total hydration  
- Total meditation minutes  
- Activities logged  
- Appointments attended  

### 🎯 Personalized Recommendations  
Simple rule-based suggestions to improve wellness habits.

### 🗂️ Category Breakdown  
Visual summary of activity and meditation types.

### 🧭 Clean UI + Tabs Navigation  
Switch easily between current and history logs.

---

## 🧩 Design Decisions  

### 1. **Context API over Redux**  
Chosen for simplicity and lightweight global state management.

### 2. **LocalStorage Persistence**  
Allows data to survive page reloads without needing a backend.

### 3. **Modular Component Architecture**  
Each wellness category has its own form, list, and context — making the app easy to extend.

### 4. **Weekly Filtering Logic**  
Consistent date-based filtering across all datasets ensures accurate weekly summaries.

### 5. **Minimalistic UI**  
Focused on clarity and usability rather than heavy styling frameworks.

---

## 🔮 Future Enhancements (Coming Soon)

### **Backend Integration & User Accounts**
A full backend service will be introduced to support:

- Secure user authentication  
- Multiple user profiles  
- Cross‑device access  

This upgrade will transition the app from a local-only tracker to a fully persistent, multi-user wellness platform.

### **Target-Based Progress Tracking**
The dashboard will evolve to include **goal vs. actual comparisons** across all wellness metrics:

- Sleep (e.g., target 8 hrs/night vs. actual average)  
- Hydration (daily liter goal vs. weekly total)  
- Meditation (minutes per day/week)  
- Activities (frequency + intensity targets)  

Users will be able to set custom targets, and the dashboard will visualize progress using:

- Progress bars  
- Weekly trend charts  
- Goal completion indicators  
- Personalized recommendations based on gaps

### **Advanced Analytics**
Planned enhancements include:

- Weekly and monthly trend graphs  
- Habit consistency scoring  
- Category-based insights  

---

## 🚀 Deployed Application URL  
**Live Demo:**  
`https://wellness-tracker-two-lime.vercel.app`

---