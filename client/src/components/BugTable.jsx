
import { useNavigate } from "react-router-dom";
import {
    Table,
} from "@radix-ui/themes";

export default function BugTable({ bugs }) {
    const navigate = useNavigate();

    if (!bugs || bugs.length === 0) return <p className="text-center">No bugs found.</p>;

    return (
        <div className="p-4">
            <Table.Root variant="surface">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Severity</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {bugs.map((bug) => (
                        <Table.Row
                            key={bug._id}
                            className="cursor-pointer hover:bg-gray-100"
                            onClick={() => navigate(`/bugs/${bug._id}`)}
                        >
                            <Table.Cell>{bug._id?.slice(-5) || "N/A"}</Table.Cell>
                            <Table.Cell>{bug.title || "Untitled"}</Table.Cell>
                            <Table.Cell>{bug.status || "Unknown"}</Table.Cell>
                            <Table.Cell>{bug.severity || "N/A"}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </div>
    );
}
