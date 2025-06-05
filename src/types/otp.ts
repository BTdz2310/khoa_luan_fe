export enum RememberType {
  Register = 'register',
  Forget = 'forget',
}

export type Remember = {
  email: string
  hash_code: string
  user_id?: number
  verification_code?: string
  type: RememberType | ''
  username?: string
}
