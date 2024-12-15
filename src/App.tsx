import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import Auth from "./pages/Auth/AuthPage";
import { useAuth } from "./context/AuthContext";
import Todos from "./pages/Todos/TodosPage";

const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/auth" />;
};

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route
        path="/todos"
        element={
          <PrivateRoute>
            <Todos />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/todos" />} />
    </Routes>
  );
}

export default App;
