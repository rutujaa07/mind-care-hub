import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Community from "./pages/Community";
import MoodTracker from "./pages/MoodTracker";
import Resources from "./pages/Resources";
import Counselor from "./pages/Counselor";
import Support from "./pages/Support";
import Admin from "./pages/Admin";
import Inbox from "./pages/Inbox";
import DMChat from "./pages/DMchat";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User only */}
        <Route
          path="/home"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/community"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <Community />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mood"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <MoodTracker />
            </ProtectedRoute>
          }
        />
        <Route
          path="/support"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <Support />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inbox"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <Inbox />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dm/:id"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <DMChat />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* All roles */}
        <Route
          path="/resources"
          element={
            <ProtectedRoute allowedRoles={["user", "counselor", "admin"]}>
              <Resources />
            </ProtectedRoute>
          }
        />

        {/* Counselor only */}
        <Route
          path="/counselor"
          element={
            <ProtectedRoute allowedRoles={["counselor"]}>
              <Counselor />
            </ProtectedRoute>
          }
        />

        {/* Admin only */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
