import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Post {
    id: bigint;
    title: string;
    content: string;
    timestamp: Time;
    category: PostCategory;
}
export type Time = bigint;
export interface UserProfile {
    name: string;
}
export enum PostCategory {
    theatreNews = "theatreNews",
    interviews = "interviews",
    workshops = "workshops",
    stageShows = "stageShows"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createPost(title: string, content: string, category: PostCategory): Promise<bigint>;
    deletePost(id: bigint): Promise<void>;
    filterPostsByCategory(category: PostCategory): Promise<Array<Post>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getPost(id: bigint): Promise<Post>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    listPosts(): Promise<Array<Post>>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    seedPosts(): Promise<void>;
    updatePost(id: bigint, title: string, content: string, category: PostCategory): Promise<void>;
}
