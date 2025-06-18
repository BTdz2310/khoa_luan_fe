import { API_PATH } from '@api/constant'
import { privateRequest, request } from '@api/request'
import { CreateProfileFormSchema } from '@components/Profile/Forms/Schema/profileSchema'
import { Auth, Profile } from '@custom-types/user'

export const profileService = () => {
  return privateRequest<Auth>(request.get, API_PATH.ACCOUNT_PROFILE)
}

export const createProfileService = (values: CreateProfileFormSchema) => {
  const formData = new FormData();
  values.portrait_photo && formData.append('portrait_photo', values.portrait_photo)
  formData.append('fullName', values.fullName)
  formData.append('birthDate', values.birthDate)
  formData.append('gender', values.gender)
  values.bio && formData.append('bio', values.bio)
  values.interestings.forEach(interesting => formData.append('interestings', String(interesting)))
  return privateRequest<Profile>(request.post, API_PATH.ACCOUNT_PROFILE, {
    data: formData
  })
}

export const editProfileService = (values: Partial<Profile>) => {
  return privateRequest<Profile>(request.patch, API_PATH.ACCOUNT_PROFILE, {
    data: values
  })
}