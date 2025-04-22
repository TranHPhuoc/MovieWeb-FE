// types/comment.ts
export interface Comment {
    _id: string;
    content: string;
    tmdbId: string;
    userId: {
        _id: string;
        name: string;
    };
    createdAt: string;
}
