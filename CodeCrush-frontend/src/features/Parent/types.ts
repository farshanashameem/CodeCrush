export interface AddChildPayload {
  name: string;
  age: number;
  dob?: string;
  avatar: string;
}

export interface UpdateChildPayload {
  id: string
  parentId?: string      // optional if not needed everywhere
  name: string
  age: number
  dob?: string           // ISO date string
  avatar: string
  createdAt?: string
  isBlocked?: boolean
  isDeleted?: boolean

  totalPlayTime?: number
  totalGamesPlayed?: number
  lastPlayed?: string    // ISO date string
  games?: ChildGame[]    // list of games
}



export interface AddChildProps {
  child?: {
    id: string;
    name: string;
    age: number;
    dob?: string;
    avatar: string;
  } | null;
}

export interface AddChildPayload {
  name: string;
  age: number;
  avatar: string;
  dob?: string;
}

// ChildGame.ts
export interface ChildGame {
  id: string
  name: string
  progress: number
  bestScore?: string
  lastPlayed?: string
  totalTime?: string
  stars?: number
  level?: string
  color?: string
  image?: string
}