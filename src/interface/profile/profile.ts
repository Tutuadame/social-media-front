export interface ProfileResponse {
    id: string,
    firstName: string,
    lastName: string,
    picture: string,
    gender: string,
    introduction: string
}

export interface CreateProfileRequest {
    profileId: string,
    gender: string,
    firstName: string,
    lastName: string
}

export interface GenericProfileResponse {
    id: string,
    firstName: string,
    lastName: string,
    picture: string,    
}

export interface SearchForProfileRequest {
    name: string,
    pageNumber: number,
    pageSize: number
}