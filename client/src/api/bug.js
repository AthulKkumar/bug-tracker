import api from "./axios";

export async function listBugs(params = {}) {
    try {
        const res = await api.get("/bugs", { params });
        // Expecting { data: [...], meta: { page, limit, total } }
        return res.data;
    } catch (err) {
        throw new Error(err?.message || "Failed to load bugs");
    }
}

export async function createBug(payload) {
    try {
        const res = await api.post("/bugs", payload);
        return res
    } catch (err) {
        throw new Error(err?.message || "Failed to create bug");
    }
}


export async function getBug(id) {
    if (!id) throw new Error("Bug id is required");
    try {
        const res = await api.get(`/bugs/${id}`);
        return res.data;
    } catch (err) {
        throw new Error(err?.message || "Failed to load bug");
    }
}

export async function updateBug(id, payload) {
    try {
        const res = await api.put(`/bugs/${id}`, payload);
        return res.data;
    } catch (err) {
        throw new Error(err?.message || "Failed to update bug");
    }
}
