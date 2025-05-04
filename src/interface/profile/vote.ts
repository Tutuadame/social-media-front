export interface CreateVoteRequest {
    profileId: string,
    postId: number,
    vote: boolean,
}

export interface VoteResponse {
    type: string,
}