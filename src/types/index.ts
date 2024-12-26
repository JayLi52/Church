export interface UserProfile {
    id: string
    avatar: string
    name: string
    createTime: string
}

export interface ReadingHistory {
    id: string
    userId: string
    title: string
    timestamp: string
} 