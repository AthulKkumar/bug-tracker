import { Card, Flex, Heading, Select } from "@radix-ui/themes";
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

  const [filterField, setFilterField] = useState("severity"); 
  const [filterValue, setFilterValue] = useState("all");

  const severityOptions = ["low", "medium", "high"];
  const statusOptions = ["open", "in_progress", "fixed", "closed"];

  // Fetch bugs from server
  const fetchBugs = async (field = "", value = "") => {
    try {
      setLoading(true);
      let query = "";
      if (field && value && value !== "all") query = `?${field}=${value}`;
      const res = await api.get(`/bugs${query}`);
      if (Array.isArray(res?.data)) setBugs(res.data);
      else setError("Unexpected response format from server.");
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Failed to fetch bugs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBugs(filterField, filterValue);
  }, [filterField, filterValue]);

  return (
    <div style={{ width: "100%", paddingTop: "20px" }}>
      <Heading as="h1" style={{ textAlign: "center", marginBottom: "20px" }}>
        Bug Tracker
      </Heading>

      <Card>
        <Flex direction="column" justify="between" gap={4}>
          <Flex justify="between" align="center" style={{ marginBottom: "20px" }}>
            <Flex gap="2">
              <Select.Root value={filterValue} onValueChange={setFilterValue}>
                <Select.Trigger placeholder={`Filter by ${filterField}`} />
                <Select.Content>
                  <Select.Item value="all">All</Select.Item>
                  {(filterField === "severity" ? severityOptions : statusOptions).map((option) => (
                    <Select.Item key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>

              <Select.Root value={filterField} onValueChange={setFilterField}>
                <Select.Trigger placeholder="Select filter type" />
                <Select.Content>
                  <Select.Item value="severity">Severity</Select.Item>
                  <Select.Item value="status">Status</Select.Item>
                </Select.Content>
              </Select.Root>
            </Flex>

            <BugModalForm onAddBug={(newBug) => setBugs((prev) => [newBug, ...prev])} />
          </Flex>

          {loading ? (
            <p className="text-center">Loading bugs...</p>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            <BugTable
              bugs={bugs}
              onDelete={(id) => setBugs((prev) => prev.filter((bug) => bug._id !== id))}
            />
          )}
        </Flex>
      </Card>
    </div>
  );
}
