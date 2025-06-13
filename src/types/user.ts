export type Profile = {
  fullName: string
}

export type Auth = {
  authId: number
  createdAt: string
  email: string
  user: Profile | null
  username: string
}