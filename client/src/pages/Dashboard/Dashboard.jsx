import { Button, Card, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { useAuth } from "../../context/AuthContext";
import BugTable from "../../components/BugTable";
import BugModalForm from "../../components/BugModal";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Welcome, {user?.email}</h2>
      <Card className="p-6 shadow-md rounded-2xl bg-white">
        <Flex align="center" justify="between" gap="3">
          <h2 className="text-2xl font-bold">Bug Tracker</h2>
          <div className="flex items-center">
            <BugModalForm />
          </div>
        </Flex>
        <BugTable />
      </Card>
    </div>


  );
}

