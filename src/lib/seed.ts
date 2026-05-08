import { collection, doc, setDoc, serverTimestamp, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";

export const seedMockData = async (userId: string) => {
  try {
    const projectsRef = collection(db, "projects");
    const q = query(projectsRef, where("ownerId", "==", userId));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      return;
    }

    const projects = [
      {
        name: "Main Project MVP",
        description: "Initial platform development and core systems integration.",
        status: "active",
        ownerId: userId,
        members: [userId],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      },
      {
        name: "Mobile Infrastructure",
        description: "Cross-platform mobile client architecture and rollout.",
        status: "active",
        ownerId: userId,
        members: [userId],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }
    ];

    for (const p of projects) {
      const pRef = await addDoc(collection(db, "projects"), p);
      
      const tasks = [
        { title: "Refactor Security Layer", description: "Improve token rotation and session validation.", status: "completed", priority: "urgent", labels: ["backend", "security"], sequence: 0 },
        { title: "Design System Overhaul", description: "Implement shared design tokens and responsive components.", status: "in_progress", priority: "high", labels: ["design", "ui"], sequence: 1 },
        { title: "Core Engine Integration", description: "Connect suggestion service to the main frontend.", status: "todo", priority: "high", labels: ["core"], sequence: 2 },
        { title: "Performance Dashboard", description: "Build real-time data visualization components.", status: "todo", priority: "medium", labels: ["analytics"], sequence: 3 },
      ];

      for (const t of tasks) {
        await addDoc(collection(db, "projects", pRef.id, "tasks"), {
          ...t,
          projectId: pRef.id,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }
    }
  } catch (err) {
    console.error("Initialization failed:", err);
  }
};
