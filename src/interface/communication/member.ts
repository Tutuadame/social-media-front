export interface AddMemberRequest {
    memberId: string,
    conversationId: string,
}

export interface CreateMemberRequest {
    memberId: string,
    firstName: string,
    lastName: string
}

export interface DeleteMemberFromConversationRequest {
    memberId: string,
    conversationId: string,
}

export interface ConversationMember {
    id: string,
    firstName: string,
    lastName: string,
    picture: string
}