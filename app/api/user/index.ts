import {currentAxiosClient, intranetAxiosClient} from '../axiosClient'
import { getListParams } from '../types'

const userApi = {
  getList: async ({ id, token }: getListParams) => {
    const response = await currentAxiosClient.get(`/api/user?auth=${token}`)

    return response
  },
}

export default userApi
