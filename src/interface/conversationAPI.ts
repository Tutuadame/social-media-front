export interface SimpleConversation {
    id: number,
    name: string
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