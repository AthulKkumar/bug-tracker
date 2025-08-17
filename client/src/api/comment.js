import api from "./axios";

export async function listComments(bugId) {
    try {
        const res = await api.get(`/bugs/${bugId}/comments`);
        return res.data;
    } catch (err) {
        throw new Error(err?.message || "Failed to load comments");
    }
}

export async function createComment(bugId, body) {
    try {
        const res = await api.post(`/bugs/${bugId}/comments`, { body });
        return res.data;
    } catch (err) {
        throw new Error(err?.message || "Failed to add comment");
    }
}
