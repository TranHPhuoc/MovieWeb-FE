// services/commentService.ts
import { Comment } from "./comments";

const API_URL = 'https://movieweb-production.up.railway.app/api/v1/comment';

export const getCommentsByTmdbId = async (tmdbId: string): Promise<Comment[]> => {
    const res = await fetch(`${API_URL}/${tmdbId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!res.ok) {
        if (res.status === 401) {
            throw new Error("Vui lòng đăng nhập để xem bình luận");
        }
        const errData = await res.json();
        throw new Error(errData.message || "Lỗi khi tải comments");
    }

    return await res.json();
};

export const postComment = async (tmdbId: number, content: string): Promise<Comment> => {
    const res = await fetch(`${API_URL}/${tmdbId}`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ content }),
    });

    if (!res.ok) {
        if (res.status === 401) {
            throw new Error("Vui lòng đăng nhập để bình luận");
        }
        const errData = await res.json();
        throw new Error(errData.message || "Lỗi khi đăng comment");
    }

    return await res.json();
};
