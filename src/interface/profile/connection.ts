export interface CreateConnectionRequest {
    initiatorId: string,
    targetId: string,
};

export interface CheckConnectionRequest {
    currentUserId: string,
    targetUserId: string,
};

export interface UpdateConnectionsStatusRequest {
    id: number,
    status: string,
};

export interface UpdateConnectionStatusResponse {
    id: number    
};

export interface ConnectionResponse {
    id: number;
    profileId: string;
    firstName: string;
    lastName: string;
    picture: string;
};

export interface PagedConnections {
    content: ConnectionResponse[],
    page: {
        size: number,
        number: number,
        totalElements: number,
        totalPages: number
    }
}