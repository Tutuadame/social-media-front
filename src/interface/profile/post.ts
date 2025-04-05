export interface GetPageablePostsRequest {
    pageNumber: number,
    pageSize: number,
};

export interface CreatePostRequest {
    profileId: string,
    content: string,
};

export interface Post {
    id: number;
    profileId: string;
    content: string;
    createdAt: string;
    likes: number;
    dislikes: number;
};

export interface PagedPosts {
    content: Post[],
    page: {
        size: number,
        number: number,
        totalElements: number,
        totalPages: number
    }
}