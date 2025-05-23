# 🧠 TaskFlow - React Task Management Dashboard ✅

**TaskFlow** is a beautifully designed and fully functional task management dashboard built with **React**. It allows users to create and manage tasks with drag-and-drop reordering, user assignment, file attachments, due dates, and Razorpay-powered wallet functionality for virtual credits.

![TaskFlow Screenshot](./screenshot.png)

---

## ✨ Features

- ✅ **Board and Task Management**
  - Create and switch between multiple boards.
  - Add, edit, and delete tasks with rich details (title, description, due date, assignee, and attachments).

- 🧲 **Drag and Drop Tasks**
  - Seamless task reordering using [`@dnd-kit`](https://github.com/clauderic/dnd-kit).

- 👥 **User Assignment**
  - Assign tasks to registered users via Firebase Authentication.

- 📎 **Attachments**
  - Upload and manage task files through Firebase Storage.

- 💸 **Razorpay Wallet Integration**
  - Add virtual currency to user accounts with Razorpay.
  - Wallet balance is synced and stored using Firestore.

- 🎨 **Custom Stylish UI**
  - Clean and responsive UI with handcrafted CSS.
  - No UI frameworks like Tailwind or Bootstrap — 100% custom style.

---

## 🚀 Getting Started

### 1. Clone the Repo
git clone https://github.com/your-username/taskflow-dashboard.git
cd taskflow-dashboard
## 🧱 Tech Stack


- **Frontend:** [React](https://reactjs.org/)
- **Backend / Auth / Storage:** [Firebase](https://firebase.google.com/) (Firestore, Auth, Storage)
- **Payments:** [Razorpay JS SDK](https://razorpay.com/docs/)
- **Drag-and-Drop:** [`@dnd-kit`](https://github.com/clauderic/dnd-kit)
- **Styling:** Handcrafted custom CSS (no frameworks)

- ## 📁 Folder Structure

src/
├── components/
│   ├── BoardSelector.jsx
│   ├── TaskEditor.jsx
│   ├── SortableTask.jsx
│   └── AttachmentsUploader.jsx
├── pages/
│   └── Dashboard.jsx
├── services/
│   ├── firebase.js
│   └── razorpay.js
├── App.jsx
├── main.jsx
└── styles/
    └── global.css
📄 License
MIT © Your Name
## Install Dependencies
npm install
npm start
### 3. Set Up Firebase

1. Create a Firebase project at [firebase.google.com](https://firebase.google.com).
2. Enable the following Firebase services:
   - **Firestore Database**
   - **Firebase Authentication**
   - **Firebase Storage**

3. In the root of your project, create a `.env` file and add your Firebase credentials:

VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

## Screenshot
![image](https://github.com/user-attachments/assets/4da80284-b81e-4d97-b9eb-92e56cd492ee)

