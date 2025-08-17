

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import {
    Table,
    Button,
    Badge,
    Card,
} from "@radix-ui/themes";

export default function BugTable() {
    const [bugs, setBugs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBugs = async () => {
            try {
                setLoading(true);
                setError("");
                const res = await api.get("/bugs");
                if (Array.isArray(res.data)) {
                    setBugs(res.data);
                } else {
                    setBugs([]);
                    setError("Unexpected response format from server.");
                }
            } catch (err) {
                setError(
                    err?.response?.data?.message ||
                    err?.message ||
                    "Failed to fetch bugs"
                );
            } finally {
                setLoading(false);
            }
        };
        fetchBugs();
    }, []);

    if (loading)
        return <p className="text-center text-gray-600">Loading bugs...</p>;
    if (error)
        return (
            <p className="text-red-500 text-center font-medium">{error}</p>
        );
    if (!bugs.length)
        return <p className="text-center text-gray-500">No bugs found.</p>;

    const getStatusBadge = (status) => {
        const statusColors = {
            open: "green",
            fixed: "blue",
            closed: "red",
            inprogress: "yellow",
        };
        return (
            <Badge
                color={statusColors[status?.toLowerCase()] || "gray"}
                variant="solid"
            >
                {status || "Unknown"}
            </Badge>
        );
    };

    return (


        <Table.Root variant="surface" className="w-full">
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeaderCell className="text-sm font-semibold">
                        ID
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className="text-sm font-semibold">
                        Title
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className="text-sm font-semibold">
                        Status
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className="text-sm font-semibold">
                        Priority
                    </Table.ColumnHeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {bugs.map((bug) => (
                    <Table.Row
                        key={bug._id}
                        className="cursor-pointer hover:bg-gray-50 transition"
                        onClick={() => navigate(`/bugs/${bug._id}`)}
                    >
                        <Table.Cell className="text-gray-700 font-mono">
                            #{bug._id?.slice(-5) || "N/A"}
                        </Table.Cell>
                        <Table.Cell className="font-medium text-gray-900">
                            {bug.title || "Untitled"}
                        </Table.Cell>
                        <Table.Cell>{getStatusBadge(bug.status)}</Table.Cell>
                        <Table.Cell>
                            <Badge
                                color={
                                    bug.severity === "high"
                                        ? "red"
                                        : bug.severity === "medium"
                                            ? "yellow"
                                            : "gray"
                                }
                                variant="soft"
                            >
                                {bug.severity || "N/A"}
                            </Badge>
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>

    );
}
