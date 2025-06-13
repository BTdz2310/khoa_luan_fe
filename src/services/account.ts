import { API_PATH } from '@api/constant'
import { privateRequest, request } from '@api/request'
import { Auth } from '@custom-types/user'

export const profileService = () => {
  return privateRequest<Auth>(request.get, API_PATH.ACCOUNT_PROFILE)
}