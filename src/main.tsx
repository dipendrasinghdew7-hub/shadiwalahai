import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { seedDemoData } from "./lib/seedData";

// Seed demo products on first load
seedDemoData();

createRoot(document.getElementById("root")!).render(<App />);
