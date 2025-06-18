export enum Gender {
  Male = 'male',
  Female = 'female'
}

export type Profile = {
  fullName: string
  avatar?: string | null
  gender: Gender
  birthDate?: string | null
  bio?: string | null
  interestings: number[]
}

export type Auth = {
  authId: number
  createdAt: string
  email: string
  user: Profile | null
  username: string
}