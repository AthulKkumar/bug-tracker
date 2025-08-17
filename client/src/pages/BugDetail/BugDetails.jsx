// src/pages/BugDetails.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
import {
    Card,
    Text,
    Heading,
    Separator,
    TextField,
    Button,
} from "@radix-ui/themes";

export default function BugDetails() {
    const { id } = useParams();
    const [bug, setBug] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBugDetails = async () => {
            try {
                setLoading(true);
                const res = await api.get(`/bugs/${id}`);
                setBug(res.data);
                setComments(res.data.comments || []); 
            } catch (err) {
                setError(
                    err?.response?.data?.message ||
                    err?.message ||
                    "Failed to fetch bug details"
                );
            } finally {
                setLoading(false);
            }
        };
        fetchBugDetails();
    }, [id]);

    const handleAddComment = async () => {
        if (!newComment.trim()) return;
        try {
            const res = await api.post(`/bugs/${id}/comments`, {
                text: newComment,
            });
            setComments((prev) => [...prev, res.data]); 
            setNewComment("");
        } catch (err) {
            alert(err?.response?.data?.message || "Failed to add comment");
        }
    };

    if (loading) return <p className="text-center">Loading bug details...</p>;
    if (error) return <p className="text-red-500 text-center">{error}</p>;
    if (!bug) return <p className="text-center">Bug not found</p>;

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <Card className="p-6 shadow-md rounded-2xl mb-6">
                <Heading size="6" className="mb-2">
                    {bug.title}
                </Heading>
                <Text className="text-gray-600 mb-4">{bug.description}</Text>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <p>
                        <strong>Status:</strong> {bug.status}
                    </p>
                    <p>
                        <strong>Severity:</strong> {bug.severity}
                    </p>
                    <p>
                        <strong>Assigned To:</strong>{" "}
                        {bug.assigneeId?.email || "Unassigned"}
                    </p>
                    <p>
                        <strong>Created At:</strong>{" "}
                        {new Date(bug.createdAt).toLocaleString()}
                    </p>
                </div>
            </Card>

            <Card className="p-6 shadow-md rounded-2xl">
                <Heading size="5" className="mb-4">
                    Comments
                </Heading>

                <div className="space-y-4 mb-4">
                    {comments.length > 0 ? (
                        comments.map((comment, idx) => (
                            <div key={idx} className="border-b pb-2">
                                <p className="text-sm">{comment.text}</p>
                                <span className="text-xs text-gray-500">
                                    {comment.user?.email || "Anonymous"} •{" "}
                                    {new Date(comment.createdAt).toLocaleString()}
                                </span>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No comments yet.</p>
                    )}
                </div>

                <div className="flex gap-2">
                    <TextField.Root
                        placeholder="Write a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="flex-1"
                    />
                    <Button onClick={handleAddComment}>Post</Button>
                </div>
            </Card>
        </div>
    );
}
