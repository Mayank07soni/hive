import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login.jsx";
import Signup from "./components/signup.jsx";
import Dashboard from "./components/dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import ComplainPage from "./Pages/ComplainPage.jsx";

function App() {
  return (
    <Router>
      <Routes>

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
          <Route path="/complain_page" element={<ComplainPage/>}/>
        {/* Default */}
        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </Router>
  );
}

export default App;
