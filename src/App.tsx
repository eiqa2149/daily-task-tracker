import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import AllTasks from "./pages/AllTasks";
import Calendar from "./pages/Calendar";
import Today from "./pages/Today";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Today />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/tasks" element={<AllTasks />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
