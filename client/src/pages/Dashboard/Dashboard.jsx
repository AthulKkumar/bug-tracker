
import { Card, Flex, Heading } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import BugTable from "../../components/BugTable";
import BugModalForm from "../../components/BugModal";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import api from "../../api/axios";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch bugs on mount
  useEffect(() => {
    const fetchBugs = async () => {
      try {
        setLoading(true);
        const res = await api.get("/bugs");
        if (Array.isArray(res?.data)) setBugs(res?.data);
        else setError("Unexpected response format from server.");
      } catch (err) {
        setError(err?.response?.data?.message || err?.message || "Failed to fetch bugs");
      } finally {
        setLoading(false);
      }
    };
    fetchBugs();
  }, []);

  return (
    <div style={{ width: "100%", paddingTop: "20px" }}>
      <Heading as="h1" style={{ textAlign: "center", marginBottom: "20px" }}>
        Bug Tracker
      </Heading>

      <Card >
        <Flex direction="column" justify="between" gap={4}>
          <Flex justify="between" align="center" style={{ marginBottom: "20px" }}>
            <h2 className="text-2xl font-bold" />
            <BugModalForm onAddBug={(newBug) => setBugs((prev) => [newBug, ...prev])} />
          </Flex>

          {loading ? (
            <p className="text-center">Loading bugs...</p>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            <BugTable bugs={bugs} />
          )}
        </Flex>
      </Card>
    </div>
  );
}
