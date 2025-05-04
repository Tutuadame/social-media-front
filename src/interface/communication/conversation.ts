export interface SimpleConversation {
    id: string,
    name: string
}

export interface Conversation {
    id: string,
    name: string,
    memberIds: string[]
}

export interface PagedConversations {
    content: SimpleConversation[],
    page: {
        size: number,
        number: number,
        totalElements: number,
        totalPages: number
    }
}

export interface CreateConversationRequest {
    members: string[],
    name: string
}