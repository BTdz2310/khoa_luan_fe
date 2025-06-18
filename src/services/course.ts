import { API_PATH } from '@api/constant'
import { privateRequest, request } from '@api/request'
import { Category } from '@custom-types/course'

export const getCategoriesService = () => {
  return privateRequest<Category[]>(request.get, API_PATH.COURSE_CATEGORY)
}