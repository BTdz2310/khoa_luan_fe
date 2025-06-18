import { API_PATH } from '@api/constant'
import { privateRequest, request } from '@api/request'
import { SearchFormSchema } from '@layout/components/Header/Forms/search.schema'

import { SearchResponsePayload } from './home.type'

export const searchService = (values: SearchFormSchema) => {
  return privateRequest<SearchResponsePayload>(request.post, API_PATH.HOME_SEARCH, {
    data: {
      text: values.text
    }
  })
}