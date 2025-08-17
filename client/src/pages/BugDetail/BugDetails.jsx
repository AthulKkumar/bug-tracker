
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
import {
    Card,
    Text,
    Heading,
    Container,
    Flex,
    TextField,
    Button,
    Avatar,
    Box,
    ScrollArea,
} from "@radix-ui/themes";
import { createComment, listComments } from "../../api/comment";
import EditBugModal from "../../components/EditBugModal";

export default function BugDetails() {
    const { id } = useParams();
    const [bug, setBug] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch bug details and comments
    const fetchBugDetails = async () => {
        try {
            setLoading(true);
            const res = await api.get(`/bugs/${id}`);
            setBug(res.data);

            const commentsRes = await listComments(id);
            setComments(Array.isArray(commentsRes) ? commentsRes : []);
        } catch (err) {
            setError(err?.response?.data?.message || err?.message || "Failed to fetch bug details");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBugDetails();
    }, [id]);

    // Handle adding a new comment
    const handleAddComment = async () => {
        const trimmedComment = newComment.trim();
        if (!trimmedComment) return;

        try {
            const res = await createComment(id, trimmedComment);
            setComments((prev) => [...prev, res.data]);
            setNewComment("");
        } catch (err) {
            alert(err?.response?.data?.message || "Failed to add comment");
        }
    };

    if (loading) return <p className="text-center mt-6">Loading bug details...</p>;
    if (error) return <p className="text-red-500 text-center mt-6">{error}</p>;
    if (!bug) return <p className="text-center mt-6">Bug not found</p>;

    return (
        <div style={{ width: "100%", paddingTop: "20px", paddingBottom: "20px" }}>
            <Flex direction="row" gap="4" className="mb-4">
                {/* Bug Details Card */}
                <Card style={{ width: "70%" }}>
                    <Flex direction="column" gap="4">
                        <Flex direction="row" justify="between" align="center">
                            <Heading size="6" className="mb-2">{bug.title}</Heading>
                            {/* Edit Modal */}
                            <EditBugModal
                                bugData={bug}
                                onUpdate={(updatedBug) => setBug(updatedBug)}
                            />
                        </Flex>
                        <Text size={2}>{bug.description}</Text>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <p><strong>Status:</strong> {bug.status}</p>
                            <p><strong>Severity:</strong> {bug.severity}</p>
                            <p><strong>Assigned To:</strong> {bug.assigneeId?.email || "Unassigned"}</p>
                            <p><strong>Created At:</strong> {new Date(bug.createdAt).toLocaleString()}</p>
                        </div>
                    </Flex>
                </Card>

                {/* Comments Card */}
                <Card style={{ width: "30%" }}>
                    <Flex direction="column" gap="4">
                        <Heading size="5" className="mb-4">Comments</Heading>

                        <ScrollArea type="always" scrollbars="vertical" style={{ height: "70vh" }}>
                            <Flex direction="column" gap="4" className="mb-4">
                                {comments?.length > 0 ? (
                                    comments?.map((comment, idx) => comment && (
                                        <Box key={idx}>
                                            <Card>
                                                <Flex gap="3" align="center">
                                                    <Avatar
                                                        size="3"
                                                        src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
                                                        radius="full"
                                                        fallback="T"
                                                    />
                                                    <Box>
                                                        <Flex direction="column" gap="1">
                                                            <Text as="div" size="2" weight="bold">
                                                                {comment?.authorId?.email || "Anonymous"}
                                                            </Text>
                                                            <Text as="div" size="1" color="gray">
                                                                {comment.createdAt ? new Date(comment.createdAt).toLocaleString() : ""}
                                                            </Text>
                                                            <Text as="div" size="2" color="gray">
                                                                {comment.body || "No content"}
                                                            </Text>
                                                        </Flex>
                                                    </Box>
                                                </Flex>
                                            </Card>
                                        </Box>
                                    ))
                                ) : (
                                    <p className="text-gray-500">No comments yet.</p>
                                )}
                            </Flex>
                        </ScrollArea>

                        <Flex direction="column" gap="4" className="mb-4">
                            <TextField.Root
                                placeholder="Write a comment..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                className="flex-1"
                            />
                            <Button size={1} onClick={handleAddComment}>Post</Button>
                        </Flex>
                    </Flex>
                </Card>
            </Flex>
        </div>
    );
}




