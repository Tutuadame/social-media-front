import { ReactNode } from "react";

export interface ProfileInfo {
    created_at: string;
    email: string;
    email_verified: boolean;
    identities: Array<{
        connection: string;
        provider: string;
        user_id: string;
        isSocial: boolean;
    }>;
    name: string;
    nickname: string;
    picture: string;
    updated_at: string;
    user_id: string;
    user_metadata: { [key: string]: string } | null;
    username: string;
    last_ip: string;
    last_login: string;
    logins_count: number;
}

export interface ProfileMenuOption {
    title: string;
    action: () => void;
}

export interface ProfileOption {
    svg: ReactNode;
    text: string;
    action: ()=>{};
}