# 🧠 Kanban - React Task Management Dashboard ✅

**TaskFlow** is a beautifully designed and fully functional task management dashboard built with **React**. It allows users to create and manage tasks with drag-and-drop reordering, user assignment, file attachments, due dates, and Razorpay-powered wallet functionality for virtual credits.

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
![image](https://github.com/vik802207/Kanban-Project/blob/main/img/Screenshot%20(376).png)
![image](https://github.com/vik802207/Kanban-Project/blob/main/img/Screenshot%20(377).png)
![image](https://github.com/vik802207/Kanban-Project/blob/main/img/Screenshot%20(378).png)
![image](https://github.com/vik802207/Kanban-Project/blob/main/img/Screenshot%20(379).png)
![image](https://github.com/vik802207/Kanban-Project/blob/main/img/Screenshot%20(380).png)
![image](https://github.com/vik802207/Kanban-Project/blob/main/img/Screenshot%20(381).png)
![image](https://github.com/vik802207/Kanban-Project/blob/main/img/Screenshot%20(382).png)
![image](https://github.com/vik802207/Kanban-Project/blob/main/img/Screenshot%20(383).png)
![image](https://github.com/vik802207/Kanban-Project/blob/main/img/Screenshot%20(384).png)
![image](https://github.com/vik802207/Kanban-Project/blob/main/img/Screenshot%20(385).png)
![image](https://github.com/vik802207/Kanban-Project/blob/main/img/Screenshot%20(386).png)
![image](https://github.com/vik802207/Kanban-Project/blob/main/img/Screenshot%20(387).png)

## Firebase database

![image](https://github.com/vik802207/Kanban-Project/blob/main/img/Screenshot%20(388).png)
![image](https://github.com/vik802207/Kanban-Project/blob/main/img/Screenshot%20(389).png)

## 🤝 Contributing
Pull requests are welcome. For major changes, open an issue first to discuss what you would like to change.

## 📜 License
This project is licensed under the MIT License.
## 🔗 Live Demo
👉 ChatGPT Clone Live
## [![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge)](https://kanban-project-pied.vercel.app/)
## 👨‍💻 Author
Developed by Vikash Gupta
📧 Contact: vikashg802207@gmail.com

