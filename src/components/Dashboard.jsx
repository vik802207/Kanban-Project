import React, { useEffect, useState } from "react";
import "./Dashboard.css"
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";
import { auth, db, storage } from "../services/firebase"; // storage added
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {  getDoc, setDoc } from "firebase/firestore";
 // adjust path as needed
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

// Component to render single task with drag handle and extended fields
function SortableTask({
  task,
  onToggleCompleted,
  onEdit,
  onDelete,
  editingTaskId,
  editingTaskData,
  setEditingTaskData,
  saveTask,
  cancelEditing,
  users,
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    padding: "0.5rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    marginBottom: "0.5rem",
    backgroundColor: isDragging ? "#f9f9f9" : "white",
  };

  if (editingTaskId === task.id) {
    return (
      <li ref={setNodeRef} style={style} {...attributes} {...listeners}>
<div>
  <label className="fancy-label">Title:</label>
  <input
    type="text"
    value={editingTaskData.title}
    onChange={(e) => setEditingTaskData({ ...editingTaskData, title: e.target.value })}
    className="fancy-input"
  />
</div>

<div>
  <label className="fancy-label">Description:</label>
  <textarea
    value={editingTaskData.description}
    onChange={(e) => setEditingTaskData({ ...editingTaskData, description: e.target.value })}
    className="fancy-textarea"
    rows={3}
  />
</div>

<div>
  <label className="fancy-label">Assign To:</label>
  <select
    value={editingTaskData.assignedTo || ""}
    onChange={(e) => setEditingTaskData({ ...editingTaskData, assignedTo: e.target.value })}
    className="fancy-select"
  >
    <option value="">Unassigned</option>
    {users.map((user) => (
      <option key={user.uid} value={user.uid}>
        {user.email}
      </option>
    ))}
  </select>
</div>

<div>
  <label className="fancy-label">Due Date:</label>
  <input
    type="date"
    value={editingTaskData.dueDate ? editingTaskData.dueDate.split("T")[0] : ""}
    onChange={(e) => setEditingTaskData({ ...editingTaskData, dueDate: e.target.value })}
    className="fancy-input"
  />
</div>

<div>
  <label className="fancy-label">Attachments:</label>
  <AttachmentsUploader
    attachments={editingTaskData.attachments}
    setAttachments={(newAttachments) =>
      setEditingTaskData({ ...editingTaskData, attachments: newAttachments })
    }
  />
</div>

<div className="button-group">
  <button onClick={saveTask} className="btn-save">
    Save
  </button>
  <button onClick={cancelEditing} className="btn-cancel">
    Cancel
  </button>
</div>

      </li>
    );
  }
  

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex flex-col gap-1"
    >
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={task.completed || false}
          onChange={() => onToggleCompleted(task)}
        />
        <strong className={task.completed ? "line-through text-gray-500" : ""}>
          {task.title}
        </strong>
      </div>

      {task.description && <p>{task.description}</p>}

      <div className="text-sm text-gray-600">
        Assigned To:{" "}
        {task.assignedTo
          ? users.find((u) => u.uid === task.assignedTo)?.email || "Unknown"
          : "Unassigned"}
      </div>

      <div className="text-sm text-gray-600">
        Due Date: {task.dueDate ? new Date(task.dueDate.seconds * 1000).toLocaleDateString() : "None"}
      </div>

      {task.attachments && task.attachments.length > 0 && (
        <div>
          Attachments:
          <ul className="list-disc ml-5 text-sm">
            {task.attachments.map((file, i) => (
              <li key={i}>
                <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  {file.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-2 flex gap-2">
       <button onClick={() => onEdit(task)} className="btn-edit">
  Edit
</button>
<button onClick={() => onDelete(task.id)} className="btn-delete">
  Delete
</button>
      </div>
    </li>
  );
}

// Component to upload attachments and manage list
function AttachmentsUploader({ attachments, setAttachments }) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (!files.length) return;

    Array.from(files).forEach(async (file) => {
      setUploading(true);

      const storageRef = ref(storage, `attachments/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(prog);
        },
        (error) => {
          alert("Upload failed: " + error.message);
          setUploading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setAttachments((prev) => [...prev, { name: file.name, url: downloadURL }]);
          setUploading(false);
          setProgress(0);
        }
      );
    });

    e.target.value = null; // reset input
  };

  const removeAttachment = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
     <input
  type="file"
  id="file-upload"
  multiple
  onChange={handleFileChange}
  style={{ display: 'none' }}
/>

{/* Styled label as button */}
<label htmlFor="file-upload" className="btn-fancy-upload">
  📎 Attach Files
</label>
      {uploading && <p>Uploading... {Math.round(progress)}%</p>}

      {attachments.length > 0 && (
        <ul className="list-disc ml-5">
          {attachments.map((file, i) => (
            <li key={i} className="flex items-center gap-2">
              <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                {file.name}
              </a>
              <button onClick={() => removeAttachment(i)} className="text-red-600">
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Dashboard() {
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [tasks, setTasks] = useState([]);
  

  const [users, setUsers] = useState([]); // list of users to assign tasks

  const [newBoardTitle, setNewBoardTitle] = useState("");
  const [scriptLoaded, setScriptLoaded] = useState(false);
   const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(0);

  const [nayabalance,setNayabalance]=useState(0);

     useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);
  }, []);
  useEffect(() => {
    if (users?.uid) {
      const fetchBalance = async () => {
        const docRef = doc(db, "users", users.uid, "wallet", "balance");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setBalance(docSnap.data().balance);
          setNayabalance(docSnap.data().balance);
        } else {
          await setDoc(docRef, { balance: 0 });
          setBalance(0);
        }
      };
      fetchBalance();
    }
  }, [users?.uid]);
   const handlePayment = () => {
    if (!scriptLoaded) {
      alert("Razorpay SDK not loaded yet. Try again.");
      return;
    }

    if (!amount || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    const amountInPaise = parseInt(amount) * 100;

    const options = {
      key: "rzp_test_ZOt9n5CnF4YG2Z", // 🔁 Replace with your Razorpay Key ID
      amount: amountInPaise,
      currency: "INR",
      name: "Task Manager Pro",
      description: "User Wallet Top-up",
     handler: async function (response) {
  alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
    
    let a=parseInt(amount)+nayabalance;
    setNayabalance(a);

  if ( !users?.uid) {
    console.error("User not logged in or UID missing");
    return;
  }

  try {
    const docRef = doc(db, "users", users.uid, "wallet", "balance");
    const docSnap = await getDoc(docRef);

    let currentBalance = 0;
    if (docSnap.exists()) {
      currentBalance = docSnap.data().balance || 0;
    }

    const newBalance = currentBalance + parseInt(amount);
    await setDoc(docRef, { balance: newBalance });
    console.log(newBalance);
    setBalance(amount);
    setAmount("");
  } catch (err) {
    console.error("Firestore error:", err);
    alert("Failed to update wallet. Please try again.");
  }
},
      prefill: {
        name: users?.displayName || "",
        email: users?.email || "",
      },
      theme: {
        color: "#0f172a",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  
  const [newTaskData, setNewTaskData] = useState({
    title: "",
    completed: false,
    assignedTo: "",
    dueDate: "",
    description: "",
    attachments: [],
  });

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskData, setEditingTaskData] = useState(null);

  // DnD sensors
  const sensors = useSensors(useSensor(PointerSensor));

  // Load boards
  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const userId = auth.currentUser.uid;
        const q = query(collection(db, "boards"), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        const boardsData = [];
        querySnapshot.forEach((doc) => {
          boardsData.push({ id: doc.id, ...doc.data() });
        });
        setBoards(boardsData);
        if (boardsData.length > 0) setSelectedBoard(boardsData[0]);
      } catch (error) {
        alert("Error fetching boards: " + error.message);
      }
    };
    fetchBoards();
  }, []);

  // Load tasks for selected board
  useEffect(() => {
    if (!selectedBoard) return;

    const fetchTasks = async () => {
      try {
        const tasksCollection = collection(db, "boards", selectedBoard.id, "tasks");
        const tasksSnapshot = await getDocs(tasksCollection);
        const tasksData = [];
        tasksSnapshot.forEach((doc) => {
          tasksData.push({ id: doc.id, ...doc.data() });
        });
        tasksData.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
        setTasks(tasksData);
      } catch (error) {
        alert("Error fetching tasks: " + error.message);
      }
    };

    fetchTasks();
  }, [selectedBoard]);

  // Load users for assigning tasks
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // For demo: fetch all users from "users" collection
        // You need to create & manage this collection yourself with users' info
        const usersSnapshot = await getDocs(collection(db, "users"));
        const usersData = [];
        usersSnapshot.forEach((doc) => {
          usersData.push({ uid: doc.id, ...doc.data() });
        });
        setUsers(usersData);
      } catch (error) {
        alert("Failed to fetch users: " + error.message);
      }
    };
    fetchUsers();
  }, []);

  // Add new board
  const addBoard = async () => {
    if (!newBoardTitle.trim()) return alert("Board title cannot be empty");
    try {
      const userId = auth.currentUser.uid;
      const docRef = await addDoc(collection(db, "boards"), {
        title: newBoardTitle.trim(),
        userId,
        createdAt: new Date(),
      });
      const newBoard = { id: docRef.id, title: newBoardTitle.trim(), userId };
      setBoards((prev) => [...prev, newBoard]);
      setSelectedBoard(newBoard);
      setNewBoardTitle("");
    } catch (error) {
      alert("Failed to add board: " + error.message);
    }
  };

  // Add new task
  const addTask = async () => {
    if (!newTaskData.title.trim()) return alert("Task title cannot be empty");
    if (!selectedBoard) return alert("Please select a board first");
    try {
      const taskDocRef = await addDoc(collection(db, "boards", selectedBoard.id, "tasks"), {
        title: newTaskData.title.trim(),
        completed: newTaskData.completed,
        order: tasks.length,
        assignedTo: newTaskData.assignedTo || null,
        dueDate: newTaskData.dueDate ? Timestamp.fromDate(new Date(newTaskData.dueDate)) : null,
        description: newTaskData.description || "",
        attachments: newTaskData.attachments || [],
        createdAt: new Date(),
      });
      const newTask = {
        id: taskDocRef.id,
        ...newTaskData,
        order: tasks.length,
      };
      setTasks((prev) => [...prev, newTask]);
      setNewTaskData({
        title: "",
        completed: false,
        assignedTo: "",
        dueDate: "",
        description: "",
        attachments: [],
      });
    } catch (error) {
      alert("Failed to add task: " + error.message);
    }
  };

  // Edit task: start editing
  const startEditingTask = (task) => {
    setEditingTaskId(task.id);
    setEditingTaskData({
      title: task.title || "",
      completed: task.completed || false,
      assignedTo: task.assignedTo || "",
      dueDate: task.dueDate ? new Date(task.dueDate.seconds * 1000).toISOString().slice(0, 10) : "",
      description: task.description || "",
      attachments: task.attachments || [],
    });
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingTaskId(null);
    setEditingTaskData(null);
  };

  // Save edited task
  const saveTask = async () => {
    if (!editingTaskData.title.trim()) return alert("Task title cannot be empty");
    try {
      const taskRef = doc(db, "boards", selectedBoard.id, "tasks", editingTaskId);
      await updateDoc(taskRef, {
        title: editingTaskData.title.trim(),
        completed: editingTaskData.completed,
        assignedTo: editingTaskData.assignedTo || null,
        dueDate: editingTaskData.dueDate ? Timestamp.fromDate(new Date(editingTaskData.dueDate)) : null,
        description: editingTaskData.description,
        attachments: editingTaskData.attachments || [],
      });

      setTasks((prev) =>
        prev.map((task) =>
          task.id === editingTaskId ? { ...task, ...editingTaskData } : task
        )
      );
      cancelEditing();
    } catch (error) {
      alert("Failed to update task: " + error.message);
    }
  };

  // Delete task
  const deleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      const taskRef = doc(db, "boards", selectedBoard.id, "tasks", taskId);
      await deleteDoc(taskRef);
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch (error) {
      alert("Failed to delete task: " + error.message);
    }
  };

  // Toggle completed
  const toggleTaskCompleted = async (task) => {
    try {
      const taskRef = doc(db, "boards", selectedBoard.id, "tasks", task.id);
      await updateDoc(taskRef, { completed: !task.completed });

      setTasks((prev) =>
        prev.map((t) =>
          t.id === task.id ? { ...t, completed: !task.completed } : t
        )
      );
    } catch (error) {
      alert("Failed to update task status: " + error.message);
    }
  };

  // Drag & Drop Handlers
  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = tasks.findIndex((task) => task.id === active.id);
      const newIndex = tasks.findIndex((task) => task.id === over.id);

      const newTasksOrder = arrayMove(tasks, oldIndex, newIndex);
      setTasks(newTasksOrder);

      // Save order in Firestore
      try {
        for (let index = 0; index < newTasksOrder.length; index++) {
          const task = newTasksOrder[index];
          const taskRef = doc(db, "boards", selectedBoard.id, "tasks", task.id);
          await updateDoc(taskRef, { order: index });
        }
      } catch (error) {
        alert("Failed to save task order: " + error.message);
      }
    }
  };

  return (
  <div className="app-container">

  {/* Wallet section at the top */}
  <section className="wallet-section">
    <h2>Welcome</h2>

    <div className="wallet-balance">
      <h3>Wallet Balance</h3>
      <p>₹{nayabalance}</p>
    </div>

    <div className="add-money">
      <input
        type="number"
        placeholder="Enter amount in ₹"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="input-text"
      />
      <button onClick={handlePayment} className="btn btn-green">
        + Add to Wallet
      </button>
    </div>
  </section>

  <header className="header">
    <h1>Your Boards</h1>
    <p className="subtitle">Manage boards, tasks, and your wallet in one place.</p>
  </header>

  <section className="board-selector">
    <select
      value={selectedBoard ? selectedBoard.id : ""}
      onChange={(e) => {
        const board = boards.find((b) => b.id === e.target.value);
        setSelectedBoard(board);
      }}
      className="input-select"
    >
      <option value="" disabled>Select a board</option>
      {boards.map((board) => (
        <option key={board.id} value={board.id}>{board.title}</option>
      ))}
    </select>

    <input
      type="text"
      placeholder="New board title"
      value={newBoardTitle}
      onChange={(e) => setNewBoardTitle(e.target.value)}
      className="input-text"
    />

    <button onClick={addBoard} className="btn btn-green">
      + Add Board
    </button>
  </section>

  {selectedBoard && (
    <section className="new-task-form">
      <h2>Add New Task</h2>
      <input
        type="text"
        placeholder="Task title"
        value={newTaskData.title}
        onChange={(e) => setNewTaskData({ ...newTaskData, title: e.target.value })}
        className="input-text"
      />
      <textarea
        placeholder="Description"
        value={newTaskData.description}
        onChange={(e) => setNewTaskData({ ...newTaskData, description: e.target.value })}
        rows={3}
        className="input-textarea"
      />
      <select
        value={newTaskData.assignedTo}
        onChange={(e) => setNewTaskData({ ...newTaskData, assignedTo: e.target.value })}
        className="input-select"
      >
        <option value="">Assign To (optional)</option>
        {users.map((user) => (
          <option key={user.uid} value={user.uid}>{user.email}</option>
        ))}
      </select>
      <input
        type="date"
        value={newTaskData.dueDate}
        onChange={(e) => setNewTaskData({ ...newTaskData, dueDate: e.target.value })}
        className="input-text"
      />

      <AttachmentsUploader
        attachments={newTaskData.attachments}
        setAttachments={(files) => setNewTaskData({ ...newTaskData, attachments: files })}
      />

      <button onClick={addTask} className="btn btn-blue">+ Add Task</button>
    </section>
  )}

  {selectedBoard && (
    <section className="task-list">
      <h2>Tasks</h2>
      <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
        <ul>
          {tasks.map((task) => (
            <SortableTask
              key={task.id}
              task={task}
              onToggleCompleted={toggleTaskCompleted}
              onEdit={startEditingTask}
              onDelete={deleteTask}
              editingTaskId={editingTaskId}
              editingTaskData={editingTaskData}
              setEditingTaskData={setEditingTaskData}
              saveTask={saveTask}
              cancelEditing={cancelEditing}
              users={users}
            />
          ))}
        </ul>
      </SortableContext>
    </section>
  )}

</div>

  );
}
