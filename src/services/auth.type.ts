import { Auth } from '@custom-types/user'

export type LoginResponsePayload = {
  accessToken: string
  refreshToken: string
  auth: Auth
}

export type RegisterResponsePayload = {
  authId: number
  hashCode: string
}

export type ForgetResponsePayload = {
  authId: number
  hashCode: string
}

export enum OtpType {
  Register = 1,
  Forget = 2
}