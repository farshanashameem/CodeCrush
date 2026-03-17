export interface Admin {
  id: string;
  email: string;
}

export interface ParentUser {
  id: string;
  name: string;
  email: string;
  childrenIds: string[];
  isBlocked: boolean;
  isDeleted: boolean;
}


export interface AdminState {
  admin: Admin | null;
  users: ParentUser[];
  accessToken: string | null;
  isAuthenticated: boolean;
}