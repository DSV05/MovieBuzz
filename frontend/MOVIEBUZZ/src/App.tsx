import { useState } from "react";
import Dashboard from "./components/Dashboard";
import LoginPage from "./components/login-page";
import { RegisterPage } from "./components/register-page";

type User = {
  name: string;
  email: string;
};

function App() {
  const [currentView, setCurrentView] = useState<
    "user-dashboard" | "login" | "register"
  >("login");

  const [user, setUser] = useState<User>({
    name: "Guest User",
    email: "guest@example.com",
  });

  // 🔵 LOGIN (uses real name from DB now)
  const handleLogin = (name: string, email: string) => {
    setUser({
      name: name,
      email: email,
    });

    setCurrentView("user-dashboard");
  };

  // 🔵 LOGOUT
  const handleLogout = () => {
    setCurrentView("login");
  };

  return (
    <>
      {/* DASHBOARD */}
      {currentView === "user-dashboard" && (
        <Dashboard onLogout={handleLogout} user={user} />
      )}

      {/* LOGIN PAGE */}
      {currentView === "login" && (
        <LoginPage
          onLogin={handleLogin}
          onNavigateToRegister={() => setCurrentView("register")}
        />
      )}

      {/* REGISTER PAGE */}
      {currentView === "register" && (
        <RegisterPage
          onRegister={(name, email) => {
            setUser({ name, email });
            setCurrentView("user-dashboard");
          }}
          onNavigateToLogin={() => setCurrentView("login")}
        />
      )}
    </>
  );
}

export default App;
