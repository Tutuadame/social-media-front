export interface MessageResponse {
    id: number,
    senderId: string,
    content: string,
    sentAt: string
}

export interface SimpleMessageResponse {
    id: number,    
    content: string,
    sentAt: string
}

export interface PagedMessages {
    content: MessageResponse[],
    page: {
        size: number,
        number: number,
        totalElements: number,
        totalPages: number
    }
}