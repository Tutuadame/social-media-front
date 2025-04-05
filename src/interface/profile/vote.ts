export interface CreateVoteRequest {
    profileId: string,
    postId: number,
    vote: boolean,
}