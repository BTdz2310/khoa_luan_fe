import { Profile } from '@custom-types/user'

export type LoginResponsePayload = {
  access_token: string
  refresh_token: string
  user: Profile
}

export type RegisterResponsePayload = {
  user_id: number
  hash_code: string
}

export type ForgetResponsePayload = {
  user_id: number
  hash_code: string
}