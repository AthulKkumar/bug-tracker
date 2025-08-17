import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="p-6">
      <h2 className="text-2xl">Welcome, {user?.email}</h2>
      {/* <UserDropdown onLogout={logout} /> */}
    </div>
  );
}
