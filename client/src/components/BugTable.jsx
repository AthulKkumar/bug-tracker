import { useNavigate } from "react-router-dom";
import { Table, Button } from "@radix-ui/themes";
import api from "../api/axios";

export default function BugTable({ bugs, onDelete }) {
    const navigate = useNavigate();

    if (!bugs || bugs.length === 0) return <p className="text-center">No bugs found.</p>;

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this bug?")) return;

        try {
            await api.delete(`/bugs/${id}`);
            if (onDelete) onDelete(id);
        } catch (err) {
            alert(err?.response?.data?.message || "Failed to delete bug");
        }
    };

    return (
        <div className="p-4">
            <Table.Root variant="surface">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Severity</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {bugs.map((bug) => (
                        <Table.Row key={bug._id} className="hover:bg-gray-100">
                            <Table.Cell
                                style={{ cursor: "pointer" }}
                                onClick={() => navigate(`/bugs/${bug._id}`)}
                            >
                                {bug._id?.slice(-5) || "N/A"}
                            </Table.Cell>
                            <Table.Cell
                                style={{ cursor: "pointer" }}
                                onClick={() => navigate(`/bugs/${bug._id}`)}
                            >
                                {bug.title || "Untitled"}
                            </Table.Cell>
                            <Table.Cell>{bug.status || "Unknown"}</Table.Cell>
                            <Table.Cell>{bug.severity || "N/A"}</Table.Cell>
                            <Table.Cell>
                                <Button
                                    variant="soft"
                                    color="red"
                                    size={1}
                                    onClick={() => handleDelete(bug._id)}
                                >
                                    Delete
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </div>
    );
}
