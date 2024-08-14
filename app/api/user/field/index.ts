import { currentAxiosClient } from '../../axiosClient'
import { getListParams } from '../../types'

const userFieldApi = {
  getField: async ({ id, token }: getListParams) => {
    const response = await currentAxiosClient.get(`/api/user/field?auth=${token}`)

    return response
  },
}

export default userFieldApi
